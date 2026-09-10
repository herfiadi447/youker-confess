'use client';

import React from 'react';
import { ParticleCanvas } from '@/components/ParticleCanvas';

interface AnswerNoScreenProps {
  onClose: () => void;
}

export const AnswerNoScreen: React.FC<AnswerNoScreenProps> = ({ onClose }) => {
  return (
    <div className="w-full max-w-[420px] min-h-[100dvh] bg-[#FCFAF9] flex flex-col relative shadow-[0_0_50px_rgba(28,25,23,0.03)] mx-auto">
      <main className="flex-1 flex flex-col justify-between w-full px-6 pt-safe pb-safe bg-[#FCFAF9] py-8">
        <div className="flex flex-col w-full relative select-none my-auto space-y-6">
          {/* Interactive Canvas Layer for Ambient Drift Particles */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-[#FCFAF9] shadow-sm border border-[#F3E8E8]">
            <ParticleCanvas />

            {/* Subtle atmospheric gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAF9]/20 via-transparent to-[#FCFAF9] pointer-events-none"></div>

            {/* UI Header Note Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8e7f1]/80 backdrop-blur shadow-sm">
                <span className="font-mono text-[12px] text-[#78716C] flex items-center gap-1">
                  🍃 Jawaban Telah Diterima
                </span>
              </div>
            </div>

            {/* Central Sincere Focal Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#f4f2fd] flex items-center justify-center mb-5 text-[#A8A29E] shadow-sm">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </div>
              <p className="font-mono text-[12px] text-[#A8A29E] uppercase tracking-widest mb-2">
                Terima Kasih
              </p>
              <h1 className="text-[24px] font-bold text-[#1C1917] tracking-tight">
                Oke, thx ya
              </h1>
              <p className="text-[15px] text-[#78716C] mt-3 max-w-[280px] leading-relaxed">
                Aku sangat menghargai kejujuran dan keputusanmu.
              </p>
            </div>
          </div>

          {/* Context Card & Privacy Note */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4 border border-[#F3E8E8]">
              <div className="w-10 h-10 rounded-full bg-[#f4f2fd] flex items-center justify-center shrink-0 text-[#78716C]">
                <span className="material-symbols-outlined text-[20px]">handshake</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-[#1C1917]">
                  Terima Kasih Sudah Menjawab
                </span>
                <span className="text-[13px] text-[#78716C] leading-snug">
                  Setiap perasaan dan batasanmu berharga. Tidak ada yang berubah di antara kita.
                </span>
              </div>
            </div>

            {/* Privacy Guarantee */}
            <div className="bg-[#f4f2fd] rounded-2xl p-4 flex items-start gap-3 border border-[#E4DCDC]">
              <span className="material-symbols-outlined text-[#A8A29E] mt-0.5 text-[20px]">
                verified_user
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-semibold text-[#1C1917]">
                  Privasi Dijaga Penuh
                </span>
                <p className="text-[13px] text-[#78716C] mt-1">
                  Pesan ini hanya tersimpan aman dan tidak akan dibagikan ke mana pun.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dignified Close Button */}
        <div className="flex flex-col items-center gap-3 pb-4 pt-4">
          <button
            onClick={onClose}
            className="w-full h-[54px] rounded-full bg-white text-[#78716C] font-semibold text-[15px] shadow-sm active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 hover:text-[#1C1917] hover:bg-[#f4f2fd] border border-[#F3E8E8] cursor-pointer"
            type="button"
          >
            <span>Tutup</span>
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <span className="font-mono text-[12px] text-[#A8A29E]">
            Terima kasih atas waktunya
          </span>
        </div>
      </main>
    </div>
  );
};
