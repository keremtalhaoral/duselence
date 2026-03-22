'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { weekSchedule } from '@/data/schedules';
import { workoutDays } from '@/data/workouts';

const dayColors: Record<string, string> = {
  red: 'bg-accent-red/20 text-accent-red border-accent-red/30',
  purple: 'bg-accent-purple/20 text-accent-purple border-accent-purple/30',
  orange: 'bg-accent-orange/20 text-accent-orange border-accent-orange/30',
  cyan: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
  green: 'bg-accent-green/20 text-accent-green border-accent-green/30',
  blue: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
};

function getJsDayToScheduleDay(jsDay: number): number {
  return jsDay === 0 ? 7 : jsDay;
}

export default function TakvimPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = calStart;
    while (day <= calEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const getScheduleForDate = (date: Date) => {
    const dow = getJsDayToScheduleDay(date.getDay());
    return weekSchedule.find(s => s.dayOfWeek === dow);
  };

  const getWorkoutForDate = (date: Date) => {
    const dow = getJsDayToScheduleDay(date.getDay());
    return workoutDays.find(w => w.dayOfWeek === dow);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold gradient-text">Takvim</h1>

      {/* Month navigation */}
      <Card hover={false} padding="md">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)]"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {format(currentMonth, 'MMMM yyyy', { locale: tr })}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)]"
          >
            →
          </button>
        </div>
      </Card>

      {/* Calendar grid */}
      <Card hover={false} padding="sm">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-[var(--text-tertiary)] py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, i) => {
            const schedule = getScheduleForDate(date);
            const workout = getWorkoutForDate(date);
            const isToday = isSameDay(date, today);
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const colorClass = schedule ? dayColors[schedule.color] || '' : '';

            return (
              <Link
                key={i}
                href={schedule ? `/protokol/${schedule.id}` : '#'}
                className={`
                  relative p-1.5 md:p-2 rounded-xl text-center transition-all min-h-[60px] md:min-h-[80px] flex flex-col items-center gap-0.5 border
                  ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                  ${isToday ? 'ring-2 ring-accent-blue ring-offset-1 ring-offset-[var(--bg-primary)]' : ''}
                  ${colorClass || 'border-transparent'}
                `}
              >
                <span className={`text-xs md:text-sm font-medium ${isToday ? 'text-accent-blue font-bold' : 'text-[var(--text-primary)]'}`}>
                  {format(date, 'd')}
                </span>
                {schedule && isCurrentMonth && (
                  <span className="text-[8px] md:text-[10px] text-[var(--text-tertiary)] leading-tight">
                    {schedule.nickname}
                  </span>
                )}
                {workout && isCurrentMonth && (
                  <span className="text-[8px] md:text-[10px] font-medium mt-auto">
                    {workout.type === 'fct' ? '⚡' : '🏋️'}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <Card hover={false} padding="md">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Gösterim</h3>
        <div className="flex flex-wrap gap-2">
          {weekSchedule.map(day => (
            <Badge key={day.id} variant={day.color === 'red' ? 'red' : day.color === 'purple' ? 'purple' : day.color === 'orange' ? 'orange' : day.color === 'cyan' ? 'cyan' : day.color === 'green' ? 'green' : 'blue'}>
              {day.nickname}
            </Badge>
          ))}
          <Badge variant="default">⚡ FCT</Badge>
          <Badge variant="default">🏋️ Ağır</Badge>
        </div>
      </Card>
    </div>
  );
}
