'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  icon?: string;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-sm)] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors active:scale-[0.99]"
      >
        <span className="flex-1 font-medium text-sm text-[var(--text-primary)]">{title}</span>
        <ChevronDown
          size={16}
          className={`text-[var(--text-tertiary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
