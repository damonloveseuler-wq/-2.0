import React, { useState } from 'react';
import { ArrowUp, CornerDownLeft, Delete } from 'lucide-react';
import { playKeySound, triggerHaptic } from '../utils/soundEffects';

interface EnglishKeyboardProps {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  onKeyCommit: (char: string) => void;
  onActionCommit: (action: string) => void;
  onModeToggle: (mode: string) => void;
}

export const EnglishKeyboard: React.FC<EnglishKeyboardProps> = ({
  soundEnabled,
  hapticEnabled,
  onKeyCommit,
  onActionCommit,
  onModeToggle,
}) => {
  const [isShifted, setIsShifted] = useState(false);

  const row1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const row2 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row3 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row4 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const handleKeyTap = (char: string) => {
    if (soundEnabled) playKeySound('tap');
    if (hapticEnabled) triggerHaptic(10);
    const finalChar = isShifted ? char.toUpperCase() : char;
    onKeyCommit(finalChar);
    if (isShifted) setIsShifted(false);
  };

  const handleAction = (action: string) => {
    if (soundEnabled) {
      if (action === 'backspace') playKeySound('delete');
      else playKeySound('action');
    }
    if (hapticEnabled) triggerHaptic(12);
    onActionCommit(action);
  };

  return (
    <div className="w-full flex flex-col gap-1.5 p-2 rounded-2xl bg-[#d0d3d9] dark:bg-[#1e2024] select-none">
      {/* Row 1: Numbers */}
      <div className="grid grid-cols-10 gap-1">
        {row1.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleKeyTap(num)}
            className="h-10 rounded-lg bg-[#e5e7eb] hover:bg-[#dcdfe4] active:bg-[#d1d5db] dark:bg-[#2c2f36] dark:hover:bg-[#353841] text-[#374151] dark:text-[#d1d5db] font-medium text-sm active:translate-y-[1px] transition-all"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Row 2: QWERTY */}
      <div className="grid grid-cols-10 gap-1">
        {row2.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => handleKeyTap(char)}
            className="h-12 rounded-lg bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-[#32363e] dark:hover:bg-[#3a3f48] text-neutral-900 dark:text-neutral-100 font-semibold text-lg active:translate-y-[1px] transition-all"
          >
            {isShifted ? char.toUpperCase() : char}
          </button>
        ))}
      </div>

      {/* Row 3: ASDFGHJKL */}
      <div className="flex justify-center gap-1 px-3">
        {row3.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => handleKeyTap(char)}
            className="flex-1 h-12 rounded-lg bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-[#32363e] dark:hover:bg-[#3a3f48] text-neutral-900 dark:text-neutral-100 font-semibold text-lg active:translate-y-[1px] transition-all"
          >
            {isShifted ? char.toUpperCase() : char}
          </button>
        ))}
      </div>

      {/* Row 4: Shift, ZXCVBNM, Backspace */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setIsShifted(!isShifted)}
          className={`flex items-center justify-center px-3.5 h-12 rounded-lg font-medium active:translate-y-[1px] transition-all ${
            isShifted
              ? 'bg-blue-600 text-white'
              : 'bg-[#bcc0c7] hover:bg-[#b0b4bc] dark:bg-[#43464d] dark:hover:bg-[#4d5058] text-[#1c1d1f] dark:text-[#f0f0f2]'
          }`}
          title="대문자 토글"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        <div className="flex-1 grid grid-cols-7 gap-1">
          {row4.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => handleKeyTap(char)}
              className="h-12 rounded-lg bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-[#32363e] dark:hover:bg-[#3a3f48] text-neutral-900 dark:text-neutral-100 font-semibold text-lg active:translate-y-[1px] transition-all"
            >
              {isShifted ? char.toUpperCase() : char}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleAction('backspace')}
          className="flex items-center justify-center px-3.5 h-12 rounded-lg bg-[#bcc0c7] hover:bg-[#b0b4bc] active:bg-[#a6abb3] dark:bg-[#43464d] dark:hover:bg-[#4d5058] text-[#1c1d1f] dark:text-[#f0f0f2] active:translate-y-[1px] transition-all"
          title="지우기"
        >
          <Delete className="w-5 h-5" />
        </button>
      </div>

      {/* Row 5: Emoji, Mode, Space, Enter, Lang Toggle */}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onModeToggle('emoji')}
          className="px-3 h-12 rounded-lg bg-[#bcc0c7] hover:bg-[#b0b4bc] dark:bg-[#43464d] text-xs font-semibold text-[#1c1d1f] dark:text-[#f0f0f2] active:translate-y-[1px]"
        >
          이모지
        </button>

        <button
          type="button"
          onClick={() => onModeToggle('symbols')}
          className="px-2.5 h-12 rounded-lg bg-[#bcc0c7] hover:bg-[#b0b4bc] dark:bg-[#43464d] text-xs font-semibold text-[#1c1d1f] dark:text-[#f0f0f2] active:translate-y-[1px]"
        >
          123#
        </button>

        <button
          type="button"
          onClick={() => handleAction('space')}
          className="flex-1 h-12 rounded-lg bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-[#32363e] dark:hover:bg-[#3a3f48] font-medium text-sm text-neutral-600 dark:text-neutral-300 active:translate-y-[1px]"
        >
          space
        </button>

        <button
          type="button"
          onClick={() => handleAction('enter')}
          className="px-4 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium active:translate-y-[1px]"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onModeToggle('lang')}
          className="px-3.5 h-12 rounded-lg bg-[#bcc0c7] hover:bg-[#b0b4bc] dark:bg-[#43464d] text-xs font-semibold text-[#1c1d1f] dark:text-[#f0f0f2] active:translate-y-[1px]"
        >
          한글
        </button>
      </div>
    </div>
  );
};
