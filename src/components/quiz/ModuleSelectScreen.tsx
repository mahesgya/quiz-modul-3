import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronRight } from 'lucide-react';
import { MODULES } from '@/data/modules';

export const ModuleSelectScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h1 className="poppins text-2xl md:text-3xl font-bold text-primary">Evaluasi Pelatihan</h1>
        <p className="poppins text-sm text-muted-foreground">Pilih modul yang ingin Anda kerjakan</p>
      </div>

      <div className="space-y-4">
        {Object.values(MODULES).map((mod) => (
          <Card
            key={mod.id}
            className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate(`/quiz/${mod.id}`)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="poppins text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {mod.label}
                </span>
                <span className="poppins text-xs text-muted-foreground">{mod.questions.length} soal</span>
              </div>
              <CardTitle className="poppins text-base md:text-lg font-semibold mt-2 group-hover:text-primary transition-colors">
                {mod.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between pt-0">
              <p className="poppins text-xs md:text-sm text-muted-foreground leading-relaxed flex-1 pr-4">
                {mod.description}
              </p>
              <Button size="sm" className="shrink-0 gap-1 group-hover:gap-2 transition-all">
                Mulai
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
