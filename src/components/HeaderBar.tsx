import React from 'react';
import { KeyboardMode } from '../types';

interface HeaderBarProps {
  mode: KeyboardMode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ mode }) => {
  const getModeLabel = () => {
    switch (mode) {
      case 'korean':
        return '천지인 2.0 (한글)';
      case 'english':
        return '영문 QWERTY';
      case 'emoji':
        return '이모지 팔레트';
      case 'symbols':
        return '특수문자';
      case 'hanja':
        return '한자 변환';
    }
  };

  return (
    <header className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          천지인 2.0
        </h1>
        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-normal">
          / {getModeLabel()}
        </span>
      </div>
    </header>
  );
};
