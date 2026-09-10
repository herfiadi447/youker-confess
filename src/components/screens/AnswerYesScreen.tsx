'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface AnswerYesScreenProps {
  onClose: () => void;
}

export const AnswerYesScreen: React.FC<AnswerYesScreenProps> = ({ onClose }) => {
  useEffect(() => {
    // Fire celebratory confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#e11d48', '#b80035', '#ffb3b6'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#e11d48', '#ffffff', '#ffdada'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#e11d48', '#c5485d', '#ffdadc'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#e11d48', '#ffffff'],
    });

    // Repeating heart bursts
    const interval = setInterval(() => {
      confetti({
        particleCount: 15,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#e11d48', '#b80035', '#ffb3b6'],
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[420px] min-h-[100dvh] bg-[#FCFAF9] flex flex-col relative shadow-[0_0_50px_rgba(28,25,23,0.03)] mx-auto overflow-hidden">
      <main className="flex-1 flex flex-col justify-between w-full px-6 pt-safe pb-safe bg-[#FCFAF9] py-8 relative z-10">
        {/* Top Status Header */}
        <div className="w-full flex justify-center z-20 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8e7f1] shadow-sm">
            <span
              className="material-symbols-outlined text-[#b80035] text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="font-mono text-[12px] text-[#5c3f40] tracking-wide font-medium">
              ✨ Pertemuan yang Indah
            </span>
          </div>
        </div>

        {/* Center Focal Card */}
        <div className="w-full flex flex-col items-center text-center my-auto px-2 z-10">
          <div className="relative mb-6 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#FFF1F2] flex items-center justify-center shadow-lg animate-pulse">
              <span
                className="material-symbols-outlined text-[48px] text-[#b80035]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-[18px] text-[#b80035]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                celebration
              </span>
            </div>
          </div>

          <h1 className="text-[32px] font-bold text-[#1C1917] mb-3 tracking-tight flex items-center gap-1">
            Yeay! <span className="text-[#b80035]">❤️</span>
          </h1>

          <p className="text-[17px] text-[#78716C] max-w-[300px] leading-relaxed font-normal">
            Terima kasih sudah memilih untuk memulai cerita ini bersama.
          </p>

          <div className="mt-8 w-full max-w-[320px] bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 border border-[#F3E8E8]">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F2] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-[#b80035]">
                mark_chat_read
              </span>
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="font-mono text-[12px] text-[#A8A29E] uppercase tracking-wider">
                Status Respon
              </span>
              <span className="text-[13px] font-semibold text-[#1C1917] truncate">
                Diterima & tersimpan dengan indah
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Exit Button */}
        <div className="w-full flex flex-col items-center z-10 pb-4">
          <button
            onClick={onClose}
            className="w-full h-[54px] rounded-full bg-[#e8e7f1] hover:bg-[#e3e1ec] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#5c3f40]">
              done
            </span>
            <span className="font-semibold text-[15px] text-[#1a1b22]">
              Selesai
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};
