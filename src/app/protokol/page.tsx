'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Dumbbell, GraduationCap, Snowflake, Heart, UtensilsCrossed, Pill, Moon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { weekSchedule, type ActivityType } from '@/data/schedules';

const dayColorVariants: Record<string, string> = {
  red: 'bg-red-500',
  purple: 'bg-violet-500',
  orange: 'bg-amber-500',
  cyan: 'bg-cyan-500',
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
};

const dayBadgeVariants: Record<string, 'red' | 'purple' | 'orange' | 'cyan' | 'green' | 'blue'> = {
  red: 'red',
  purple: 'purple',
  orange: 'orange',
  cyan: 'cyan',
  green: 'green',
  blue: 'blue',
};

const activityTypeLabels: Record<ActivityType, string> = {
  fitness: 'Fitness',
  'üniversite': 'Üniversite',
  hokey: 'Hokey',
  toparlanma: 'Toparlanma',
  beslenme: 'Beslenme',
  takviye: 'Takviye',
  uyku: 'Uyku',
};

function getTodayDayOfWeek(): number {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 7 : jsDay;
}

function getDaySummary(slots: { type: ActivityType; activity: string }[]): string {
  const types = new Set(slots.map((s) => s.type));
  const parts: string[] = [];

  if (types.has('fitness')) {
    const fit = slots.find((s) => s.type === 'fitness');
    parts.push(fit ? fit.activity : 'Antrenman');
  }
  if (types.has('hokey')) parts.push('Buz Hokeyi');
  if (types.has('toparlanma')) parts.push('Toparlanma');
  if (!types.has('fitness') && !types.has('hokey') && types.has('üniversite')) {
    parts.push('Üniversite');
  }

  return parts.length > 0 ? parts.join(' + ') : 'Dinlenme';
}

export default function ProtokolPage() {
  const todayDow = useMemo(() => getTodayDayOfWeek(), []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Haftalık Protokol</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          7 günlük yaşam ve antrenman protokolün
        </p>
      </div>

      {/* Hafta Yapısı Özet */}
      <Card hover={false} padding="md">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">Hafta Yapısı</h2>
        <div className="flex gap-1.5">
          {weekSchedule.map((day) => {
            const isToday = day.dayOfWeek === todayDow;
            return (
              <div
                key={day.id}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-[10px] text-[var(--text-tertiary)] font-medium uppercase tracking-wide">
                  {day.name.slice(0, 3)}
                </span>
                <div
                  className={`w-full h-2 rounded-full ${dayColorVariants[day.color] ?? 'bg-blue-500'} ${
                    isToday ? 'opacity-100 ring-2 ring-offset-2 ring-primary/30' : 'opacity-30'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Gün Kartları */}
      <div className="space-y-3">
        {weekSchedule.map((day) => {
          const isToday = day.dayOfWeek === todayDow;
          const summary = getDaySummary(day.slots);
          const firstSlot = day.slots[0]?.time ?? '';
          const lastSlot = day.slots[day.slots.length - 1]?.time ?? '';
          const uniqueTypes = [...new Set(day.slots.map((s) => s.type))].filter(
            (t) => t !== 'uyku'
          );

          return (
            <Link key={day.id} href={`/protokol/${day.id}`}>
              <Card
                className={`block mb-3 ${isToday ? 'ring-1 ring-primary/20 shadow-[var(--shadow-lg)]' : ''}`}
                padding="md"
                hover={true}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${dayColorVariants[day.color] ?? 'bg-blue-500'}`}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{day.name}</h3>
                        {isToday && <Badge variant="primary" size="sm">Bugün</Badge>}
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                        {day.nickname}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-tertiary)] shrink-0 mt-0.5" />
                </div>

                <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
                  {summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {uniqueTypes.map((type) => (
                      <span
                        key={type}
                        className="text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] rounded-md px-1.5 py-0.5 font-medium"
                      >
                        {activityTypeLabels[type]}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-[var(--text-tertiary)] font-mono">
                    {firstSlot} - {lastSlot}
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
