'use client';

import { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  icon?: string;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, icon, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[var(--border-card)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
      >
        {icon && <span className="text-lg">{icon}</span>}
        <span className="flex-1 font-medium text-sm">{title}</span>
        <span
          className="text-[var(--text-tertiary)] transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
