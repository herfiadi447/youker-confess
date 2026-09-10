'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { QuestionScreen } from '@/components/screens/QuestionScreen';
import { AnswerYesScreen } from '@/components/screens/AnswerYesScreen';
import { AnswerNoScreen } from '@/components/screens/AnswerNoScreen';
import { AnswerType } from '@/types/confession';

type FlowStep = 'landing' | 'question' | 'result';

export default function ConfessionSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [step, setStep] = useState<FlowStep>('landing');
  const [userAnswer, setUserAnswer] = useState<AnswerType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check localStorage for prior completion
    const savedAnswer = localStorage.getItem('youker_confession_answer') as AnswerType | null;
    if (savedAnswer === 'yes' || savedAnswer === 'no') {
      setUserAnswer(savedAnswer);
      setStep('result');
    }
  }, []);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleOpenLanding = () => {
    setStep('question');
    setSubmitError(null);
  };

  const handleAnswerSubmit = async (answer: AnswerType, dodgedCount: number) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer,
          dodged_count: dodgedCount,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        const errorMsg = data?.error || data?.details || 'Gagal mengirim respons ke server. Silakan periksa koneksi/kredensial.';
        console.error('Submission failed:', errorMsg);
        setSubmitError(errorMsg);
        setIsSubmitting(false);
        return; // DO NOT proceed to result screen or save to localStorage
      }

      // ONLY save to localStorage anti-duplicate flag AFTER successful server confirmation
      try {
        localStorage.setItem('youker_confession_answer', answer);
        localStorage.setItem('youker_confession_dodged', dodgedCount.toString());
      } catch (e) {
        console.warn('localStorage access warning:', e);
      }

      setUserAnswer(answer);
      setIsSubmitting(false);
      setStep('result');
    } catch (err: any) {
      console.error('Error submitting response:', err);
      setSubmitError(err?.message || 'Terjadi kesalahan jaringan.');
      setIsSubmitting(false);
    }
  };


  const handleResetClient = () => {
    try {
      localStorage.removeItem('youker_confession_answer');
      localStorage.removeItem('youker_confession_dodged');
    } catch (e) {}
    setStep('landing');
    setUserAnswer(null);
  };

  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#eeedf7] relative px-4">
      {submitError && (
        <div className="fixed top-4 z-50 max-w-[400px] w-full bg-rose-100 border border-rose-300 text-rose-800 px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-[13px]">
          <div className="flex items-center space-x-2">
            <span className="font-bold">⚠️ Gagal:</span>
            <span>{submitError}</span>
          </div>
          <button onClick={() => setSubmitError(null)} className="font-bold text-rose-900 ml-2">✕</button>
        </div>
      )}

      {step === 'landing' && <LandingScreen onOpen={handleOpenLanding} />}

      {step === 'question' && (
        <QuestionScreen onAnswer={handleAnswerSubmit} />
      )}

      {step === 'result' && (
        <>
          {userAnswer === 'yes' ? (
            <AnswerYesScreen onClose={() => alert('Terima kasih banyak! ❤️')} />
          ) : (
            <AnswerNoScreen onClose={() => alert('Terima kasih atas waktunya!')} />
          )}
        </>
      )}
    </div>
  );

}
