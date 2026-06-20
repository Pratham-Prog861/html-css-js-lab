import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  html: string;
  css: string;
  js: string;
  refreshTrigger: number; // Increment to force re-render
  onConsole: (type: 'log' | 'error', args: any[]) => void;
  onValidateResult: (result: { success: boolean; message: string }) => void;
}

const Preview: React.FC<PreviewProps> = ({ html, css, js, refreshTrigger, onConsole, onValidateResult }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security check: ensure message is from our iframe?
      // In a no-backend setup with srcdoc, the origin might be null or same as window
      
      const { type, level, args, result, error } = event.data;

      if (type === 'CONSOLE') {
        onConsole(level, args);
      }
      
      if (type === 'VALIDATION_RESULT') {
        if (error) {
           onValidateResult({ success: false, message: `Validation Error: ${error}` });
        } else {
           onValidateResult(result);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onConsole, onValidateResult]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Construct the full document
    const srcDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <!-- Trigger: ${refreshTrigger} -->
          <!-- Console Proxy (Must be first to capture early logs) -->
          <script>
            (function() {
              const send = (level, args) => {
                try {
                  // clone args to avoid cloning errors for complex DOM objects
                  const safeArgs = args.map(arg => {
                     if (arg instanceof HTMLElement) return '[HTMLElement ' + arg.tagName + ']';
                     if (typeof arg === 'object') {
                       try { return JSON.parse(JSON.stringify(arg)); } catch(e) { return arg.toString(); }
                     }
                     return arg;
                  });
                  window.parent.postMessage({ type: 'CONSOLE', level, args: safeArgs }, '*');
                } catch (e) {
                  // Fallback
                  window.parent.postMessage({ type: 'CONSOLE', level, args: ['[Complex Object]'] }, '*');
                }
              };

              const originalLog = console.log;
              console.log = (...args) => {
                send('log', args);
                originalLog.apply(console, args);
              };

              const originalError = console.error;
              console.error = (...args) => {
                send('error', args);
                originalError.apply(console, args);
              };

              const originalWarn = console.warn;
              console.warn = (...args) => {
                send('warn', args);
                originalWarn.apply(console, args);
              };

              const originalInfo = console.info;
              console.info = (...args) => {
                send('info', args);
                originalInfo.apply(console, args);
              };

              window.onerror = (msg, url, line) => {
                send('error', [msg + ' (Line: ' + line + ')']);
              };
            })();
          </script>
          <style>
            ${css}
          </style>
          <style>
            body { font-family: sans-serif; padding: 1rem; color: #111; }
          </style>
        </head>
        <body>
          ${html}
          
          <!-- User JS -->
          <script>
            try {
              ${js}
            } catch (err) {
              console.error(err.message);
            }
          </script>
          
          <!-- Validation Runner Listener -->
          <script>
             window.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'RUN_VALIDATION') {
                   try {
                      // The validation code is passed as a string body of a function
                      const validateFn = new Function(event.data.code);
                      const result = validateFn();
                      window.parent.postMessage({ type: 'VALIDATION_RESULT', result }, '*');
                   } catch (e) {
                      window.parent.postMessage({ type: 'VALIDATION_RESULT', error: e.toString() }, '*');
                   }
                }
             });
          </script>
        </body>
      </html>
    `;

    iframe.srcdoc = srcDoc;
  }, [html, css, js, refreshTrigger]);

  return (
    <iframe
      ref={iframeRef}
      title="Live Preview"
      className="w-full h-full bg-white border-0"
      sandbox="allow-scripts allow-modals allow-same-origin"
    />
  );
};

export default Preview;
