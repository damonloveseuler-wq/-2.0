import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { HANJA_DICTIONARY } from '../data/keyboardData';
import { HanjaEntry } from '../types';
import { playKeySound, triggerHaptic } from '../utils/soundEffects';

interface HanjaModalProps {
  lastChar: string | null;
  isOpen: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  onClose: () => void;
  onSelectHanja: (hanjaChar: string) => void;
}

export const HanjaModal: React.FC<HanjaModalProps> = ({
  lastChar,
  isOpen,
  soundEnabled,
  hapticEnabled,
  onClose,
  onSelectHanja,
}) => {
  const [searchQuery, setSearchQuery] = useState(lastChar || '한');

  if (!isOpen) return null;

  const currentQuery = searchQuery.trim() || lastChar || '한';
  const entries: HanjaEntry[] = HANJA_DICTIONARY[currentQuery] || [];

  const handleSelect = (hanja: string) => {
    if (soundEnabled) playKeySound('action');
    if (hapticEnabled) triggerHaptic(15);
    onSelectHanja(hanja);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            한자 변환
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input & preset suggestions */}
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              maxLength={2}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="음 입력 (예: 한, 국, 천, 지, 인, 대, 신...)"
              className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-transparent focus:border-blue-500 outline-none text-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] text-neutral-400 whitespace-nowrap">추천:</span>
            {Object.keys(HANJA_DICTIONARY).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setSearchQuery(k)}
                className={`px-2 py-0.5 text-xs rounded-md font-medium transition-colors ${
                  currentQuery === k
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Hanja list */}
        <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-1.5 min-h-[160px]">
          {entries.length > 0 ? (
            entries.map((entry, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(entry.hanja)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-serif font-bold text-2xl text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {entry.hanja}
                  </span>
                  <div>
                    <div className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                      {entry.meaning}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      독음: {entry.hangul}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 flex items-center gap-1">
                  선택 <Check className="w-3.5 h-3.5" />
                </span>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-neutral-400 text-xs text-center">
              <span>'{currentQuery}'에 해당하는 한자를 찾을 수 없습니다.</span>
              <span className="mt-1">상단의 추천 글자(한, 국, 천, 지, 인 등)를 눌러보세요.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
