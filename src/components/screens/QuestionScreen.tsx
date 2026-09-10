'use client';

import React, { useState } from 'react';
import { CONFESSION_CONFIG } from '@/config/confession';
import { AnswerType } from '@/types/confession';

interface QuestionScreenProps {
  onAnswer: (answer: AnswerType, dodgedCount: number) => void;
}

const PLAYFUL_LABELS = [
  'Nggak',
  'Yakin?',
  'Coba pikir lagi',
  'Masa sih?',
  'Jahat banget...',
  'Sekali lagi deh',
];

export const QuestionScreen: React.FC<QuestionScreenProps> = ({ onAnswer }) => {
  const [dodgedCount, setDodgedCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  const handleNoEvade = () => {
    const newCount = dodgedCount + 1;
    setDodgedCount(newCount);

    // Calculate random offset (-80px to +80px horizontal, -40px to +40px vertical)
    const offsetX = (Math.random() - 0.5) * 160;
    const offsetY = (Math.random() - 0.5) * 80;
    setNoPosition({ x: offsetX, y: offsetY });

    // Slight scale bump on "Iya" button to make it more enticing
    setYesScale((prev) => Math.min(prev + 0.05, 1.25));
  };

  const getNoLabel = () => {
    if (dodgedCount === 0) return 'Nggak';
    const index = Math.min(dodgedCount, PLAYFUL_LABELS.length - 1);
    return PLAYFUL_LABELS[index];
  };

  return (
    <div className="w-full max-w-[420px] min-h-[100dvh] bg-[#FCFAF9] flex flex-col relative shadow-[0_0_50px_rgba(28,25,23,0.03)] mx-auto">
      <main className="flex-1 flex flex-col justify-between w-full px-6 pt-safe pb-safe bg-[#FCFAF9] py-12">
        <div className="flex flex-col items-center justify-center my-auto text-center select-none relative w-full">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#f4f2fd] text-[#78716C] mb-8 shadow-sm">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e11d48]"></span>
            <span className="font-mono text-[12px] tracking-widest uppercase font-medium">
              Pertanyaan sederhana
            </span>
          </div>

          {/* Main Question Headline */}
          <div className="max-w-[320px] mb-12">
            <h1 className="text-[32px] text-[#1C1917] tracking-tight font-bold leading-tight">
              {CONFESSION_CONFIG.QUESTION_TEXT}
            </h1>
            <p className="text-[13px] text-[#78716C] mt-4 max-w-[260px] mx-auto opacity-75 font-normal">
              Ditulis dengan tulus, tanpa tergesa-gesa.
            </p>
          </div>

          {/* CTA Cluster with Evading No Button */}
          <div className="w-full max-w-[280px] flex flex-col gap-4 relative" id="cta-cluster">
            {/* YES BUTTON */}
            <button
              onClick={() => onAnswer('yes', dodgedCount)}
              style={{ transform: `scale(${yesScale})` }}
              className="w-full h-[54px] rounded-full bg-[#e11d48] hover:bg-[#b80035] text-white font-semibold text-[15px] tracking-wide shadow-md active:scale-[0.98] transition-all duration-150 flex items-center justify-center cursor-pointer select-none"
              type="button"
            >
              Iya
            </button>

            {/* NO BUTTON (Evading) */}
            <div className="relative w-full h-[54px] flex items-center justify-center">
              <button
                onMouseEnter={handleNoEvade}
                onTouchStart={handleNoEvade}
                onClick={() => onAnswer('no', dodgedCount)}
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                }}
                className="w-full h-[54px] rounded-full bg-[#f4f2fd] text-[#78716C] hover:text-[#1C1917] hover:bg-[#eeedf7] active:scale-[0.98] transition-transform duration-200 ease-out font-semibold text-[15px] tracking-wide flex items-center justify-center cursor-pointer shadow-sm select-none border border-[#E4DCDC]"
                type="button"
              >
                {getNoLabel()}
              </button>
            </div>
          </div>

          {/* Footer Subtext */}
          <div className="mt-16">
            <span className="font-mono text-[12px] text-[#A8A29E] uppercase tracking-wider">
              Satu jawaban untuk hari ini
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
