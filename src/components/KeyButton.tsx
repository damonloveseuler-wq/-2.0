import React, { useState, useRef } from 'react';
import { KeyConfig, GESTURE_RULES } from '../data/keyboardData';
import { SwipeDirection } from '../types';
import { playKeySound, triggerHaptic } from '../utils/soundEffects';

interface KeyButtonProps {
  config: KeyConfig;
  showHints: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  threshold?: number;
  onKeyCommit: (char: string, feedback?: string) => void;
  onActionCommit: (action: string) => void;
  onModeToggle: (mode: string) => void;
}

export const KeyButton: React.FC<KeyButtonProps> = ({
  config,
  showHints,
  soundEnabled,
  hapticEnabled,
  threshold = 15,
  onKeyCommit,
  onActionCommit,
  onModeToggle,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [candidateChar, setCandidateChar] = useState<string | null>(null);
  const [lastDirection, setLastDirection] = useState<SwipeDirection | null>(null);

  const startCoord = useRef<{ x: number; y: number } | null>(null);
  const lastCoord = useRef<{ x: number; y: number } | null>(null);
  const movementHistory = useRef<SwipeDirection[]>([]);
  const hasMovedRef = useRef<boolean>(false);

  const isGestureKey = Boolean(GESTURE_RULES[config.char]);

  const computeCandidate = (pattern: string): string => {
    if (GESTURE_RULES[config.char]) {
      return GESTURE_RULES[config.char](pattern);
    }
    return config.char;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPressed(true);
    hasMovedRef.current = false;
    startCoord.current = { x: e.clientX, y: e.clientY };
    lastCoord.current = { x: e.clientX, y: e.clientY };
    movementHistory.current = [];
    setLastDirection(null);
    setCandidateChar(config.char);

    if (soundEnabled) {
      if (config.type === 'action') playKeySound('delete');
      else playKeySound('tap');
    }
    if (hapticEnabled) triggerHaptic(10);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!startCoord.current || !lastCoord.current || !isGestureKey) return;

    const diffX = e.clientX - lastCoord.current.x;
    const diffY = e.clientY - lastCoord.current.y;

    let dir: SwipeDirection | null = null;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > threshold) {
        dir = diffX > 0 ? 'R' : 'L';
      }
    } else {
      if (Math.abs(diffY) > threshold) {
        dir = diffY > 0 ? 'D' : 'U';
      }
    }

    if (dir) {
      hasMovedRef.current = true;
      const hist = movementHistory.current;
      if (hist.length === 0 || hist[hist.length - 1] !== dir) {
        hist.push(dir);
        lastCoord.current = { x: e.clientX, y: e.clientY };
        setLastDirection(dir);

        const newCand = computeCandidate(hist.join(''));
        setCandidateChar(newCand);

        if (soundEnabled) playKeySound('swipe');
        if (hapticEnabled) triggerHaptic(15);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer was lost
    }

    setIsPressed(false);

    if (config.type === 'mode' && config.action) {
      onModeToggle(config.action);
    } else if (config.type === 'action' && config.action) {
      onActionCommit(config.action);
    } else {
      let finalChar = config.char;
      let feedback = '';

      if (isGestureKey) {
        const pattern = movementHistory.current.join('');
        finalChar = computeCandidate(pattern);
        if (pattern) {
          const dirSymbols = pattern.split('').map(d => {
            if (d === 'U') return '↑';
            if (d === 'D') return '↓';
            if (d === 'L') return '←';
            if (d === 'R') return '→';
            return d;
          }).join(' ');
          feedback = `${config.char} + [${dirSymbols}] → ${finalChar}`;
        }
      }

      onKeyCommit(finalChar, feedback || undefined);
    }

    // Reset tracking
    startCoord.current = null;
    lastCoord.current = null;
    movementHistory.current = [];
    setCandidateChar(null);
    setLastDirection(null);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    setIsPressed(false);
    startCoord.current = null;
    lastCoord.current = null;
    movementHistory.current = [];
    setCandidateChar(null);
    setLastDirection(null);
  };

  // Determine styling based on key type and grid
  const isActionKey = config.type === 'action';
  const isModeKey = config.type === 'mode';
  const isNumKey = config.char >= '0' && config.char <= '9';
  const isEnterKey = config.action === 'enter';

  let baseKeyClasses = 'relative select-none touch-none flex flex-col items-center justify-center font-medium transition-all duration-75 outline-none rounded-lg text-center active:translate-y-[1px] ';

  if (isEnterKey) {
    baseKeyClasses += 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium ';
  } else if (isActionKey || isModeKey) {
    baseKeyClasses += 'bg-[#bcc0c7] hover:bg-[#b0b4bc] active:bg-[#a6abb3] dark:bg-[#43464d] dark:hover:bg-[#4d5058] dark:active:bg-[#383a40] text-[#1c1d1f] dark:text-[#f0f0f2] ';
  } else if (isNumKey) {
    baseKeyClasses += 'bg-[#e5e7eb] hover:bg-[#dcdfe4] dark:bg-[#2c2f36] dark:hover:bg-[#353841] text-[#374151] dark:text-[#d1d5db] text-sm h-10 ';
  } else {
    // Standard letter key
    baseKeyClasses += 'bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-[#32363e] dark:hover:bg-[#3a3f48] dark:active:bg-[#282a30] text-[#111827] dark:text-[#f9fafb] text-xl ';
  }

  if (isPressed && !isEnterKey) {
    baseKeyClasses += 'ring-1.5 ring-blue-500/80 bg-blue-50/70 dark:bg-blue-950/60 ';
  }

  const minHeightClass = isNumKey ? 'min-h-[38px]' : (config.gridClass.includes('row-span-2') ? 'min-h-[108px]' : 'min-h-[52px]');

  return (
    <div className={`relative ${config.gridClass}`}>
      {/* Floating gesture popup magnification bubble */}
      {isPressed && isGestureKey && candidateChar && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-scale-in">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-lg border border-neutral-700/50 dark:border-neutral-200">
            <span>{candidateChar}</span>
            {lastDirection && (
              <span className="text-xs text-blue-400 dark:text-blue-600 font-mono font-semibold">
                {lastDirection === 'U' ? '↑' : lastDirection === 'D' ? '↓' : lastDirection === 'L' ? '←' : '→'}
              </span>
            )}
          </div>
          <div className="w-2.5 h-2.5 bg-neutral-900 dark:bg-white rotate-45 -mt-1.5" />
        </div>
      )}

      <button
        type="button"
        id={config.keyId}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`w-full h-full ${minHeightClass} ${baseKeyClasses}`}
      >
        {/* Main Character Display */}
        <span className="leading-tight font-semibold">
          {config.display || config.char}
        </span>

        {/* Gesture Hint Subscript / Indicator */}
        {showHints && config.hints && config.hints.length > 0 && (
          <div className="absolute bottom-1 right-1.5 flex items-center gap-1 text-[10px] text-neutral-400 dark:text-neutral-500 pointer-events-none font-mono font-normal">
            {config.hints.map((hint, idx) => (
              <span key={idx} className="leading-none">
                <span className="opacity-75 text-blue-600 dark:text-blue-400 font-bold">{hint.label}</span>
                <span>{hint.char}</span>
              </span>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};
