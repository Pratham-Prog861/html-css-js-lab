import React from 'react';
import Editor, { OnMount, loader } from '@monaco-editor/react';
import { CodeType } from '../types';
import { formatCode } from '../services/formatter';

// Explicitly configure the loader to use jsDelivr.
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs',
  },
});

interface CodeEditorProps {
  language: CodeType;
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
}

// Keep track of registered languages to avoid duplicate registration
const registeredLanguages = new Set<string>();

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange, readOnly = false }) => {
  
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // 1. Configure Editor Options
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      padding: { top: 16, bottom: 16 },
      formatOnPaste: true,
      formatOnType: true,
    });

    const monacoLanguage = language === 'js' ? 'javascript' : language;

    // 2. Register Prettier Formatter
    if (!registeredLanguages.has(monacoLanguage)) {
      monaco.languages.registerDocumentFormattingEditProvider(monacoLanguage, {
        async provideDocumentFormattingEdits(model) {
          const text = model.getValue();
          const formatted = await formatCode(text, language);
          return [
            {
              range: model.getFullModelRange(),
              text: formatted,
            },
          ];
        },
      });
      registeredLanguages.add(monacoLanguage);
    }

    // 3. Add Keybinding for Save (Ctrl+S / Cmd+S) to Trigger Format
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  const monacoLanguage = language === 'js' ? 'javascript' : language;

  return (
    <div className="h-full w-full overflow-hidden bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage={monacoLanguage}
        language={monacoLanguage}
        value={value}
        theme="vs-dark"
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          tabSize: 2,
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
        }}
      />
    </div>
  );
};

export default CodeEditor;