'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  buttonText?: string;
  icon?: string;
  onClose: () => void;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  title = 'Pesan Spesial',
  message,
  buttonText = 'Tutup',
  icon = 'favorite',
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[360px] bg-[#FCFAF9] rounded-3xl p-6 shadow-2xl border border-[#F3E8E8] flex flex-col items-center text-center space-y-4 z-10"
          >
            {/* Icon Badge */}
            <div className="w-12 h-12 rounded-full bg-[#b80035]/10 flex items-center justify-center text-[#b80035] shadow-sm">
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {icon}
              </span>
            </div>

            {/* Title & Message */}
            <div className="space-y-1.5">
              <h3 className="text-[18px] font-bold text-[#1C1917] tracking-tight">
                {title}
              </h3>
              <p className="text-[14px] text-[#78716C] leading-relaxed">
                {message}
              </p>
            </div>

            {/* Pill Action Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full h-[46px] mt-2 bg-[#b80035] hover:bg-[#920028] text-white rounded-full font-semibold text-[14px] flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
            >
              {buttonText}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
