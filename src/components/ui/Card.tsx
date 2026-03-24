'use client';

import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: 'p-3',
  md: 'p-4 md:p-5',
  lg: 'p-5 md:p-6',
};

export function Card({ children, className = '', hover = false, onClick, padding = 'md' }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-[var(--shadow-md)]
        ${hover
          ? 'transition-all duration-200 ease-out hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer'
          : ''
        }
        ${paddings[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
