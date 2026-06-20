import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Code2, Play, RotateCcw, CheckCircle, Circle,
  Layers, FileCode, Lightbulb, RefreshCw, BookOpen, Zap, Cloud, Check, Wand2, Share2
} from 'lucide-react';
import clsx from 'clsx';
import CodeEditor from './components/Editor';
import Preview from './components/Preview';
import Console from './components/Console';
import { CHALLENGES } from './constants';
import { Challenge, ConsoleMessage, CodeType } from './types';
import { useDebounce } from './hooks/useDebounce';
import { 
  getProgress, markChallengeComplete, setLastActiveChallenge, 
  getChallengeCode, saveChallengeCode, SavedCode
} from './services/storage';
import { formatCode } from './services/formatter';
import { encodeCode, decodeCode, encodeSharePayload, decodeSharePayload } from './services/share';

function App() {
  // State for initial asynchronous decoding of shared link
  const [isLoadingShared, setIsLoadingShared] = useState(() => {
    const pathname = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    return pathname.startsWith('/s/') || !!params.get('code');
  });

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('id');
    if (sharedId) {
      const idx = CHALLENGES.findIndex(c => c.id === sharedId);
      if (idx !== -1) return idx;
    }
    
    const progress = getProgress();
    if (progress.lastActiveChallengeId) {
      const idx = CHALLENGES.findIndex(c => c.id === progress.lastActiveChallengeId);
      if (idx !== -1) return idx;
    }
    return 0;
  });

  const [activeTab, setActiveTab] = useState<CodeType>('html');
  
  // Editor State
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  
  // Runtime State
  const [logs, setLogs] = useState<ConsoleMessage[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Forces iframe reload
  const [validationResult, setValidationResult] = useState<{ success: boolean; message: string } | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isFormatting, setIsFormatting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Share Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [modalCopyFeedback, setModalCopyFeedback] = useState(false);

  // Debounced values for auto-updating preview
  const debouncedHtml = useDebounce(htmlCode, 500);
  const debouncedCss = useDebounce(cssCode, 500);
  const debouncedJs = useDebounce(jsCode, 500);

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Load progress and parse shared solutions asynchronously on mount
  useEffect(() => {
    const progress = getProgress();
    setCompletedIds(progress.completedChallengeIds);

    const loadSharedState = async () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      
      let sharedId: string | null = null;
      let sharedCode: SavedCode | null = null;

      // 1. Try path-based decoding
      if (pathname.startsWith('/s/')) {
        const token = pathname.substring(3);
        if (token) {
          try {
            const decoded = await decodeSharePayload(token);
            if (decoded) {
              sharedId = decoded.id;
              sharedCode = {
                html: decoded.html,
                css: decoded.css,
                js: decoded.js
              };
            }
          } catch (e) {
            console.error("Failed to load path shared state", e);
          }
        }
      }

      // 2. Try query-param decoding fallback
      if (!sharedId) {
        const sharedIdParam = params.get('id');
        const codeParam = params.get('code');
        if (sharedIdParam && codeParam) {
          sharedId = sharedIdParam;
          try {
            sharedCode = decodeCode(codeParam);
          } catch (e) {
            console.error("Failed to load query shared state", e);
          }
        }
      }

      if (sharedId && sharedCode) {
        const idx = CHALLENGES.findIndex(c => c.id === sharedId);
        if (idx !== -1) {
          setCurrentChallengeIndex(idx);
          setHtmlCode(sharedCode.html);
          setCssCode(sharedCode.css);
          setJsCode(sharedCode.js);
          saveChallengeCode(sharedId, sharedCode);
        }
      }

      setIsLoadingShared(false);
      
      // Clean the URL path to root
      if (pathname.startsWith('/s/') || params.get('code')) {
        window.history.replaceState({}, '', '/');
      }
    };

    loadSharedState();
  }, []);

  // Initialize Code when challenge changes
  useEffect(() => {
    // Normal flow: Try to load saved code from local storage
    const savedCode = getChallengeCode(currentChallenge.id);
    
    if (savedCode) {
      setHtmlCode(savedCode.html);
      setCssCode(savedCode.css);
      setJsCode(savedCode.js);
    } else {
      setHtmlCode(currentChallenge.initialCode.html);
      setCssCode(currentChallenge.initialCode.css);
      setJsCode(currentChallenge.initialCode.js);
    }

    setLogs([]);
    setValidationResult(null);
    setShowHint(false); // Reset hint visibility
    setLastActiveChallenge(currentChallenge.id);
    setSaveStatus('idle');
    
    // Set active tab based on challenge type preference
    if (currentChallenge.type !== 'mixed') {
      setActiveTab(currentChallenge.type);
    } else {
        setActiveTab('html');
    }
  }, [currentChallenge]);

  // Auto-save Logic
  useEffect(() => {
    // Skip auto-save if we are just loading (to prevent overwriting logic race conditions? 
    // Actually the debounced nature helps, but we want to make sure we don't save empty states on switch)
    
    setSaveStatus('saving');
    
    const timer = setTimeout(() => {
      saveChallengeCode(currentChallenge.id, {
        html: htmlCode,
        css: cssCode,
        js: jsCode
      });
      setSaveStatus('saved');
      
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode, currentChallenge.id]);

  // Handle Validation Logic
  const handleRun = () => {
    setLogs([]);
    setValidationResult(null);
    setRefreshTrigger(p => p + 1);
    
    setTimeout(() => {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ 
          type: 'RUN_VALIDATION', 
          code: currentChallenge.validationCode 
        }, '*');
      }
    }, 500);
  };

  const handleConsole = useCallback((type: 'log' | 'error' | 'warn' | 'info', args: any[]) => {
    const content = args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ');
    setLogs(prev => [...prev, { type, content, timestamp: Date.now() }]);
  }, []);

  const handleValidationResult = useCallback((result: { success: boolean; message: string }) => {
    setValidationResult(result);
    if (result.success) {
      markChallengeComplete(currentChallenge.id);
      setCompletedIds(prev => Array.from(new Set([...prev, currentChallenge.id])));
    }
  }, [currentChallenge.id]);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your code to the start of this challenge?")) {
      const { html, css, js } = currentChallenge.initialCode;
      
      setHtmlCode(html);
      setCssCode(css);
      setJsCode(js);
      setLogs([]);
      setValidationResult(null);
      
      saveChallengeCode(currentChallenge.id, { html, css, js });
      setSaveStatus('saved');
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(p => p + 1);
  };

  const handleFormat = async () => {
    setIsFormatting(true);
    try {
      if (activeTab === 'html') {
        const formatted = await formatCode(htmlCode, 'html');
        setHtmlCode(formatted);
      } else if (activeTab === 'css') {
        const formatted = await formatCode(cssCode, 'css');
        setCssCode(formatted);
      } else if (activeTab === 'js') {
        const formatted = await formatCode(jsCode, 'js');
        setJsCode(formatted);
      }
    } catch (e) {
      console.error("Format error", e);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleShare = async () => {
    const payload = {
      id: currentChallenge.id,
      html: htmlCode,
      css: cssCode,
      js: jsCode
    };
    const token = await encodeSharePayload(payload);
    const url = `${window.location.origin}/s/${token}`;
    
    setShareUrl(url);
    setIsShareModalOpen(true);
    setModalCopyFeedback(false);

    // Update the browser URL to the share URL immediately
    window.history.replaceState({}, '', url);

    try {
      await navigator.clipboard.writeText(url);
      setModalCopyFeedback(true);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch(e) {
      console.warn("Auto-copy failed", e);
    }
  };

  const progressPercentage = Math.round((completedIds.length / CHALLENGES.length) * 100);

  if (isLoadingShared) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-zinc-300 font-sans">
        <div className="text-center">
          <div className="animate-spin text-blue-500 mb-4 flex justify-center">
            <RefreshCw className="w-8 h-8" />
          </div>
          <p className="text-sm font-medium animate-pulse">Restoring shared solution...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-300 font-sans overflow-hidden">
      
      {/* Sidebar - Navigation */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-zinc-800 bg-[#09090b]">
        {/* Brand */}
        <div className="h-14 flex items-center px-5 border-b border-zinc-800 gap-3 text-white">
           <div className="bg-blue-600 p-1 rounded-md">
             <Code2 className="w-5 h-5 text-white" />
           </div>
           <span className="font-bold text-lg tracking-tight">HTML, CSS & JS Lab</span>
        </div>
        
        {/* Curriculum List */}
        <div className="flex-1 overflow-y-auto py-4">
           <div className="px-5 mb-6">
             <div className="flex items-center justify-between mb-1">
               <h3 className="text-sm font-bold text-white">Curriculum</h3>
               <span className="text-[10px] font-mono text-zinc-500">{progressPercentage}%</span>
             </div>
             <p className="text-xs text-zinc-500 mt-0.5 mb-3">Frontend Fundamentals</p>
             
             {/* Progress Bar */}
             <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-800/50">
                <div 
                   className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-700 ease-out"
                   style={{ width: `${progressPercentage}%` }} 
                />
             </div>
             <div className="text-[10px] text-zinc-600 text-right mt-1.5 font-medium">
               {completedIds.length} of {CHALLENGES.length} challenges completed
             </div>
           </div>
           
           <div className="space-y-0.5">
             {CHALLENGES.map((challenge, index) => {
               const isActive = index === currentChallengeIndex;
               const isCompleted = completedIds.includes(challenge.id);
               
               return (
                 <button
                   key={challenge.id}
                   onClick={() => setCurrentChallengeIndex(index)}
                   className={clsx(
                     "w-full text-left px-5 py-3 flex items-start gap-3 transition-colors border-l-2",
                     isActive 
                       ? "bg-blue-900/10 border-blue-500" 
                       : "border-transparent hover:bg-zinc-900"
                   )}
                 >
                   <div className={clsx("mt-0.5", isCompleted ? "text-green-500" : "text-zinc-600")}>
                     {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
                   </div>
                   <div>
                     <div className={clsx("text-sm font-medium", isActive ? "text-blue-400" : "text-zinc-300")}>
                       {challenge.title}
                     </div>
                     <div className="text-xs text-zinc-500 mt-1 capitalize">
                       {challenge.type === 'mixed' ? 'HTML/CSS/JS' : challenge.type} • {challenge.difficulty}
                     </div>
                   </div>
                 </button>
               );
             })}
           </div>
        </div>
      </aside>

      {/* Main Content Area - Split View */}
      <main className="flex-1 flex min-w-0">
        
        {/* Middle Column: Instructions & Editor */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-zinc-800 bg-[#18181b]">
           
           {/* Instructions Area */}
           <div className="flex-shrink-0 p-6 border-b border-zinc-800 bg-[#18181b] max-h-[40vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-2">{currentChallenge.title}</h2>
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                {currentChallenge.description}
              </p>
              
              <div className="bg-zinc-800/50 rounded-lg border border-zinc-800 p-4 mb-4">
                 <div className="flex items-center gap-2 text-white font-semibold mb-2">
                   <BookOpen size={16} className="text-blue-400" />
                   Instructions
                 </div>
                 <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1 ml-1">
                    <li>Read the description above carefully.</li>
                    <li>Write your code in the editor below.</li>
                    <li>The preview updates automatically. Click "Run Tests" to verify.</li>
                 </ul>
              </div>

              {currentChallenge.hint && (
                <div>
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 text-sm font-medium transition-colors"
                  >
                    <Lightbulb size={16} />
                    {showHint ? "Hide Hint" : "Need a Hint?"}
                  </button>
                  
                  {showHint && (
                    <div className="mt-3 p-3 bg-yellow-900/20 text-yellow-200 text-sm rounded border border-yellow-900/50 animate-in fade-in slide-in-from-top-2">
                       {currentChallenge.hint}
                    </div>
                  )}
                </div>
              )}
           </div>

           {/* Editor Section */}
           <div className="flex-1 flex flex-col min-h-0">
              {/* File Tabs Header */}
              <div className="flex items-center bg-[#18181b] border-b border-zinc-800 px-2 pt-2 gap-1">
                 <button 
                   onClick={() => setActiveTab('html')}
                   className={clsx(
                     "px-4 py-2 text-xs font-medium flex items-center gap-2 rounded-t-md transition-colors border-t border-l border-r",
                     activeTab === 'html' 
                       ? "bg-[#1e1e1e] border-zinc-700 text-zinc-100" 
                       : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                   )}
                 >
                   <FileCode size={14} className="text-orange-500" /> index.html
                 </button>
                 <button 
                   onClick={() => setActiveTab('css')}
                   className={clsx(
                     "px-4 py-2 text-xs font-medium flex items-center gap-2 rounded-t-md transition-colors border-t border-l border-r",
                     activeTab === 'css' 
                       ? "bg-[#1e1e1e] border-zinc-700 text-zinc-100" 
                       : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                   )}
                 >
                   <Layers size={14} className="text-blue-500" /> styles.css
                 </button>
                 <button 
                   onClick={() => setActiveTab('js')}
                   className={clsx(
                     "px-4 py-2 text-xs font-medium flex items-center gap-2 rounded-t-md transition-colors border-t border-l border-r",
                     activeTab === 'js' 
                       ? "bg-[#1e1e1e] border-zinc-700 text-zinc-100" 
                       : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                   )}
                 >
                   <FileCode size={14} className="text-yellow-400" /> script.js
                 </button>

                 <div className="ml-auto flex items-center gap-3 mb-1 px-2 flex-shrink-0">
                    {/* Auto-save Indicator */}
                    <div className="flex items-center gap-1.5 mr-2">
                      {saveStatus === 'saving' && (
                        <div className="flex items-center gap-1 text-zinc-500 text-xs">
                           <Cloud size={14} className="animate-pulse" />
                           <span>Saving...</span>
                        </div>
                      )}
                      {saveStatus === 'saved' && !copyFeedback && (
                        <div className="flex items-center gap-1 text-zinc-500 text-xs animate-in fade-in duration-300">
                           <Check size={14} />
                           <span>Saved</span>
                        </div>
                      )}
                      {copyFeedback && (
                         <div className="flex items-center gap-1 text-green-400 text-xs animate-in fade-in duration-300">
                           <Check size={14} />
                           <span>Link Copied!</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Share Button */}
                    <button 
                      id="share-solution-btn"
                      onClick={handleShare} 
                      title="Share Solution" 
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <Share2 size={14} />
                    </button>

                    {/* Format Button */}
                    <button 
                      id="format-code-btn"
                      onClick={handleFormat} 
                      title="Format Code (Ctrl+S)" 
                      className={clsx(
                        "text-zinc-500 hover:text-zinc-300 transition-colors",
                        isFormatting && "animate-spin text-blue-400"
                      )}
                    >
                      <Wand2 size={14} />
                    </button>

                    <button id="reset-code-btn" onClick={handleReset} title="Reset Code" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                      <RotateCcw size={14} />
                    </button>
                 </div>
              </div>

              {/* Monaco Editor Container */}
              <div className="flex-1 relative bg-[#1e1e1e]">
                 <div className={clsx("absolute inset-0", activeTab === 'html' ? 'z-10' : 'z-0')}>
                    <CodeEditor language="html" value={htmlCode} onChange={(v) => setHtmlCode(v || '')} />
                 </div>
                 <div className={clsx("absolute inset-0", activeTab === 'css' ? 'z-10' : 'z-0')}>
                    <CodeEditor language="css" value={cssCode} onChange={(v) => setCssCode(v || '')} />
                 </div>
                 <div className={clsx("absolute inset-0", activeTab === 'js' ? 'z-10' : 'z-0')}>
                    <CodeEditor language="js" value={jsCode} onChange={(v) => setJsCode(v || '')} />
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: Preview & Console */}
        <div className="w-[45%] flex flex-col bg-[#09090b]">
           
           {/* Preview Header */}
           <div className="h-12 flex items-center justify-between px-4 border-b border-zinc-800 bg-[#18181b]">
              <div className="flex items-center gap-2">
                 <span className="text-sm font-semibold text-zinc-400">Preview</span>
                 <div className="flex items-center gap-1 text-[10px] text-red-400 bg-red-900/20 px-2 py-0.5 rounded-full border border-red-900/30 animate-pulse">
                    <Zap size={10} fill="currentColor" /> LIVE
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                   id="refresh-preview-btn"
                   onClick={handleRefresh}
                   className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded transition-colors border border-zinc-700"
                 >
                   <RefreshCw size={12} /> Refresh
                 </button>
                 <button 
                   id="run-tests-btn"
                   onClick={handleRun}
                   className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white text-xs font-bold rounded transition-colors shadow-sm shadow-green-900/20"
                 >
                   <Play size={12} fill="currentColor" /> Run Tests
                 </button>
              </div>
           </div>

           {/* Preview Iframe */}
           <div className="flex-1 bg-white relative">
              <Preview 
                html={debouncedHtml} 
                css={debouncedCss} 
                js={debouncedJs} 
                refreshTrigger={refreshTrigger}
                onConsole={handleConsole}
                onValidateResult={handleValidationResult}
              />
           </div>

           {/* Console */}
           <div className="h-1/3 min-h-[160px] max-h-[300px] border-t border-zinc-800 bg-[#18181b] flex flex-col">
              <Console 
                 logs={logs} 
                 validationResult={validationResult} 
                 onClear={() => setLogs([])} 
              />
            </div>
         </div>
      </main>

      {/* Share Modal Dialog */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#18181b] border border-zinc-800 rounded-lg max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2">Share Your Solution</h3>
            <p className="text-zinc-400 text-xs mb-4">
              Your code has been encoded into the link below. Anyone opening this link can view and run your solution.
            </p>
            
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  id="share-link-input"
                  value={shareUrl} 
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs font-mono text-zinc-300 select-all focus:outline-none focus:border-blue-500"
                />
                <button
                  id="modal-copy-btn"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(shareUrl);
                      setModalCopyFeedback(true);
                      setTimeout(() => setModalCopyFeedback(false), 2000);
                    } catch (e) {
                      setModalCopyFeedback(true);
                      setTimeout(() => setModalCopyFeedback(false), 2000);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded transition-colors whitespace-nowrap"
                >
                  {modalCopyFeedback ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {modalCopyFeedback && (
                <div id="share-copy-toast" className="text-green-400 text-xs font-medium animate-in fade-in duration-200">
                  Link copied to clipboard!
                </div>
              )}

              <div className="flex justify-end mt-2">
                <button
                  id="close-share-modal-btn"
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;