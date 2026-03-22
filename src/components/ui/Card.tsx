'use client';

import { ReactNode } from 'react';

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

export function Card({ children, className = '', hover = true, onClick, padding = 'md' }: CardProps) {
  return (
    <div
      className={`${hover ? 'glass-card' : 'glass-card-static'} ${paddings[padding]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
