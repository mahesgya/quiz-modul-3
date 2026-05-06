import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Question } from '@/types';
import { AlertCircle, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (isCorrect: boolean, selectedOption: string) => void;
  onNextQuestion: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onNextQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // The correct answer typically includes the letter (e.g. "B. Data kesehatan...").
  // We match the selected option to see if it starts with the correct answer letter.
  const correctAnswerLetter = question.Jawaban.split('.')[0];
  const isSelectedCorrect = selectedOption?.startsWith(correctAnswerLetter);

  const handleOptionSelect = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption !== null && !isAnswered) {
      setIsAnswered(true);
      onAnswerSubmit(!!isSelectedCorrect, selectedOption);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    onNextQuestion();
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="poppins text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Topik: {question.Topik}
        </span>
        <span className="poppins text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          Pertanyaan {questionNumber} dari {totalQuestions}
        </span>
      </div>

      <Card className="shadow-md border-t-4 border-t-primary transition-all">
        <CardHeader className="py-4 md:py-6 px-4 md:px-6">
          <CardTitle className="poppins leading-snug text-lg md:text-xl font-semibold">{question.Pertanyaan}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 md:space-y-3 px-4 md:px-6">
          {question.Pilihan.map((option, index) => {
            let optionStateClass = "border-input bg-card hover:bg-accent/10 hover:border-accent";
            
            if (isAnswered) {
              const isOptionCorrect = option.startsWith(correctAnswerLetter);
              const isOptionSelected = option === selectedOption;
              
              if (isOptionCorrect) {
                optionStateClass = "bg-green-50 border-green-500 text-green-900 font-semibold shadow-sm ring-1 ring-green-400";
              } else if (isOptionSelected && !isOptionCorrect) {
                optionStateClass = "bg-destructive/10 border-destructive text-destructive-foreground opacity-90";
              } else {
                optionStateClass = "opacity-50 border-input bg-muted";
              }
            } else if (option === selectedOption) {
              optionStateClass = "ring-2 ring-primary border-primary bg-primary/5 shadow-sm";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswered}
                className={`w-full text-left p-3 md:p-4 rounded-lg border flex items-start gap-2 md:gap-3 transition-all ${optionStateClass}`}
              >
                <div className="mt-0.5 md:mt-1 flex-shrink-0">
                  {isAnswered && option.startsWith(correctAnswerLetter) && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {isAnswered && option === selectedOption && !option.startsWith(correctAnswerLetter) && <XCircle className="w-5 h-5 text-destructive" />}
                  {!isAnswered && option === selectedOption && <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-4 border-primary" />}
                  {!isAnswered && option !== selectedOption && <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-muted-foreground/30" />}
                </div>
                <span className="poppins flex-1 text-[13px] md:text-base text-foreground leading-relaxed md:leading-relaxed">{option}</span>
              </button>
            );
          })}
        </CardContent>

        <CardFooter className="flex flex-col border-t bg-muted/20 px-6 py-4">
          {!isAnswered ? (
            <Button 
              className="poppins w-full sm:w-auto self-end h-11 px-8 shadow-sm"
              disabled={selectedOption === null}
              onClick={handleCheckAnswer}
            >
              Periksa Jawaban
            </Button>
          ) : (
            <div className="w-full space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className={`p-4 rounded-lg flex gap-3 ${isSelectedCorrect ? 'bg-green-50 border border-green-200' : 'bg-destructive/10 border border-destructive/20'}`}>
                {isSelectedCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                )}
                <div className="space-y-2">
                  <h4 className={`poppins font-semibold ${isSelectedCorrect ? 'text-green-600' : 'text-destructive'}`}>
                    {isSelectedCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat'}
                  </h4>
                  <div className="text-sm text-foreground/90 space-y-1">
                    <p className="poppins"><strong>Jawaban yang benar:</strong> {question.Jawaban}</p>
                    <div className="poppins mt-2 text-muted-foreground border-t pt-2 border-border/50">
                      <strong>Pembahasan:</strong> {question.Pembahasan}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNext} className="poppins w-full sm:w-auto self-end gap-1 h-11 px-8 shadow-sm group">
                {questionNumber === totalQuestions ? 'Lihat Hasil Akhir' : 'Pertanyaan Selanjutnya'}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
