import type { Question } from '@/types';
import quizModule1Raw from './QuizModule1.json';
import quizModule3Raw from './QuizModule3.json';

export interface ModuleConfig {
  id: string;
  label: string;
  title: string;
  description: string;
  questions: Question[];
}

export const MODULES: Record<string, ModuleConfig> = {
  '1': {
    id: '1',
    label: 'Modul 1',
    title: 'Literasi Digital dan Pola Pikir AI',
    description: 'Pengenalan konsep dasar kecerdasan buatan, literasi AI, dan pola pikir digital.',
    questions: quizModule1Raw as Question[],
  },
  '3': {
    id: '3',
    label: 'Modul 3',
    title: 'Etika, Keamanan, dan Aspek Hukum AI',
    description: 'Klasifikasi data pribadi, risiko penggunaan AI publik, mitigasi bias, dan identifikasi deepfake.',
    questions: quizModule3Raw as Question[],
  },
};
