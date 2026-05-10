'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, User } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  totalQuestions: number;
  moduleLabel: string;
  moduleTitle: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, totalQuestions, moduleLabel, moduleTitle }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed) onStart(trimmed);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 border-t-4 border-t-primary shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <span className="poppins text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
          {moduleLabel}
        </span>
        <CardTitle className="poppins text-2xl md:text-3xl text-primary font-bold leading-tight">{moduleTitle}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 px-5 md:px-8 py-6">
        <div className="bg-muted p-4 rounded-lg border border-border">
          <h3 className="poppins text-sm md:text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
            Petunjuk Pengerjaan:
          </h3>
          <ul className="poppins space-y-2 text-xs md:text-sm text-muted-foreground list-disc pl-5">
            <li>Terdapat <strong>{totalQuestions} pertanyaan</strong> pilihan ganda.</li>
            <li>Pilihlah satu jawaban yang paling tepat.</li>
            <li>Setelah memilih, Anda akan langsung mendapatkan umpan balik (benar/salah) beserta pembahasannya.</li>
            <li>Bacalah pembahasan dengan seksama untuk meningkatkan pemahaman Anda.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <label className="poppins text-sm font-semibold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Nama Peserta
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Masukkan nama lengkap Anda..."
            className="poppins w-full px-4 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pb-8 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!name.trim()}
          size="lg"
          className="poppins w-full max-w-sm text-lg font-semibold h-12 shadow-md"
        >
          Mulai Evaluasi
        </Button>
      </CardFooter>
    </Card>
  );
};
