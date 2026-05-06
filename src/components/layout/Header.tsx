import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-primary-foreground py-3 md:py-4 px-4 md:px-6 shadow-md border-b-4 border-accent">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button
              onClick={() => navigate('/')}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors mr-1 flex items-center gap-1 text-sm font-medium"
            >
              ← Kembali
            </button>
          )}
          <img
            src="/logo-ipb.png"
            alt="Logo IPB"
            className="h-10 md:h-12 w-auto object-contain bg-white rounded-md p-0.5 md:p-1 shadow-sm"
          />
        </div>
        {title && (
          <div>
            <h2 className="poppins text-sm md:text-lg font-semibold leading-tight text-primary-foreground/90 md:text-primary-foreground text-right">
              {title}
            </h2>
          </div>
        )}
      </div>
    </header>
  );
};
