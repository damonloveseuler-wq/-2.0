export type KeyboardMode = 'korean' | 'english' | 'emoji' | 'symbols' | 'hanja';

export type SwipeDirection = 'U' | 'D' | 'L' | 'R';

export interface KeyGestureHint {
  dir: SwipeDirection;
  label: string;
  char: string;
}

export interface HanjaEntry {
  hangul: string;
  hanja: string;
  meaning: string;
}

export interface KeyboardSettings {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  showHints: boolean;
  threshold: number;
  darkMode: boolean;
}
