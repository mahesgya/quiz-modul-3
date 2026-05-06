import type { Question } from '@/types';
import quizModule2Raw from './QuizModule2.json';
import quizModule3Raw from './QuizModule3.json';

export interface ModuleConfig {
  id: string;
  label: string;
  title: string;
  description: string;
  questions: Question[];
}

export const MODULES: Record<string, ModuleConfig> = {
  '2': {
    id: '2',
    label: 'Modul 2',
    title: 'Dasar AI, Literasi AI & Digital Mindset',
    description: 'Pengenalan konsep dasar kecerdasan buatan, literasi AI, dan pola pikir digital.',
    questions: quizModule2Raw as Question[],
  },
  '3': {
    id: '3',
    label: 'Modul 3',
    title: 'Etika, Keamanan, dan Aspek Hukum AI',
    description: 'Klasifikasi data pribadi, risiko penggunaan AI publik, mitigasi bias, dan identifikasi deepfake.',
    questions: quizModule3Raw as Question[],
  },
};
