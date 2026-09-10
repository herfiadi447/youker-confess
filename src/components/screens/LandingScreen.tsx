'use client';

import React, { useState } from 'react';
import { CONFESSION_CONFIG } from '@/config/confession';

interface LandingScreenProps {
  onOpen: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onOpen }) => {
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    setIsClicking(true);
    setTimeout(() => {
      onOpen();
    }, 200);
  };

  return (
    <div className="w-full max-w-[420px] min-h-[100dvh] bg-[#FCFAF9] flex flex-col relative shadow-[0_0_50px_rgba(28,25,23,0.03)] mx-auto">
      <main className="flex-1 flex flex-col justify-between w-full px-6 pt-safe pb-safe bg-[#FCFAF9] py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between w-full pt-4">
          <div className="flex items-center gap-2 bg-[#f4f2fd] px-3 py-1 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b80035] animate-pulse"></span>
            <span className="font-mono text-[12px] uppercase tracking-wider text-[#78716C] font-medium">
              Pesan Pribadi
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#f4f2fd] flex items-center justify-center text-[#A8A29E]">
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </div>
        </div>

        {/* Center Focal Point */}
        <div className="flex flex-col items-center text-center my-auto px-2">
          <div className="relative mb-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF1F2] flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-[#b80035] text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
            <div className="absolute -inset-1 rounded-full bg-[#b80035]/10 animate-ping pointer-events-none opacity-40"></div>
          </div>

          <div className="space-y-3 max-w-[320px]">
            <h1 className="text-[32px] font-bold text-[#1C1917] tracking-tight leading-tight">
              Hi, {CONFESSION_CONFIG.TARGET_NAME}
            </h1>
            <p className="text-[17px] text-[#78716C] leading-relaxed font-normal">
              {CONFESSION_CONFIG.LANDING_SUBTEXT}
            </p>
          </div>

          <div className="w-12 h-1 bg-[#e3e1ec] rounded-full mt-8"></div>
        </div>

        {/* Bottom CTA Cluster */}
        <div className="w-full flex flex-col items-center gap-4 pb-4">
          <button
            onClick={handleClick}
            className={`group w-full h-[54px] bg-[#e11d48] hover:bg-[#b80035] text-white font-semibold text-[15px] rounded-full flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(225,29,72,0.22)] active:scale-[0.98] transition-all duration-150 cursor-pointer select-none ${
              isClicking ? 'scale-[0.97] opacity-90' : ''
            }`}
            id="openEnvelopeBtn"
            type="button"
          >
            <span>Buka</span>
            <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1">
              arrow_forward
            </span>
          </button>

          <div className="flex items-center gap-1.5 opacity-60">
            <span className="material-symbols-outlined text-[14px] text-[#A8A29E]">
              schedule
            </span>
            <span className="font-mono text-[12px] text-[#A8A29E] uppercase tracking-wider">
              Hanya untuk kamu
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
