import React from 'react';

interface DisplayAreaProps {
  text: string;
  lastGestureFeedback: string | null;
}

export const DisplayArea: React.FC<DisplayAreaProps> = ({
  text,
  lastGestureFeedback,
}) => {
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
      </div>
    </section>
  );
};
