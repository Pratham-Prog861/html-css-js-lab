import React from 'react';
import { ConsoleMessage } from '../types';
import { Terminal, XCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import clsx from 'clsx';

interface ConsoleProps {
  logs: ConsoleMessage[];
  validationResult: { success: boolean; message: string } | null;
  onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({ logs, validationResult, onClear }) => {
  return (
    <div className="flex flex-col h-full bg-[#18181b] text-sm font-mono">
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">Console</span>
        </div>
        <button 
          id="console-clear-btn"
          onClick={onClear} 
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Validation Result Block */}
        {validationResult && (
          <div className={clsx(
            "p-3 rounded-md border mb-4 text-xs",
            validationResult.success 
              ? "bg-green-900/20 border-green-900/50 text-green-300" 
              : "bg-red-900/20 border-red-900/50 text-red-300"
          )}>
            <div className="flex items-start gap-2">
              {validationResult.success ? (
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <div className="font-bold mb-1">
                  {validationResult.success ? 'All Tests Passed' : 'Tests Failed'}
                </div>
                <div className="opacity-90 leading-relaxed">{validationResult.message}</div>
              </div>
            </div>
          </div>
        )}

        {/* Logs */}
        {logs.length === 0 && !validationResult && (
          <div className="text-zinc-600 italic text-xs">Console is empty...</div>
        )}

        {logs.map((log, index) => (
          <div key={index} className="flex gap-2 text-zinc-300 border-b border-zinc-800/50 pb-1 last:border-0 text-xs font-medium">
            <div className="mt-0.5 flex-shrink-0">
               {log.type === 'error' ? <XCircle size={12} className="text-red-500" /> : 
                log.type === 'warn' ? <AlertTriangle size={12} className="text-yellow-500" /> :
                <Info size={12} className="text-blue-500" />}
            </div>
            <div className={clsx(
              "whitespace-pre-wrap break-all leading-tight",
              log.type === 'error' && "text-red-400",
              log.type === 'warn' && "text-yellow-400"
            )}>
              {log.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Console;