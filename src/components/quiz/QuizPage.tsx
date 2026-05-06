import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WelcomeScreen } from './WelcomeScreen';
import { QuestionScreen } from './QuestionScreen';
import { ResultsScreen } from './ResultsScreen';
import { Progress } from '@/components/ui/progress';
import { MODULES } from '@/data/modules';
import type { QuizState } from '@/types';

export const QuizPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const mod = moduleId ? MODULES[moduleId] : undefined;

  useEffect(() => {
    if (!mod) navigate('/', { replace: true });
  }, [mod, navigate]);

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
  const [answers, setAnswers] = useState<{ questionNo: number; selectedOption: string; isCorrect: boolean }[]>(
    initialState?.answers || []
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ phase, currentIndex, score, answers }));
  }, [phase, currentIndex, score, answers, storageKey]);

  if (!mod) return null;

  const quizData = mod.questions;

  const handleStart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setPhase('playing');
  };

  const handleRetry = () => {
    localStorage.removeItem(storageKey);
    handleStart();
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
      setPhase('results');
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
          />
        )}
      </main>

      <Footer moduleLabel={footerLabel} />
    </div>
  );
};
