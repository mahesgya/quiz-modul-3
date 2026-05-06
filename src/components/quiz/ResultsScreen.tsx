import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  moduleLabel: string;
  moduleTitle: string;
  answers: {
    questionNo: number;
    selectedOption: string;
    isCorrect: boolean;
  }[];
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRetry, moduleLabel, moduleTitle, answers }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  let resultMessage = '';
  if (percentage >= 80) resultMessage = 'Sangat Baik! Anda memiliki pemahaman materi yang tinggi.';
  else if (percentage >= 60) resultMessage = 'Cukup Baik. Terus tingkatkan pemahaman Anda mengenai materi ini.';
  else resultMessage = `Perlu Ditingkatkan. Kami menyarankan untuk meninjau kembali materi ${moduleLabel} — ${moduleTitle}.`;

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 border-t-4 border-t-accent shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="text-center space-y-3 pt-6 md:pt-8 px-4 md:px-8">
        <div className="mx-auto bg-accent/20 p-3 md:p-4 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-1 md:mb-2">
          <Trophy className="w-10 h-10 md:w-12 md:h-12 text-accent" />
        </div>
        <CardTitle className="poppins text-2xl md:text-3xl font-bold">Hasil Evaluasi</CardTitle>
        <p className="poppins text-sm md:text-base text-muted-foreground leading-snug">{resultMessage}</p>
      </CardHeader>

      <CardContent className="px-4 md:px-8 py-4 md:py-6 flex flex-col items-center">
        <div className="flex gap-4 md:gap-8 mb-6 md:mb-8">
          <div className="text-center">
            <p className="poppins text-4xl md:text-5xl font-black text-primary mb-1 md:mb-2">
              {score}<span className="text-xl md:text-2xl text-muted-foreground">/{totalQuestions}</span>
            </p>
            <p className="poppins text-[10px] md:text-sm font-medium uppercase tracking-wider text-muted-foreground">Skor Anda</p>
          </div>
          <div className="w-px bg-border"></div>
          <div className="text-center">
            <p className="poppins text-4xl md:text-5xl font-black text-accent mb-1 md:mb-2">{percentage}%</p>
            <p className="poppins text-[10px] md:text-sm font-medium uppercase tracking-wider text-muted-foreground">Akurasi</p>
          </div>
        </div>

        <div className="w-full space-y-3 mt-4 md:mt-6">
          <h3 className="poppins font-semibold text-base md:text-lg border-b pb-2 mb-3 md:mb-4">Ringkasan Jawaban</h3>
          <div className="grid grid-cols-5 md:grid-cols-5 gap-1.5 md:gap-2">
            {answers.map((ans, idx) => (
              <div
                key={ans.questionNo}
                className={`poppins flex items-center justify-center p-1.5 md:p-2 rounded text-xs md:text-sm font-medium border
                  ${ans.isCorrect ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-destructive/10 border-destructive/20 text-destructive'}
                `}
                title={`Pertanyaan ${ans.questionNo}`}
              >
                <span className="mr-1">{idx + 1}.</span>
                {ans.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pb-8 pt-4 border-t bg-muted/30">
        <Button onClick={onRetry} variant="outline" size="lg" className="poppins w-full max-w-sm gap-2">
          <RefreshCcw className="w-4 h-4" />
          Mulai Ulang Evaluasi
        </Button>
      </CardFooter>
    </Card>
  );
};
