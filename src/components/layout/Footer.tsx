import React from 'react';

interface FooterProps {
  moduleLabel?: string;
}

export const Footer: React.FC<FooterProps> = ({ moduleLabel }) => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-12 border-t">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="poppins text-sm font-medium">
          &copy; {new Date().getFullYear()} Ilmu Komputer IPB.
        </p>
        {moduleLabel && (
          <p className="poppins text-xs text-muted-foreground mt-1">{moduleLabel}</p>
        )}
      </div>
    </footer>
  );
};
