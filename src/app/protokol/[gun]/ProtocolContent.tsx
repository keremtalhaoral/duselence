'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { weekSchedule, type ActivityType } from '@/data/schedules';

const typeColors: Record<ActivityType, string> = {
  fitness: 'border-accent-red bg-accent-red/10',
  'üniversite': 'border-accent-blue bg-accent-blue/10',
  hokey: 'border-accent-cyan bg-accent-cyan/10',
  toparlanma: 'border-accent-green bg-accent-green/10',
  beslenme: 'border-accent-orange bg-accent-orange/10',
  takviye: 'border-accent-purple bg-accent-purple/10',
  uyku: 'border-navy-700 bg-navy-800/50',
};

const typeDotColors: Record<ActivityType, string> = {
  fitness: 'bg-accent-red',
  'üniversite': 'bg-accent-blue',
  hokey: 'bg-accent-cyan',
  toparlanma: 'bg-accent-green',
  beslenme: 'bg-accent-orange',
  takviye: 'bg-accent-purple',
  uyku: 'bg-navy-600',
};

const typeBadgeVariants: Record<ActivityType, 'red' | 'blue' | 'cyan' | 'green' | 'orange' | 'purple' | 'default'> = {
  fitness: 'red',
  'üniversite': 'blue',
  hokey: 'cyan',
  toparlanma: 'green',
  beslenme: 'orange',
  takviye: 'purple',
  uyku: 'default',
};

const typeLabels: Record<ActivityType, string> = {
  fitness: 'Fitness',
  'üniversite': 'Universite',
  hokey: 'Hokey',
  toparlanma: 'Toparlanma',
  beslenme: 'Beslenme',
  takviye: 'Takviye',
  uyku: 'Uyku',
};

const dayColorDot: Record<string, string> = {
  red: 'bg-accent-red',
  purple: 'bg-accent-purple',
  orange: 'bg-accent-orange',
  cyan: 'bg-accent-cyan',
  green: 'bg-accent-green',
  blue: 'bg-accent-blue',
};

export function ProtocolContent({ gun }: { gun: string }) {
  const day = useMemo(() => weekSchedule.find((d) => d.id === gun), [gun]);

  if (!day) {
    return (
      <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto space-y-6">
        <Link href="/protokol" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          &larr; Protokole don
        </Link>
        <Card hover={false} padding="lg">
          <p className="text-sm text-[var(--text-secondary)]">Bu gun bulunamadi.</p>
        </Card>
      </div>
    );
  }

  const typeSummary = useMemo(() => {
    const counts: Partial<Record<ActivityType, number>> = {};
    for (const slot of day.slots) {
      counts[slot.type] = (counts[slot.type] || 0) + 1;
    }
    return Object.entries(counts) as [ActivityType, number][];
  }, [day]);

  return (
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto space-y-6">
      <Link href="/protokol" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        &larr; Protokole don
      </Link>

      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full shrink-0 ${dayColorDot[day.color] ?? 'bg-accent-blue'}`} />
        <div>
          <h1 className="text-2xl font-bold gradient-text">{day.name}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{day.nickname}</p>
        </div>
      </div>

      <Card hover={false} padding="md">
        <h2 className="font-semibold text-sm mb-3">Aktivite Dagilimi</h2>
        <div className="flex flex-wrap gap-2">
          {typeSummary.map(([type, count]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${typeDotColors[type]}`} />
              <span className="text-xs text-[var(--text-secondary)]">{typeLabels[type]}</span>
              <span className="text-[10px] text-[var(--text-tertiary)] font-mono">({count})</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-1">
        <h2 className="font-semibold text-sm mb-3">Gunluk Program</h2>
        <div className="relative">
          <div className="absolute left-[39px] top-2 bottom-2 w-px bg-[var(--border-card)]" />
          <div className="space-y-2">
            {day.slots.map((slot, idx) => (
              <div key={`${slot.time}-${idx}`} className="flex gap-3 items-start relative">
                <div className="w-[36px] shrink-0 text-right">
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">{slot.time}</span>
                </div>
                <div className="relative z-10 mt-1.5 shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${typeDotColors[slot.type]} ring-2 ring-[var(--bg-primary)]`} />
                </div>
                <div className={`flex-1 rounded-lg border-l-2 px-3 py-2.5 ${typeColors[slot.type]}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium leading-snug">{slot.activity}</p>
                    <Badge variant={typeBadgeVariants[slot.type]} size="sm">{typeLabels[slot.type]}</Badge>
                  </div>
                  {slot.endTime && slot.endTime !== slot.time && (
                    <p className="text-[10px] font-mono text-[var(--text-tertiary)] mb-1">{slot.time} — {slot.endTime}</p>
                  )}
                  {slot.supplements && slot.supplements.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {slot.supplements.map((sup) => (
                        <span key={sup} className="text-[10px] bg-accent-purple/10 text-accent-purple rounded px-1.5 py-0.5 font-medium">{sup}</span>
                      ))}
                    </div>
                  )}
                  {slot.notes && (
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-1.5 italic">{slot.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
