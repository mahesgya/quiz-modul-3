export interface Question {
  No: number;
  Topik: string;
  Pertanyaan: string;
  Pilihan: string[];
  Jawaban: string;
  Pembahasan: string;
}

export type QuizState = 'welcome' | 'playing' | 'results';

export interface QuizSession {
  score: number;
  currentQuestionIndex: number;
  userName: string;
  answers: {
    questionNo: number;
    selectedOption: string;
    isCorrect: boolean;
  }[];
}

export interface QuizSubmission {
  timestamp: string;
  nama: string;
  modul: string;
  skor: number;
  totalSoal: number;
  persentase: number;
  durasi: string;
  jawaban: QuizSession['answers'];
}
