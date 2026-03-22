'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { weekSchedule } from '@/data/schedules';
import { workoutDays } from '@/data/workouts';
import { createEvents, type EventAttributes } from 'ics';

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

function generateICSEvents(): EventAttributes[] {
  const events: EventAttributes[] = [];
  const today = new Date();

  // Generate 12 weeks of events
  for (let week = 0; week < 12; week++) {
    for (const schedule of weekSchedule) {
      // Calculate the date for this day of the week
      const dayOfWeek = schedule.dayOfWeek;
      const currentDayOfWeek = getJsDayToScheduleDay(today.getDay());
      const diff = dayOfWeek - currentDayOfWeek + week * 7;
      const eventDate = addDays(today, diff);

      // Add workout events
      const workout = workoutDays.find(w => w.dayOfWeek === dayOfWeek);
      if (workout) {
        const fitnessSlot = schedule.slots.find(s => s.type === 'fitness');
        if (fitnessSlot) {
          const [startH, startM] = fitnessSlot.time.split(':').map(Number);
          const [endH, endM] = fitnessSlot.endTime.split(':').map(Number);
          events.push({
            title: `💪 ${workout.shortName}`,
            description: `${workout.name}\nTip: ${workout.type === 'fct' ? 'FCT Devre' : 'Ağır'}\nSüre: ~${workout.estimatedDuration}dk\nHareketler: ${workout.exercises.map(e => e.name).join(', ')}`,
            start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), startH, startM],
            end: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), endH, endM],
            categories: ['fitness'],
          });
        }
      }

      // Add hockey events
      const hockeySlot = schedule.slots.find(s => s.type === 'hokey');
      if (hockeySlot) {
        const [startH, startM] = hockeySlot.time.split(':').map(Number);
        const [endH, endM] = hockeySlot.endTime.split(':').map(Number);
        events.push({
          title: `🏒 Buz Hokeyi`,
          description: hockeySlot.activity,
          start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), startH, startM],
          end: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), endH, endM],
          categories: ['hokey'],
        });
      }
    }
  }

  return events;
}

export default function TakvimPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [exporting, setExporting] = useState(false);
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

  const handleExportICS = useCallback(() => {
    setExporting(true);
    const events = generateICSEvents();

    createEvents(events, (error, value) => {
      if (error || !value) {
        setExporting(false);
        return;
      }

      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'duselence-takvim.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExporting(false);
    });
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold gradient-text">Takvim</h1>
        <button
          onClick={handleExportICS}
          disabled={exporting}
          className="px-4 py-2 rounded-xl bg-accent-blue text-white text-xs font-semibold hover:bg-accent-blue/90 transition-colors disabled:opacity-50"
        >
          {exporting ? 'Hazırlanıyor...' : 'Takvimi Dışa Aktar (.ics)'}
        </button>
      </div>

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
