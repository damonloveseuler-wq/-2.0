import React from 'react';
import { KEYBOARD_ROWS } from '../data/keyboardData';
import { KeyButton } from './KeyButton';

interface KeyboardGridProps {
  showHints: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  threshold: number;
  onKeyCommit: (char: string, feedback?: string) => void;
  onActionCommit: (action: string) => void;
  onModeToggle: (mode: string) => void;
}

export const KeyboardGrid: React.FC<KeyboardGridProps> = ({
  showHints,
  soundEnabled,
  hapticEnabled,
  threshold,
  onKeyCommit,
  onActionCommit,
  onModeToggle,
}) => {
  // Flatten all rows for CSS Grid layout
  const allKeys = KEYBOARD_ROWS.flat();

  return (
    <div
      className="keyboard w-full grid gap-1.5 p-2 rounded-2xl bg-[#d0d3d9] dark:bg-[#1e2024] select-none"
      style={{
        gridTemplateColumns: 'repeat(40, minmax(0, 1fr))',
      }}
    >
      {allKeys.map((keyConfig) => (
        <KeyButton
          key={keyConfig.keyId}
          config={keyConfig}
          showHints={showHints}
          soundEnabled={soundEnabled}
          hapticEnabled={hapticEnabled}
          threshold={threshold}
          onKeyCommit={onKeyCommit}
          onActionCommit={onActionCommit}
          onModeToggle={onModeToggle}
        />
      ))}
    </div>
  );
};
