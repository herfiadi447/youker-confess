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

  const handleOpenLanding = () => {
    setStep('question');
  };

  const handleAnswerSubmit = async (answer: AnswerType, dodgedCount: number) => {
    setUserAnswer(answer);
    setIsSubmitting(true);

    // Save to localStorage anti-duplicate flag
    try {
      localStorage.setItem('youker_confession_answer', answer);
      localStorage.setItem('youker_confession_dodged', dodgedCount.toString());
    } catch (e) {
      console.warn('localStorage access warning:', e);
    }

    // Submit to server API
    try {
      await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer,
          dodged_count: dodgedCount,
        }),
      });
    } catch (err) {
      console.error('Error submitting response:', err);
    } finally {
      setIsSubmitting(false);
      setStep('result');
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
    <div className="w-full min-h-[100dvh] flex items-center justify-center bg-[#eeedf7]">
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
