import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  totalQuestions: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, totalQuestions }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 border-t-4 border-t-primary shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="poppins text-2xl md:text-3xl text-primary font-bold leading-tight">Quiz Modul 3</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 px-5 md:px-8 py-6">
        <div className="bg-muted p-4 rounded-lg border border-border">
          <h3 className="poppins text-sm md:text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
            Petunjuk Pengerjaan:
          </h3>
          <ul className="poppins space-y-2 text-xs md:text-sm text-muted-foreground list-disc pl-5">
            <li>Terdapat <strong>{totalQuestions} pertanyaan</strong> pilihan ganda berdasarkan Modul 3 &mdash; Etika, Keamanan, dan Aspek Hukum AI.</li>
            <li>Pilihlah satu jawaban yang paling tepat.</li>
            <li>Setelah memilih, Anda akan langsung mendapatkan umpan balik (benar/salah) beserta pembahasannya.</li>
            <li>Bacalah pembahasan dengan seksama untuk meningkatkan pemahaman Anda.</li>
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pb-8 pt-4">
        <Button onClick={onStart} size="lg" className="poppins w-full max-w-sm text-lg font-semibold h-12 shadow-md">
          Mulai Evaluasi
        </Button>
      </CardFooter>
    </Card>
  );
};
