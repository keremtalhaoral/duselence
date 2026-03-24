'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Dumbbell, GraduationCap, Snowflake, Heart, UtensilsCrossed, Pill, Moon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { weekSchedule, type ActivityType } from '@/data/schedules';

const typeColors: Record<ActivityType, string> = {
  fitness: 'border-l-red-500 bg-red-50/50',
  'üniversite': 'border-l-blue-500 bg-blue-50/50',
  hokey: 'border-l-cyan-500 bg-cyan-50/50',
  toparlanma: 'border-l-emerald-500 bg-emerald-50/50',
  beslenme: 'border-l-amber-500 bg-amber-50/50',
  takviye: 'border-l-violet-500 bg-violet-50/50',
  uyku: 'border-l-gray-400 bg-gray-50/50',
};

const typeDotColors: Record<ActivityType, string> = {
  fitness: 'bg-red-500',
  'üniversite': 'bg-blue-500',
  hokey: 'bg-cyan-500',
  toparlanma: 'bg-emerald-500',
  beslenme: 'bg-amber-500',
  takviye: 'bg-violet-500',
  uyku: 'bg-gray-400',
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
  'üniversite': 'Üniversite',
  hokey: 'Hokey',
  toparlanma: 'Toparlanma',
  beslenme: 'Beslenme',
  takviye: 'Takviye',
  uyku: 'Uyku',
};

const dayColorDot: Record<string, string> = {
  red: 'bg-red-500',
  purple: 'bg-violet-500',
  orange: 'bg-amber-500',
  cyan: 'bg-cyan-500',
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
};

export function ProtocolContent({ gun }: { gun: string }) {
  const day = useMemo(() => weekSchedule.find((d) => d.id === gun), [gun]);

  if (!day) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Link href="/protokol" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft size={14} />
          Protokole dön
        </Link>
        <Card hover={false} padding="lg">
          <p className="text-sm text-[var(--text-secondary)]">Bu gün bulunamadı.</p>
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
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/protokol" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        <ArrowLeft size={14} />
        Protokole dön
      </Link>

      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full shrink-0 ${dayColorDot[day.color] ?? 'bg-blue-500'}`} />
        <div>
          <h1 className="text-2xl font-bold gradient-text">{day.name}</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{day.nickname}</p>
        </div>
      </div>

      <Card hover={false} padding="md">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">Aktivite Dağılımı</h2>
        <div className="flex flex-wrap gap-3">
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
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3 px-1">Günlük Program</h2>
        <div className="relative">
          <div className="absolute left-[39px] top-2 bottom-2 w-px bg-gray-200" />
          <div className="space-y-2">
            {day.slots.map((slot, idx) => (
              <div key={`${slot.time}-${idx}`} className="flex gap-3 items-start relative">
                <div className="w-[36px] shrink-0 text-right">
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">{slot.time}</span>
                </div>
                <div className="relative z-10 mt-1.5 shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${typeDotColors[slot.type]} ring-2 ring-white`} />
                </div>
                <div className={`flex-1 rounded-xl border-l-2 px-3 py-2.5 ${typeColors[slot.type]}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium leading-snug text-[var(--text-primary)]">{slot.activity}</p>
                    <Badge variant={typeBadgeVariants[slot.type]} size="sm">{typeLabels[slot.type]}</Badge>
                  </div>
                  {slot.endTime && slot.endTime !== slot.time && (
                    <p className="text-[10px] font-mono text-[var(--text-tertiary)] mb-1">{slot.time} — {slot.endTime}</p>
                  )}
                  {slot.supplements && slot.supplements.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {slot.supplements.map((sup) => (
                        <span key={sup} className="text-[10px] bg-violet-50 text-violet-700 rounded-md px-1.5 py-0.5 font-medium">{sup}</span>
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
