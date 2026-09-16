import React, { useState, useEffect } from 'react';
import { Copy, Check, Trash2, RotateCcw } from 'lucide-react';

interface DisplayAreaProps {
  text: string;
  lastGestureFeedback: string | null;
  onClear: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export const DisplayArea: React.FC<DisplayAreaProps> = ({
  text,
  lastGestureFeedback,
  onClear,
  onUndo,
  canUndo,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
    }
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <section className="flex flex-col gap-2">
      {/* Upper toolbar */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 px-1">
        <div className="flex items-center gap-2">
          <span>글자: <strong className="font-semibold text-neutral-700 dark:text-neutral-300">{charCount}</strong></span>
          <span>•</span>
          <span>단어: <strong className="font-semibold text-neutral-700 dark:text-neutral-300">{wordCount}</strong></span>
          {lastGestureFeedback && (
            <span className="ml-1 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
              [{lastGestureFeedback}]
            </span>
          )}
        </div>
      </div>

      {/* Screen Text Box */}
      <div className="relative">
        <textarea
          id="output"
          value={text}
          readOnly
          placeholder="키보드를 터치하거나 스와이프하세요..."
          className="w-full h-32 p-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl resize-none outline-none font-medium text-neutral-900 dark:text-neutral-100 tracking-normal leading-relaxed placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-neutral-400 transition-colors text-xl"
        />

        {/* Floating action bar */}
        <div className="absolute right-2 bottom-2.5 flex items-center gap-1 bg-white/95 dark:bg-neutral-800/95 p-1 rounded-lg border border-neutral-200/80 dark:border-neutral-700">
          {canUndo && (
            <button
              type="button"
              onClick={onUndo}
              className="p-1.5 rounded text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              title="실행 취소"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-25 transition-colors"
            title="복사"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100" />
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>복사</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={!text}
            className="p-1.5 rounded text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-neutral-700 disabled:opacity-25 transition-colors"
            title="지우기"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
