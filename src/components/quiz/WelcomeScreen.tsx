'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, User, ChevronDown } from 'lucide-react';

const PARTICIPANT_NAMES = [
  'Bambang Triwahjudi SE.,MM',
  'Pungki Ariawan',
  'Muhammad Abdul Rozak Thoyyibi, A.Md.Pnl.,',
  'Haseena Ulisakinah, A.Md.Tra',
  'BILLY RICHARD ANDERSON, S.STP',
  'Saepul Amri, S.IP',
  'Hery Syapari',
  'Andika Pratama S.T',
  'Nurul Cikalia Fiskandar',
  'Raden Yunita',
  'Agung Fajar Sentosa, A.Md.M',
  'Achmad Jufri, S.E',
  'Nani Haryani',
  'Hari Prasetyo, S.Pd',
  'Dimas Wijaya',
  'Achmad Arya Sofyan, S.Kom',
  'Ratih Setio Dewi, SKM',
  'Bintari Hari A, A.Md',
  'Erik Wahyudi',
  'MIFTACHUL JANAH S.E.',
  'Dian Irma Ningtyas, S.Stat.',
  'Ika Puput Wulansari, S.Sos.',
  'TB Rubaya Fadillah',
  'Rama Andhika Yoga',
  'Bayu Darma Kusuma',
  'Herti, SKM',
  'DENDI MULYADI',
  'Laily Faulina, S.Sos',
  'Sabur Yusnandar, S.IP',
  'FARHAN ERSANDY, A.Md.M.',
  'Sahib Khan , S.STP. MPA',
  'Asep Firdaus',
  'Hasanudin,S,Sos',
  'piping maskumambang',
  'Ratu Ulfah Zakiah, S.A.P.',
  'Lusiana Rohim S.I.Kom',
];

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  totalQuestions: number;
  moduleLabel: string;
  moduleTitle: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, totalQuestions, moduleLabel, moduleTitle }) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = name.trim()
    ? PARTICIPANT_NAMES.filter((n) => n.toLowerCase().includes(name.toLowerCase()))
    : PARTICIPANT_NAMES;

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed) onStart(trimmed);
  };

  const selectName = (selected: string) => {
    setName(selected);
    setOpen(false);
    setHighlighted(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (open && highlighted >= 0 && filtered[highlighted]) {
        selectName(filtered[highlighted]);
      } else {
        handleSubmit();
      }
      return;
    }
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setOpen(true);
        setHighlighted(0);
        return;
      }
    }
    if (e.key === 'ArrowDown') {
      setHighlighted((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlighted((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setOpen(false);
      setHighlighted(-1);
    }
  };

  useEffect(() => {
    if (highlighted >= 0 && listRef.current) {
      const item = listRef.current.children[highlighted] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlighted]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        <div className="space-y-2" ref={containerRef}>
          <label className="poppins text-sm font-semibold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Nama Peserta
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setOpen(true);
                setHighlighted(-1);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik atau pilih nama Anda..."
              className="poppins w-full px-4 py-2.5 pr-10 rounded-lg border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setOpen((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && filtered.length > 0 && (
              <ul
                ref={listRef}
                className="absolute z-50 mt-1 w-full max-h-52 overflow-y-auto rounded-lg border border-border bg-card shadow-lg"
              >
                {filtered.map((n, i) => (
                  <li
                    key={n}
                    onMouseDown={() => selectName(n)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`poppins px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                      i === highlighted
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="poppins text-xs text-muted-foreground">
            Pilih dari daftar atau ketik nama secara manual.
          </p>
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
