import React from 'react';
import { ArrowLeft, Delete, CornerDownLeft } from 'lucide-react';
import { SYMBOLS_GROUPS } from '../data/keyboardData';
import { playKeySound, triggerHaptic } from '../utils/soundEffects';

interface SymbolsKeyboardProps {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  onSymbolCommit: (symbol: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onReturn: () => void;
}

export const SymbolsKeyboard: React.FC<SymbolsKeyboardProps> = ({
  soundEnabled,
  hapticEnabled,
  onSymbolCommit,
  onBackspace,
  onEnter,
  onSpace,
  onReturn,
}) => {
  const handleKeyTap = (symbol: string) => {
    if (soundEnabled) playKeySound('tap');
    if (hapticEnabled) triggerHaptic(10);
    onSymbolCommit(symbol);
  };

  const handleAction = (action: 'backspace' | 'enter' | 'space') => {
    if (soundEnabled) {
      if (action === 'backspace') playKeySound('delete');
      else playKeySound('action');
    }
    if (hapticEnabled) triggerHaptic(12);
    if (action === 'backspace') onBackspace();
    else if (action === 'enter') onEnter();
    else if (action === 'space') onSpace();
  };

  return (
    <div className="w-full flex flex-col gap-1.5 p-2 rounded-2xl bg-[#d0d3d9] dark:bg-[#1e2024] select-none animate-fade-in">
      <div className="flex items-center justify-between px-1 pb-1 border-b border-neutral-300/60 dark:border-neutral-800">
        <button
          type="button"
          onClick={onReturn}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#bcc0c7] dark:bg-[#43464d] text-[#1c1d1f] dark:text-[#f0f0f2] hover:opacity-90 active:translate-y-[1px] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>한글 키보드</span>
        </button>
        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">특수문자 & 기호</span>
      </div>

      <div className="flex flex-col gap-1 max-h-[210px] overflow-y-auto">
        {SYMBOLS_GROUPS.map((row, rIdx) => (
          <div key={rIdx} className="grid grid-cols-10 gap-1">
            {row.map((sym, sIdx) => (
              <button
                key={sIdx}
                type="button"
                onClick={() => handleKeyTap(sym)}
                className="h-10 rounded-lg bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-[#32363e] dark:hover:bg-[#3a3f48] text-neutral-900 dark:text-neutral-100 font-medium text-base active:translate-y-[1px] transition-all"
              >
                {sym}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom control row */}
      <div className="flex gap-1 pt-1">
        <button
          type="button"
          onClick={onReturn}
          className="px-3.5 h-11 rounded-lg bg-[#bcc0c7] dark:bg-[#43464d] text-xs font-semibold text-[#1c1d1f] dark:text-[#f0f0f2] active:translate-y-[1px]"
        >
          한/영
        </button>

        <button
          type="button"
          onClick={() => handleAction('space')}
          className="flex-1 h-11 rounded-lg bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-[#32363e] dark:hover:bg-[#3a3f48] font-medium text-sm text-neutral-600 dark:text-neutral-300 active:translate-y-[1px]"
        >
          space
        </button>

        <button
          type="button"
          onClick={() => handleAction('enter')}
          className="px-4 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium active:translate-y-[1px]"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => handleAction('backspace')}
          className="px-3.5 h-11 rounded-lg bg-[#bcc0c7] hover:bg-[#b0b4bc] active:bg-[#a6abb3] dark:bg-[#43464d] text-[#1c1d1f] dark:text-[#f0f0f2] active:translate-y-[1px]"
        >
          <Delete className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
