'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Download, Zap, Dumbbell } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { weekSchedule } from '@/data/schedules';
import { workoutDays } from '@/data/workouts';
import { createEvents, type EventAttributes } from 'ics';

const dayColors: Record<string, string> = {
  red: 'bg-red-50 text-red-600',
  purple: 'bg-violet-50 text-violet-600',
  orange: 'bg-amber-50 text-amber-600',
  cyan: 'bg-cyan-50 text-cyan-600',
  green: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
};

function getJsDayToScheduleDay(jsDay: number): number {
  return jsDay === 0 ? 7 : jsDay;
}

function generateICSEvents(): EventAttributes[] {
  const events: EventAttributes[] = [];
  const today = new Date();

  for (let week = 0; week < 12; week++) {
    for (const schedule of weekSchedule) {
      const dayOfWeek = schedule.dayOfWeek;
      const currentDayOfWeek = getJsDayToScheduleDay(today.getDay());
      const diff = dayOfWeek - currentDayOfWeek + week * 7;
      const eventDate = addDays(today, diff);

      const workout = workoutDays.find(w => w.dayOfWeek === dayOfWeek);
      if (workout) {
        const fitnessSlot = schedule.slots.find(s => s.type === 'fitness');
        if (fitnessSlot) {
          const [startH, startM] = fitnessSlot.time.split(':').map(Number);
          const [endH, endM] = fitnessSlot.endTime.split(':').map(Number);
          events.push({
            title: `${workout.shortName}`,
            description: `${workout.name}\nTip: ${workout.type === 'fct' ? 'French Contrast' : 'Heavy'}\nSüre: ~${workout.estimatedDuration}dk\nBölümler: ${workout.sections.map(s => s.name).join(', ')}`,
            start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), startH, startM],
            end: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), endH, endM],
            categories: ['fitness'],
          });
        }
      }

      const hockeySlot = schedule.slots.find(s => s.type === 'hokey');
      if (hockeySlot) {
        const [startH, startM] = hockeySlot.time.split(':').map(Number);
        const [endH, endM] = hockeySlot.endTime.split(':').map(Number);
        events.push({
          title: 'Buz Hokeyi',
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
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Takvim</h1>
        <button
          onClick={handleExportICS}
          disabled={exporting}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors duration-200 active:scale-[0.98] disabled:opacity-50"
        >
          <Download size={14} />
          {exporting ? 'Hazırlanıyor...' : 'Dışa Aktar (.ics)'}
        </button>
      </div>

      {/* Month navigation */}
      <Card hover={false} padding="md">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)]"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: tr })}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Card>

      {/* Calendar grid */}
      <Card hover={false} padding="sm">
        <div className="grid grid-cols-7 mb-2">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-[var(--text-tertiary)] py-2">
              {d}
            </div>
          ))}
        </div>

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
                  relative p-1.5 md:p-2 rounded-xl text-center transition-all duration-200 min-h-[60px] md:min-h-[80px] flex flex-col items-center gap-0.5
                  hover:shadow-[var(--shadow-sm)] active:scale-[0.97]
                  ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                  ${isToday ? 'ring-1 ring-primary/30 shadow-[var(--shadow-md)]' : ''}
                  ${colorClass || 'bg-transparent'}
                `}
              >
                <span className={`text-xs md:text-sm font-medium ${isToday ? 'text-primary font-bold' : 'text-[var(--text-primary)]'}`}>
                  {format(date, 'd')}
                </span>
                {schedule && isCurrentMonth && (
                  <span className="text-[8px] md:text-[10px] text-[var(--text-tertiary)] leading-tight">
                    {schedule.nickname}
                  </span>
                )}
                {workout && isCurrentMonth && (
                  <span className="mt-auto">
                    {workout.type === 'fct'
                      ? <Zap size={10} className="text-violet-500" />
                      : <Dumbbell size={10} className="text-amber-500" />
                    }
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <Card hover={false} padding="md">
        <h3 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">Gösterim</h3>
        <div className="flex flex-wrap gap-2">
          {weekSchedule.map(day => (
            <Badge key={day.id} variant={day.color === 'red' ? 'red' : day.color === 'purple' ? 'purple' : day.color === 'orange' ? 'orange' : day.color === 'cyan' ? 'cyan' : day.color === 'green' ? 'green' : 'blue'}>
              {day.nickname}
            </Badge>
          ))}
          <div className="flex items-center gap-1">
            <Zap size={10} className="text-violet-500" />
            <span className="text-[10px] text-[var(--text-tertiary)]">FCT</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell size={10} className="text-amber-500" />
            <span className="text-[10px] text-[var(--text-tertiary)]">Ağır</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
