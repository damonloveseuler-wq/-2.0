import React, { useState } from 'react';
import { ArrowLeft, Delete } from 'lucide-react';
import { EMOJI_CATEGORIES } from '../data/keyboardData';
import { playKeySound, triggerHaptic } from '../utils/soundEffects';

interface EmojiPaletteProps {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  onEmojiSelect: (emoji: string) => void;
  onBackspace: () => void;
  onReturn: () => void;
}

export const EmojiPalette: React.FC<EmojiPaletteProps> = ({
  soundEnabled,
  hapticEnabled,
  onEmojiSelect,
  onBackspace,
  onReturn,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleSelect = (emoji: string) => {
    if (soundEnabled) playKeySound('tap');
    if (hapticEnabled) triggerHaptic(10);
    onEmojiSelect(emoji);
  };

  const handleBack = () => {
    if (soundEnabled) playKeySound('delete');
    if (hapticEnabled) triggerHaptic(12);
    onBackspace();
  };

  return (
    <div className="w-full flex flex-col gap-2 p-2 rounded-2xl bg-[#d0d3d9] dark:bg-[#1e2024] select-none animate-fade-in">
      {/* Category Tabs */}
      <div className="flex items-center justify-between gap-1 pb-1 border-b border-neutral-300/60 dark:border-neutral-800">
        <button
          type="button"
          onClick={onReturn}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#bcc0c7] dark:bg-[#43464d] text-[#1c1d1f] dark:text-[#f0f0f2] hover:opacity-90 active:translate-y-[1px] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>한글 키보드</span>
        </button>

        <div className="flex gap-1 overflow-x-auto py-0.5">
          {EMOJI_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                activeTab === idx
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-[#bcc0c7]/50 dark:hover:bg-neutral-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleBack}
          className="p-1.5 rounded-lg bg-[#bcc0c7] hover:bg-[#b0b4bc] dark:bg-[#43464d] text-[#1c1d1f] dark:text-[#f0f0f2] active:translate-y-[1px] transition-colors"
          title="지우기"
        >
          <Delete className="w-4 h-4" />
        </button>
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-10 gap-1.5 p-1 max-h-[170px] overflow-y-auto">
        {EMOJI_CATEGORIES[activeTab].emojis.map((emoji, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelect(emoji)}
            className="flex items-center justify-center h-10 text-2xl rounded-lg hover:bg-white/60 dark:hover:bg-neutral-800 active:scale-90 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
