'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WelcomeScreen } from './WelcomeScreen';
import { QuestionScreen } from './QuestionScreen';
import { ResultsScreen } from './ResultsScreen';
import { Progress } from '@/components/ui/progress';
import { MODULES } from '@/data/modules';
import type { QuizState } from '@/types';

interface QuizPageProps {
  moduleId: string;
}

export const QuizPage: React.FC<QuizPageProps> = ({ moduleId }) => {
  const router = useRouter();
  const mod = MODULES[moduleId];

  useEffect(() => {
    if (!mod) router.replace('/');
  }, [mod, router]);

  const storageKey = `quiz-app-state-module-${moduleId}`;

  const loadState = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  };

  const initialState = loadState();

  const [phase, setPhase] = useState<QuizState>(initialState?.phase || 'welcome');
  const [currentIndex, setCurrentIndex] = useState<number>(initialState?.currentIndex || 0);
  const [score, setScore] = useState<number>(initialState?.score || 0);
  const [userName, setUserName] = useState<string>(initialState?.userName || '');
  const [answers, setAnswers] = useState<{ questionNo: number; selectedOption: string; isCorrect: boolean }[]>(
    initialState?.answers || []
  );
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const startTimeRef = useRef<number | null>(initialState?.startTime || null);
  const durationRef = useRef<string>(initialState?.duration || '');

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ phase, currentIndex, score, answers, userName, startTime: startTimeRef.current, duration: durationRef.current })
    );
  }, [phase, currentIndex, score, answers, userName, storageKey]);

  if (!mod) return null;

  const quizData = mod.questions;

  const handleStart = (name: string) => {
    setUserName(name);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    startTimeRef.current = Date.now();
    durationRef.current = '';
    setPhase('playing');
  };

  const handleRetry = () => {
    localStorage.removeItem(storageKey);
    setSubmitStatus('idle');
    setPhase('welcome');
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setUserName('');
    startTimeRef.current = null;
    durationRef.current = '';
  };

  const handleAnswerSubmit = (isCorrect: boolean, selectedOption: string) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setAnswers((prev) => [
      ...prev,
      { questionNo: quizData[currentIndex].No, selectedOption, isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const elapsedMs = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
      const totalSec = Math.floor(elapsedMs / 1000);
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;
      durationRef.current = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      setPhase('results');
      submitResult(score, answers);
    }
  };

  const submitResult = async (
    finalScore: number,
    finalAnswers: { questionNo: number; selectedOption: string; isCorrect: boolean }[]
  ) => {
    setSubmitStatus('submitting');
    try {
      const percentage = Math.round((finalScore / quizData.length) * 100);
      const res = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('id-ID'),
          nama: userName,
          modul: `${mod.label} — ${mod.title}`,
          skor: finalScore,
          totalSoal: quizData.length,
          persentase: percentage,
          durasi: durationRef.current,
          jawaban: finalAnswers,
        }),
      });
      setSubmitStatus(res.ok ? 'success' : 'error');
    } catch {
      setSubmitStatus('error');
    }
  };

  const currentQuestion = quizData[currentIndex];
  const progressPercentage = phase === 'playing' ? (currentIndex / quizData.length) * 100 : 0;
  const footerLabel = `${mod.label} — ${mod.title}`;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header title={mod.title} showBack={phase === 'welcome'} />

      {phase === 'playing' && (
        <div className="w-full bg-muted/40 border-b">
          <Progress value={progressPercentage} className="rounded-none h-1.5" />
        </div>
      )}

      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center">
        {phase === 'welcome' && (
          <WelcomeScreen
            onStart={handleStart}
            totalQuestions={quizData.length}
            moduleLabel={mod.label}
            moduleTitle={mod.title}
          />
        )}

        {phase === 'playing' && currentQuestion && (
          <QuestionScreen
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={quizData.length}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {phase === 'results' && (
          <ResultsScreen
            score={score}
            totalQuestions={quizData.length}
            answers={answers}
            onRetry={handleRetry}
            moduleLabel={mod.label}
            moduleTitle={mod.title}
            userName={userName}
            duration={durationRef.current}
            submitStatus={submitStatus}
          />
        )}
      </main>

      <Footer moduleLabel={footerLabel} />
    </div>
  );
};
