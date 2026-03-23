'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { weekSchedule, type ActivityType } from '@/data/schedules';

const dayColorVariants: Record<string, string> = {
  red: 'bg-accent-red',
  purple: 'bg-accent-purple',
  orange: 'bg-accent-orange',
  cyan: 'bg-accent-cyan',
  green: 'bg-accent-green',
  blue: 'bg-accent-blue',
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
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto space-y-6">
      {/* Baslik */}
      <div>
        <h1 className="text-2xl font-bold gradient-text">Haftalik Protokol</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          7 günlük yaşam ve antrenman protokolün
        </p>
      </div>

      {/* Hafta Yapisi Ozet */}
      <Card hover={false} padding="md">
        <h2 className="font-semibold text-sm mb-3">Hafta Yapisi</h2>
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
                  className={`w-full h-2 rounded-full ${dayColorVariants[day.color] ?? 'bg-accent-blue'} ${
                    isToday ? 'opacity-100 ring-2 ring-white/30' : 'opacity-40'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Gun Kartlari */}
      <div className="space-y-3">
        {weekSchedule.map((day) => {
          const isToday = day.dayOfWeek === todayDow;
          const summary = getDaySummary(day.slots);
          const slotCount = day.slots.length;
          const firstSlot = day.slots[0]?.time ?? '';
          const lastSlot = day.slots[day.slots.length - 1]?.time ?? '';
          const uniqueTypes = [...new Set(day.slots.map((s) => s.type))].filter(
            (t) => t !== 'uyku'
          );

          return (
            <Link key={day.id} href={`/protokol/${day.id}`}>
              <Card
                className={`block mb-3 ${
                  isToday
                    ? 'ring-1 ring-accent-blue/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                    : ''
                }`}
                padding="md"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        dayColorVariants[day.color] ?? 'bg-accent-blue'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{day.name}</h3>
                        {isToday && (
                          <Badge variant="blue" size="sm">
                            Bugun
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                        {day.nickname}
                      </p>
                    </div>
                  </div>
                  <Badge variant={dayBadgeVariants[day.color] ?? 'blue'} size="sm">
                    {day.nickname}
                  </Badge>
                </div>

                <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
                  {summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {uniqueTypes.map((type) => (
                      <span
                        key={type}
                        className="text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] rounded px-1.5 py-0.5"
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
