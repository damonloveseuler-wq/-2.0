import { HanjaEntry, KeyGestureHint } from '../types';

export interface KeyConfig {
  keyId: string;
  char: string;
  display?: string;
  gridClass: string;
  type?: 'char' | 'action' | 'mode';
  action?: 'backspace' | 'enter' | 'space' | 'lang' | 'emoji' | 'symbols' | 'hanja';
  hints?: KeyGestureHint[];
}

export const GESTURE_RULES: Record<string, (pattern: string) => string> = {
  'ㅡ': (pattern: string) => {
    if (pattern === 'U' || pattern === 'U...') return 'ㅗ';
    if (pattern === 'D') return 'ㅜ';
    if (pattern === 'UDU' || pattern === 'UU') return 'ㅛ';
    if (pattern === 'DUD' || pattern === 'DD') return 'ㅠ';
    return 'ㅡ';
  },
  'ㅣ': (pattern: string) => {
    if (pattern === 'R') return 'ㅏ';
    if (pattern === 'RLR' || pattern === 'RR') return 'ㅑ';
    if (pattern === 'L') return 'ㅓ';
    if (pattern === 'LRL' || pattern === 'LL') return 'ㅕ';
    return 'ㅣ';
  },
  'ㄱ': (pattern: string) => {
    if (pattern === 'U') return 'ㄲ';
    if (pattern === 'R') return 'ㅋ';
    return 'ㄱ';
  },
  'ㄷ': (pattern: string) => {
    if (pattern === 'U') return 'ㄸ';
    if (pattern === 'R') return 'ㅌ';
    return 'ㄷ';
  },
  'ㅂ': (pattern: string) => {
    if (pattern === 'U') return 'ㅃ';
    if (pattern === 'R') return 'ㅍ';
    return 'ㅂ';
  },
  'ㅅ': (pattern: string) => {
    if (pattern === 'U') return 'ㅆ';
    return 'ㅅ';
  },
  'ㅈ': (pattern: string) => {
    if (pattern === 'U') return 'ㅉ';
    if (pattern === 'R') return 'ㅊ';
    return 'ㅈ';
  },
};

export const KEYBOARD_ROWS: KeyConfig[][] = [
  // Row 1: Numbers (40 cols total -> 4 cols each for 10 numbers)
  [
    { keyId: 'num-1', char: '1', gridClass: 'col-span-4' },
    { keyId: 'num-2', char: '2', gridClass: 'col-span-4' },
    { keyId: 'num-3', char: '3', gridClass: 'col-span-4' },
    { keyId: 'num-4', char: '4', gridClass: 'col-span-4' },
    { keyId: 'num-5', char: '5', gridClass: 'col-span-4' },
    { keyId: 'num-6', char: '6', gridClass: 'col-span-4' },
    { keyId: 'num-7', char: '7', gridClass: 'col-span-4' },
    { keyId: 'num-8', char: '8', gridClass: 'col-span-4' },
    { keyId: 'num-9', char: '9', gridClass: 'col-span-4' },
    { keyId: 'num-0', char: '0', gridClass: 'col-span-4' },
  ],
  // Row 2: ㅅ, ㅇ, ㄴ, ⌫ (10 cols each)
  [
    { 
      keyId: 'char-ㅅ', 
      char: 'ㅅ', 
      gridClass: 'col-span-10', 
      hints: [{ dir: 'U', label: '↑', char: 'ㅆ' }] 
    },
    { keyId: 'char-ㅇ', char: 'ㅇ', gridClass: 'col-span-10' },
    { keyId: 'char-ㄴ', char: 'ㄴ', gridClass: 'col-span-10' },
    { keyId: 'action-backspace', char: '⌫', gridClass: 'col-span-10', type: 'action', action: 'backspace' },
  ],
  // Row 3: ㄱ (10), ㅡ (10), ㅣ (10), ㄷ (6), ↵ (4)
  [
    { 
      keyId: 'char-ㄱ', 
      char: 'ㄱ', 
      gridClass: 'col-span-10', 
      hints: [{ dir: 'U', label: '↑', char: 'ㄲ' }, { dir: 'R', label: '→', char: 'ㅋ' }] 
    },
    { 
      keyId: 'char-ㅡ', 
      char: 'ㅡ', 
      gridClass: 'col-span-10', 
      hints: [{ dir: 'U', label: '↑', char: 'ㅗ/ㅛ' }, { dir: 'D', label: '↓', char: 'ㅜ/ㅠ' }] 
    },
    { 
      keyId: 'char-ㅣ', 
      char: 'ㅣ', 
      gridClass: 'col-span-10', 
      hints: [{ dir: 'L', label: '←', char: 'ㅓ/ㅕ' }, { dir: 'R', label: '→', char: 'ㅏ/ㅑ' }] 
    },
    { 
      keyId: 'char-ㄷ', 
      char: 'ㄷ', 
      gridClass: 'col-span-6', 
      hints: [{ dir: 'U', label: '↑', char: 'ㄸ' }, { dir: 'R', label: '→', char: 'ㅌ' }] 
    },
    { keyId: 'action-enter', char: '↵', gridClass: 'col-span-4', type: 'action', action: 'enter' },
  ],
  // Row 4: ㅂ, ㄹ, ㅁ, ㅈ (10 cols each)
  [
    { 
      keyId: 'char-ㅂ', 
      char: 'ㅂ', 
      gridClass: 'col-span-10', 
      hints: [{ dir: 'U', label: '↑', char: 'ㅃ' }, { dir: 'R', label: '→', char: 'ㅍ' }] 
    },
    { keyId: 'char-ㄹ', char: 'ㄹ', gridClass: 'col-span-10' },
    { keyId: 'char-ㅁ', char: 'ㅁ', gridClass: 'col-span-10' },
    { 
      keyId: 'char-ㅈ', 
      char: 'ㅈ', 
      gridClass: 'col-span-10', 
      hints: [{ dir: 'U', label: '↑', char: 'ㅉ' }, { dir: 'R', label: '→', char: 'ㅊ' }] 
    },
  ],
  // Row 5 & 6 Mixed (exact user layout specification):
  // emoji (6 col, 2 rows)
  // Row 5 mid: . (7), ㅊ (7), ㅎ (7), ? (7)
  // lang: 한/영 (6 col, 2 rows)
  // Row 6: 특수문자 (7), ␣ (14), 한자 (7)
  [
    { keyId: 'mode-emoji', char: '이모지', display: '이모지', gridClass: 'col-span-6 row-span-2', type: 'mode', action: 'emoji' },
    { keyId: 'char-dot', char: '.', gridClass: 'col-span-7' },
    { keyId: 'char-ㅊ', char: 'ㅊ', gridClass: 'col-span-7' },
    { keyId: 'char-ㅎ', char: 'ㅎ', gridClass: 'col-span-7' },
    { keyId: 'char-question', char: '?', gridClass: 'col-span-7' },
    { keyId: 'mode-lang', char: '한/영', display: '한/영', gridClass: 'col-span-6 row-span-2', type: 'mode', action: 'lang' },
    { keyId: 'mode-symbols', char: '특수문자', display: '특수문자', gridClass: 'col-span-7', type: 'mode', action: 'symbols' },
    { keyId: 'action-space', char: '␣', display: '␣', gridClass: 'col-span-14', type: 'action', action: 'space' },
    { keyId: 'mode-hanja', char: '한자', display: '한자', gridClass: 'col-span-7', type: 'mode', action: 'hanja' },
  ],
];

export const EMOJI_CATEGORIES = [
  {
    name: '표정 & 감정',
    emojis: ['😊', '😂', '🥰', '😍', '😎', '🤔', '😭', '🥺', '🤣', '🥳', '😴', '😤', '😇', '🤩', '🙄', '🤗', '😋', '😜', '😬', '🫡'],
  },
  {
    name: '손짓 & 하트',
    emojis: ['👍', '👏', '🙌', '🫶', '🙏', '✌️', '🫰', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💖', '✨', '🔥', '🎉', '💯'],
  },
  {
    name: '한국 & 일상',
    emojis: ['🇰🇷', '🍚', '🍜', '🍱', '🍢', '🥟', '☕️', '🧋', '🍺', '🍶', '🌸', '🍂', '🍁', '🌙', '☀️', '⚡️', '🏠', '✈️', '🚗', '📱'],
  },
  {
    name: '동물 & 기타',
    emojis: ['🐶', '🐱', '🐰', '🐻', '🐼', '🦊', '🐯', '🦁', '🐥', '🦄', '🍎', '🍓', '🍰', '🎂', '🍕', '🍔', '🎁', '💡', '🎵', '⭐'],
  },
];

export const SYMBOLS_GROUPS = [
  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  ['~', '`', '-', '_', '=', '+', '[', ']', '{', '}'],
  ['\\', '|', ';', ':', '\'', '"', ',', '<', '.', '>'],
  ['/', '?', '₩', '¥', '€', '§', '※', '☆', '★', '♥'],
  ['♡', '▶', '◀', '▲', '▼', '○', '●', '◎', '◇', '◆'],
  ['‘', '’', '“', '”', '…', '·', '±', '×', '÷', '≠'],
];

export const HANJA_DICTIONARY: Record<string, HanjaEntry[]> = {
  '한': [
    { hangul: '한', hanja: '韓', meaning: '나라 이름 한 (대한민국)' },
    { hangul: '한', hanja: '漢', meaning: '한나라 한 / 한수 한' },
    { hangul: '한', hanja: '限', meaning: '한할 한 / 기한 한' },
    { hangul: '한', hanja: '恨', meaning: '한할 한 / 원망할 한' },
    { hangul: '한', hanja: '寒', meaning: '찰 한 / 추울 한' },
    { hangul: '한', hanja: '汗', meaning: '땀 한' },
  ],
  '국': [
    { hangul: '국', hanja: '國', meaning: '나라 국' },
    { hangul: '국', hanja: '局', meaning: '판 국 / 관청 국' },
    { hangul: '국', hanja: '菊', meaning: '국화 국' },
  ],
  '천': [
    { hangul: '천', hanja: '天', meaning: '하늘 천 (천지인)' },
    { hangul: '천', hanja: '千', meaning: '일천 천' },
    { hangul: '천', hanja: '川', meaning: '내 천' },
    { hangul: '천', hanja: '泉', meaning: '샘 천' },
  ],
  '지': [
    { hangul: '지', hanja: '地', meaning: '땅 지 (천지인)' },
    { hangul: '지', hanja: '知', meaning: '알 지' },
    { hangul: '지', hanja: '志', meaning: '뜻 지' },
    { hangul: '지', hanja: '智', meaning: '지혜 지' },
    { hangul: '지', hanja: '指', meaning: '가리킬 지 / 손가락 지' },
  ],
  '인': [
    { hangul: '인', hanja: '人', meaning: '사람 인 (천지인)' },
    { hangul: '인', hanja: '仁', meaning: '어질 인' },
    { hangul: '인', hanja: '認', meaning: '알 인 / 인정할 인' },
    { hangul: '인', hanja: '印', meaning: '도장 인' },
    { hangul: '인', hanja: '因', meaning: '인할 인 / 까닭 인' },
  ],
  '대': [
    { hangul: '대', hanja: '大', meaning: '큰 대' },
    { hangul: '대', hanja: '代', meaning: '대신할 대 / 시대 대' },
    { hangul: '대', hanja: '對', meaning: '대답할 대 / 마주할 대' },
    { hangul: '대', hanja: '待', meaning: '기다릴 대' },
  ],
  '민': [
    { hangul: '민', hanja: '民', meaning: '백성 민' },
    { hangul: '민', hanja: '敏', meaning: '민첩할 민' },
    { hangul: '민', hanja: '愍', meaning: '근심할 민 / 불쌍히 여길 민' },
  ],
  '문': [
    { hangul: '문', hanja: '文', meaning: '글월 문 / 무늬 문' },
    { hangul: '문', hanja: '門', meaning: '문 문' },
    { hangul: '문', hanja: '問', meaning: '물을 문' },
    { hangul: '문', hanja: '聞', meaning: '들을 문' },
  ],
  '자': [
    { hangul: '자', hanja: '字', meaning: '글자 자' },
    { hangul: '자', hanja: '子', meaning: '아들 자' },
    { hangul: '자', hanja: '自', meaning: '스스로 자' },
    { hangul: '자', hanja: '者', meaning: '사람 자 / 놈 자' },
  ],
  '일': [
    { hangul: '일', hanja: '日', meaning: '날 일 / 해 일' },
    { hangul: '일', hanja: '一', meaning: '한 일' },
    { hangul: '일', hanja: '事', meaning: '일 사' },
  ],
  '생': [
    { hangul: '생', hanja: '生', meaning: '날 생 / 살 생' },
    { hangul: '생', hanja: '甥', meaning: '생질 생' },
  ],
  '신': [
    { hangul: '신', hanja: '新', meaning: '새 신' },
    { hangul: '신', hanja: '神', meaning: '귀신 신 / 신령 신' },
    { hangul: '신', hanja: '信', meaning: '믿을 신' },
    { hangul: '신', hanja: '身', meaning: '몸 신' },
  ],
  '동': [
    { hangul: '동', hanja: '東', meaning: '동녘 동' },
    { hangul: '동', hanja: '同', meaning: '한가지 동 / 같을 동' },
    { hangul: '동', hanja: '動', meaning: '움직일 동' },
    { hangul: '동', hanja: '童', meaning: '아이 동' },
  ],
};
