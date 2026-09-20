import { useState, useEffect, useMemo, useCallback } from 'react';
import { DisplayArea } from './components/DisplayArea';
import { KeyboardGrid } from './components/KeyboardGrid';
import { EnglishKeyboard } from './components/EnglishKeyboard';
import { EmojiPalette } from './components/EmojiPalette';
import { SymbolsKeyboard } from './components/SymbolsKeyboard';
import { HanjaModal } from './components/HanjaModal';
import { assembleHangul } from './utils/hangulAutomata';
import { KeyboardMode, KeyboardSettings } from './types';
import { playKeySound } from './utils/soundEffects';

export default function App() {
  const [mode, setMode] = useState<KeyboardMode>('korean');
  const [inputLetters, setInputLetters] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [isHanjaOpen, setIsHanjaOpen] = useState(false);

  const [settings, setSettings] = useState<KeyboardSettings>({
    soundEnabled: true,
    hapticEnabled: true,
    showHints: true,
    threshold: 14,
    darkMode: true,
  });

  // Dark mode class on html
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const assembledText = useMemo(() => {
    return assembleHangul(inputLetters);
  }, [inputLetters]);

  // Extract last character for Hanja modal
  const lastChar = useMemo(() => {
    if (!assembledText) return null;
    const trimmed = assembledText.trim();
    return trimmed ? trimmed.slice(-1) : null;
  }, [assembledText]);

  const saveHistory = useCallback((current: string[]) => {
    setHistory((prev) => [...prev.slice(-20), current]);
  }, []);

  const handleKeyCommit = (char: string, feedback?: string) => {
    saveHistory(inputLetters);
    setInputLetters((prev) => [...prev, char]);
    if (feedback) {
      setLastFeedback(feedback);
    }
  };

  const handleActionCommit = (action: string) => {
    saveHistory(inputLetters);
    if (action === 'backspace') {
      setInputLetters((prev) => {
        if (prev.length === 0) return prev;
        return prev.slice(0, -1);
      });
      setLastFeedback('⌫ 한 글자 지움');
    } else if (action === 'space') {
      setInputLetters((prev) => [...prev, ' ']);
      setLastFeedback('␣ 띄어쓰기');
    } else if (action === 'enter') {
      setInputLetters((prev) => [...prev, '\n']);
      setLastFeedback('↵ 줄바꿈');
    }
  };

  const handleModeToggle = (targetMode: string) => {
    if (targetMode === 'lang') {
      setMode((prev) => (prev === 'korean' ? 'english' : 'korean'));
      if (settings.soundEnabled) playKeySound('action');
    } else if (targetMode === 'emoji') {
      setMode('emoji');
      if (settings.soundEnabled) playKeySound('action');
    } else if (targetMode === 'symbols') {
      setMode('symbols');
      if (settings.soundEnabled) playKeySound('action');
    } else if (targetMode === 'hanja') {
      setIsHanjaOpen(true);
      if (settings.soundEnabled) playKeySound('action');
    }
  };

  const handleSelectHanja = (hanjaChar: string) => {
    saveHistory(inputLetters);
    // Replace the last assembled character with the Hanja character
    // We can convert the assembled string, replace last char, and store individual characters
    const full = assembledText;
    if (full.length > 0) {
      const updated = full.slice(0, -1) + hanjaChar;
      setInputLetters(Array.from(updated));
      setLastFeedback(`한자 변환: ${hanjaChar}`);
    } else {
      setInputLetters([hanjaChar]);
      setLastFeedback(`한자 입력: ${hanjaChar}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#121316] text-neutral-100 flex items-center justify-center p-2 sm:p-4 transition-colors">
      <div className="w-full max-w-lg bg-[#181a1e] rounded-2xl border border-neutral-800 p-3 sm:p-4 flex flex-col gap-3 transition-all shadow-xl">
        {/* Display Screen */}
        <DisplayArea
          text={assembledText}
          lastGestureFeedback={lastFeedback}
        />

        {/* Dynamic Keyboard Section */}
        <section className="flex flex-col gap-2">
          {mode === 'korean' && (
            <KeyboardGrid
              showHints={settings.showHints}
              soundEnabled={settings.soundEnabled}
              hapticEnabled={settings.hapticEnabled}
              threshold={settings.threshold}
              onKeyCommit={handleKeyCommit}
              onActionCommit={handleActionCommit}
              onModeToggle={handleModeToggle}
            />
          )}

          {mode === 'english' && (
            <EnglishKeyboard
              soundEnabled={settings.soundEnabled}
              hapticEnabled={settings.hapticEnabled}
              onKeyCommit={handleKeyCommit}
              onActionCommit={handleActionCommit}
              onModeToggle={handleModeToggle}
            />
          )}

          {mode === 'emoji' && (
            <EmojiPalette
              soundEnabled={settings.soundEnabled}
              hapticEnabled={settings.hapticEnabled}
              onEmojiSelect={(emoji) => handleKeyCommit(emoji, `이모지: ${emoji}`)}
              onBackspace={() => handleActionCommit('backspace')}
              onReturn={() => setMode('korean')}
            />
          )}

          {mode === 'symbols' && (
            <SymbolsKeyboard
              soundEnabled={settings.soundEnabled}
              hapticEnabled={settings.hapticEnabled}
              onSymbolCommit={(sym) => handleKeyCommit(sym, `기호: ${sym}`)}
              onBackspace={() => handleActionCommit('backspace')}
              onEnter={() => handleActionCommit('enter')}
              onSpace={() => handleActionCommit('space')}
              onReturn={() => setMode('korean')}
            />
          )}
        </section>
      </div>

      {/* Hanja Conversion Modal */}
      <HanjaModal
        lastChar={lastChar}
        isOpen={isHanjaOpen}
        soundEnabled={settings.soundEnabled}
        hapticEnabled={settings.hapticEnabled}
        onClose={() => setIsHanjaOpen(false)}
        onSelectHanja={handleSelectHanja}
      />
    </main>
  );
}
