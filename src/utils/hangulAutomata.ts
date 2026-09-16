/**
 * Enhanced Hangul Automata for Cheongiin 2.0
 * Based on user's custom assembler algorithm with robust forward-looking batchim handling
 * and compound vowel/consonant support.
 */

export const CHO_SUNG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", 
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

export const JUNG_SUNG = [
  "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", 
  "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"
];

export const JONG_SUNG = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", 
  "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", 
  "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

export const COMPLEX_JUNG: Record<string, string> = {
  "ㅗ-ㅏ": "ㅘ",
  "ㅗ-ㅐ": "ㅙ",
  "ㅗ-ㅣ": "ㅚ",
  "ㅜ-ㅓ": "ㅝ",
  "ㅜ-ㅔ": "ㅞ",
  "ㅜ-ㅣ": "ㅟ",
  "ㅡ-ㅣ": "ㅢ",
  "ㅏ-ㅣ": "ㅐ",
  "ㅓ-ㅣ": "ㅔ",
  "ㅑ-ㅣ": "ㅒ",
  "ㅕ-ㅣ": "ㅖ",
};

export const COMPLEX_JONG: Record<string, string> = {
  "ㄱ-ㅅ": "ㄳ",
  "ㄴ-ㅈ": "ㄵ",
  "ㄴ-ㅎ": "ㄶ",
  "ㄹ-ㄱ": "ㄺ",
  "ㄹ-ㅁ": "ㄻ",
  "ㄹ-ㅂ": "ㄼ",
  "ㄹ-ㅅ": "ㄽ",
  "ㄹ-ㅌ": "ㄾ",
  "ㄹ-ㅍ": "ㄿ",
  "ㄹ-ㅎ": "ㅀ",
  "ㅂ-ㅅ": "ㅄ",
};

export function assembleHangul(letters: string[]): string {
  let result = "";
  let i = 0;

  while (i < letters.length) {
    const char = letters[i];

    // Non-hangul or direct character (spaces, symbols, English, emojis, newlines)
    if (!CHO_SUNG.includes(char) && !JUNG_SUNG.includes(char) && !JONG_SUNG.includes(char)) {
      result += char;
      i++;
      continue;
    }

    // Solitary vowel or vowel starting without initial consonant
    if (!CHO_SUNG.includes(char)) {
      if (i + 1 < letters.length && COMPLEX_JUNG[`${char}-${letters[i + 1]}`]) {
        result += COMPLEX_JUNG[`${char}-${letters[i + 1]}`];
        i += 2;
      } else {
        result += char;
        i++;
      }
      continue;
    }

    // Initial consonant (초성)
    const cIdx = CHO_SUNG.indexOf(char);
    let jIdx = -1;
    let tIdx = 0;
    i++;

    // Look for Medial Vowel (중성)
    if (i < letters.length && JUNG_SUNG.includes(letters[i])) {
      let currentJung = letters[i];
      i++;
      if (i < letters.length && COMPLEX_JUNG[`${currentJung}-${letters[i]}`]) {
        currentJung = COMPLEX_JUNG[`${currentJung}-${letters[i]}`];
        i++;
      }
      jIdx = JUNG_SUNG.indexOf(currentJung);
    }

    // No medial vowel: output solitary consonant
    if (jIdx === -1) {
      result += CHO_SUNG[cIdx];
      continue;
    }

    // Look for Final Consonant (종성 / 받침)
    if (i < letters.length && JONG_SUNG.includes(letters[i])) {
      // If the next letter is followed by a vowel, this consonant belongs to the next syllable!
      if (i + 1 < letters.length && JUNG_SUNG.includes(letters[i + 1])) {
        tIdx = 0;
      } else {
        let currentJong = letters[i];
        let step = 1;

        // Check if complex final consonant (겹받침)
        if (i + 1 < letters.length && COMPLEX_JONG[`${currentJong}-${letters[i + 1]}`]) {
          if (i + 2 < letters.length && JUNG_SUNG.includes(letters[i + 2])) {
            // Second consonant belongs to the following syllable
            currentJong = letters[i];
            step = 1;
          } else {
            currentJong = COMPLEX_JONG[`${currentJong}-${letters[i + 1]}`];
            step = 2;
          }
        }
        tIdx = JONG_SUNG.indexOf(currentJong);
        i += step;
      }
    }

    const uniCode = 0xac00 + cIdx * 21 * 28 + jIdx * 28 + tIdx;
    result += String.fromCharCode(uniCode);
  }

  return result;
}
