import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface GestureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (phrase: string) => void;
}

export const GestureGuideModal: React.FC<GestureGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
}) => {
  const [activeTab, setActiveTab] = useState<'vowels' | 'consonants' | 'compounds'>('vowels');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              천지인 2.0 제스처 가이드
            </h2>
            <p className="text-xs text-neutral-400">
              스와이프 방향별 모음 및 자음 입력 표
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-5 pt-2 bg-neutral-50/40 dark:bg-neutral-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('vowels')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'vowels'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            1. 모음 스와이프 (ㅡ, ㅣ)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('consonants')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'consonants'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            2. 자음 스와이프 (쌍자음/거센소리)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compounds')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'compounds'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            3. 복합 모음 & 겹받침
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'vowels' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                <h4 className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  모음 스와이프 핵심 원리
                </h4>
                <p className="text-xs text-blue-800/80 dark:text-blue-300 leading-relaxed">
                  기준선인 <strong>'ㅡ'</strong>와 <strong>'ㅣ'</strong>에서 손가락을 위, 아래, 왼쪽, 오른쪽으로 밀어내면 방향에 맞는 모음이 생성됩니다.
                </p>
              </div>

              {/* Vowel ㅡ card */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-lg">
                      ㅡ
                    </span>
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      가로 모음 (ㅡ 키)
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">기본 탭: ㅡ</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">위로 드래그 (U)</div>
                      <div className="text-neutral-500">결과: <strong className="text-blue-600">ㅗ</strong></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">아래로 드래그 (D)</div>
                      <div className="text-neutral-500">결과: <strong className="text-blue-600">ㅜ</strong></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <span className="font-mono text-blue-600 font-bold shrink-0">↑↓↑</span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">위-아래-위 (UDU)</div>
                      <div className="text-neutral-500">결과: <strong className="text-blue-600">ㅛ</strong></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <span className="font-mono text-blue-600 font-bold shrink-0">↓↑↓</span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">아래-위-아래 (DUD)</div>
                      <div className="text-neutral-500">결과: <strong className="text-blue-600">ㅠ</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vowel ㅣ card */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-lg">
                      ㅣ
                    </span>
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      세로 모음 (ㅣ 키)
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">기본 탭: ㅣ</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">오른쪽 드래그 (R)</div>
                      <div className="text-neutral-500">결과: <strong className="text-emerald-600">ㅏ</strong></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">왼쪽 드래그 (L)</div>
                      <div className="text-neutral-500">결과: <strong className="text-emerald-600">ㅓ</strong></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <span className="font-mono text-emerald-600 font-bold shrink-0">→←→</span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">오른-왼-오른 (RLR)</div>
                      <div className="text-neutral-500">결과: <strong className="text-emerald-600">ㅑ</strong></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750">
                    <span className="font-mono text-emerald-600 font-bold shrink-0">←→←</span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">왼-오른-왼 (LRL)</div>
                      <div className="text-neutral-500">결과: <strong className="text-emerald-600">ㅕ</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consonants' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50">
                <h4 className="text-xs font-semibold text-purple-900 dark:text-purple-200 mb-1">
                  자음 변형 규칙
                </h4>
                <p className="text-xs text-purple-800/80 dark:text-purple-300 leading-relaxed">
                  <strong>위로 스와이프(↑)</strong>하면 쌍자음이 되고, <strong>오른쪽으로 스와이프(→)</strong>하면 거센소리가 됩니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-base text-neutral-900 dark:text-white">
                      ㄱ
                    </span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">기역 키</div>
                      <div className="text-neutral-500 text-[11px]">기본: ㄱ</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div><span className="text-purple-600">↑</span> = <strong>ㄲ</strong></div>
                    <div><span className="text-blue-600">→</span> = <strong>ㅋ</strong></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-base text-neutral-900 dark:text-white">
                      ㄷ
                    </span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">디귿 키</div>
                      <div className="text-neutral-500 text-[11px]">기본: ㄷ</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div><span className="text-purple-600">↑</span> = <strong>ㄸ</strong></div>
                    <div><span className="text-blue-600">→</span> = <strong>ㅌ</strong></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-base text-neutral-900 dark:text-white">
                      ㅂ
                    </span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">비읍 키</div>
                      <div className="text-neutral-500 text-[11px]">기본: ㅂ</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div><span className="text-purple-600">↑</span> = <strong>ㅃ</strong></div>
                    <div><span className="text-blue-600">→</span> = <strong>ㅍ</strong></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-base text-neutral-900 dark:text-white">
                      ㅅ
                    </span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">시옷 키</div>
                      <div className="text-neutral-500 text-[11px]">기본: ㅅ</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div><span className="text-purple-600">↑</span> = <strong>ㅆ</strong></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-base text-neutral-900 dark:text-white">
                      ㅈ
                    </span>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">지읒 키</div>
                      <div className="text-neutral-500 text-[11px]">기본: ㅈ</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div><span className="text-purple-600">↑</span> = <strong>ㅉ</strong></div>
                    <div><span className="text-blue-600">→</span> = <strong>ㅊ</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compounds' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                <h4 className="text-xs font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  자동 결합 오토마타
                </h4>
                <p className="text-xs text-amber-800/80 dark:text-amber-300 leading-relaxed">
                  자음과 모음, 복합 모음과 겹받침이 한글 맞춤법 오토마타에 의해 부드럽게 자동 결합됩니다.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">복합 모음 결합 예시:</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-center">
                    <div className="text-neutral-500 font-mono">ㅏ + ㅣ</div>
                    <div className="font-bold text-base text-neutral-900 dark:text-white mt-1">ㅐ</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-center">
                    <div className="text-neutral-500 font-mono">ㅓ + ㅣ</div>
                    <div className="font-bold text-base text-neutral-900 dark:text-white mt-1">ㅔ</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-center">
                    <div className="text-neutral-500 font-mono">ㅗ + ㅏ</div>
                    <div className="font-bold text-base text-neutral-900 dark:text-white mt-1">ㅘ</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-center">
                    <div className="text-neutral-500 font-mono">ㅗ + ㅣ</div>
                    <div className="font-bold text-base text-neutral-900 dark:text-white mt-1">ㅚ</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-center">
                    <div className="text-neutral-500 font-mono">ㅜ + ㅓ</div>
                    <div className="font-bold text-base text-neutral-900 dark:text-white mt-1">ㅝ</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-center">
                    <div className="text-neutral-500 font-mono">ㅡ + ㅣ</div>
                    <div className="font-bold text-base text-neutral-900 dark:text-white mt-1">ㅢ</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">겹받침 자동 결합:</h5>
                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <span className="font-mono">ㄱ+ㅅ→ㄳ, ㄴ+ㅈ→ㄵ, ㄹ+ㄱ→ㄺ, ㄹ+ㅁ→ㄻ, ㅂ+ㅅ→ㅄ</span> 등 표준 겹받침이 자동 인식되며, 뒤이어 모음이 입력되면 자연스럽게 다음 음절의 초성으로 넘어갑니다.
                </div>
              </div>
            </div>
          )}

          {/* Quick Practice Samples */}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>추천 연습 문장 (클릭하여 테스트해보세요):</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {['안녕하세요', '천지인 2.0', '대한민국', '스마트폰 키보드'].map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => {
                    onSelectSample(phrase);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors"
                >
                  "{phrase}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-850/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
