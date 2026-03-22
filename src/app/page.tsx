'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { format, differenceInWeeks, isAfter, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgressStore } from '@/store/useProgressStore';
import { useSupplementStore } from '@/store/useSupplementStore';
import { weekSchedule } from '@/data/schedules';
import { workoutDays } from '@/data/workouts';
import { supplements } from '@/data/supplements';
import { getCurrentPhase, getWeekInPhase } from '@/data/periodization';
import { quotes } from '@/data/quotes';

const activityTypeIcons: Record<string, string> = {
  fitness: '\u{1F4AA}',
  'üniversite': '\u{1F393}',
  hokey: '\u{1F3D2}',
  toparlanma: '\u{1F9D8}',
  beslenme: '\u{1F372}',
  takviye: '\u{1F48A}',
  uyku: '\u{1F319}',
};

const sectionLinks = [
  { href: '/antrenman', label: 'Antrenman', icon: '\u{1F3CB}\uFE0F', color: 'bg-accent-red/15 text-accent-red' },
  { href: '/takviyeler', label: 'Takviyeler', icon: '\u{1F48A}', color: 'bg-accent-green/15 text-accent-green' },
  { href: '/program', label: 'Program', icon: '\u{1F4C5}', color: 'bg-accent-blue/15 text-accent-blue' },
  { href: '/beslenme', label: 'Beslenme', icon: '\u{1F957}', color: 'bg-accent-orange/15 text-accent-orange' },
  { href: '/ilerleme', label: 'İlerleme', icon: '\u{1F4C8}', color: 'bg-accent-purple/15 text-accent-purple' },
  { href: '/periyodizasyon', label: 'Periyodizasyon', icon: '\u{1F504}', color: 'bg-accent-cyan/15 text-accent-cyan' },
];

function getJsDayToDataDay(jsDay: number): number {
  // JS: 0=Sun,1=Mon...6=Sat -> Data: 1=Mon...7=Sun
  return jsDay === 0 ? 7 : jsDay;
}

function getWeeklyScheduleIndex(jsDay: number): number {
  // weeklySchedule: [Mon,Tue,Wed,Thu,Fri,Sat,Sun] = 0-6
  // JS: 0=Sun,1=Mon...6=Sat
  return jsDay === 0 ? 6 : jsDay - 1;
}

export default function HomePage() {
  const now = new Date();
  const today = format(now, 'yyyy-MM-dd');
  const jsDay = now.getDay();
  const dataDay = getJsDayToDataDay(jsDay);
  const weeklyIndex = getWeeklyScheduleIndex(jsDay);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

  const { programStartDate } = useProgressStore();
  const { isTaken, getDayProgress } = useSupplementStore();

  // Today's schedule
  const todaySchedule = weekSchedule.find((d) => d.dayOfWeek === dataDay);

  // Today's workout
  const todayWorkout = workoutDays.find((w) => w.dayOfWeek === dataDay);

  // Current and next activity
  const { currentActivity, nextActivity } = useMemo(() => {
    if (!todaySchedule) return { currentActivity: null, nextActivity: null };
    const slots = todaySchedule.slots;
    let current = null;
    let next = null;

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (currentTimeStr >= slot.time && currentTimeStr < slot.endTime) {
        current = slot;
        next = slots[i + 1] ?? null;
        break;
      }
      if (currentTimeStr < slot.time) {
        next = slot;
        break;
      }
    }

    // If past all slots, show last slot as current
    if (!current && !next && slots.length > 0) {
      current = slots[slots.length - 1];
    }

    return { currentActivity: current, nextActivity: next };
  }, [todaySchedule, currentTimeStr]);

  // Supplements for today
  const todaySupplements = supplements.filter((s) => s.weeklySchedule[weeklyIndex]);
  const takenCount = todaySupplements.filter((s) => isTaken(today, s.id)).length;
  const totalSupplements = todaySupplements.length;
  const supplementProgress = totalSupplements > 0 ? (takenCount / totalSupplements) * 100 : 0;

  // Fulsac check
  const fulsac = supplements.find((s) => s.id === 'fulsac');
  const fulsacTaken = fulsac ? isTaken(today, fulsac.id) : true;
  const fulsacScheduledToday = fulsac ? fulsac.weeklySchedule[weeklyIndex] : false;
  const showFulsacWarning = fulsacScheduledToday && !fulsacTaken;

  // Periodization
  const weekNumber = useMemo(() => {
    const startDate = parse(programStartDate, 'yyyy-MM-dd', new Date());
    if (isAfter(startDate, now)) return 0;
    return differenceInWeeks(now, startDate) + 1;
  }, [programStartDate, now]);

  const currentPhase = getCurrentPhase(weekNumber);
  const weekInPhase = getWeekInPhase(weekNumber);

  // Random quote (seeded by day so it stays consistent throughout the day)
  const dailyQuote = useMemo(() => {
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    return quotes[dayOfYear % quotes.length];
  }, [now]);

  // Formatted date
  const formattedDate = format(now, "d MMMM yyyy, EEEE", { locale: tr });

  // Greeting based on time of day
  const greeting = currentHour < 12 ? 'Gunaydin' : currentHour < 18 ? 'Iyi gunler' : 'Iyi aksamlar';
  const greetingTr = currentHour < 12 ? 'Gunaydın' : currentHour < 18 ? 'İyi gunler' : 'İyi akşamlar';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* Fulsac Critical Warning */}
      {showFulsacWarning && (
        <Link href="/takviyeler">
          <Card className="border border-accent-red/40 !bg-accent-red/10 animate-pulse" hover={true} padding="md">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{'\u26A0\uFE0F'}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="critical" size="md">KRİTİK</Badge>
                  <span className="font-bold text-accent-red">Fulsac Alınmadı!</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Fulsac (Fluoksetin) 40mg bugün henuz alınmadı. Kesinlikle atlanmamalı.
                </p>
              </div>
              <span className="text-[var(--text-tertiary)]">{'\u203A'}</span>
            </div>
          </Card>
        </Link>
      )}

      {/* Greeting Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          {currentHour < 12 ? 'Gunaydın' : currentHour < 18 ? 'İyi gunler' : 'İyi akşamlar'},{' '}
          <span className="gradient-text">Kerem</span>
        </h1>
        <p className="text-[var(--text-secondary)] mt-1 text-sm md:text-base">
          {formattedDate}
        </p>
        {todaySchedule && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={todaySchedule.color as 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'cyan'} size="md">
              {todaySchedule.nickname}
            </Badge>
            <span className="text-sm text-[var(--text-tertiary)]">
              {todaySchedule.name}
            </span>
          </div>
        )}
      </div>

      {/* Current / Next Activity */}
      <Card padding="md">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
          Şu An / Sıradaki
        </h2>
        <div className="space-y-3">
          {currentActivity && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/15 flex items-center justify-center text-lg shrink-0">
                {activityTypeIcons[currentActivity.type] || '\u{1F4CC}'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="blue" size="sm">ŞİMDİ</Badge>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {currentActivity.time} - {currentActivity.endTime}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-1 truncate">
                  {currentActivity.activity}
                </p>
              </div>
            </div>
          )}
          {nextActivity && (
            <div className="flex items-start gap-3 opacity-70">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-lg shrink-0">
                {activityTypeIcons[nextActivity.type] || '\u{1F4CC}'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="sm">SIRADA</Badge>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {nextActivity.time} - {nextActivity.endTime}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mt-1 truncate">
                  {nextActivity.activity}
                </p>
              </div>
            </div>
          )}
          {!currentActivity && !nextActivity && (
            <p className="text-sm text-[var(--text-tertiary)]">Bugün icin planlanmış etkinlik yok.</p>
          )}
        </div>
      </Card>

      {/* Workout Card */}
      {todayWorkout && (
        <Link href="/antrenman">
          <Card padding="md" hover={true}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent-red/15 flex items-center justify-center text-2xl">
                  {'\u{1F3CB}\uFE0F'}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{todayWorkout.shortName}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant={todayWorkout.type === 'fct' ? 'orange' : 'red'} size="sm">
                      {todayWorkout.type === 'fct' ? 'FCT' : 'HEAVY'}
                    </Badge>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {todayWorkout.exercises.length} egzersiz {'\u00B7'} ~{todayWorkout.estimatedDuration} dk
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-[var(--text-tertiary)] text-xl">{'\u203A'}</div>
            </div>
          </Card>
        </Link>
      )}

      {!todayWorkout && (
        <Card padding="md" hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-green/15 flex items-center justify-center text-2xl">
              {'\u{1F9D8}'}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Dinlenme Gunu</h3>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                Bugün antrenman yok. Toparlanmaya odaklan.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Supplement Progress */}
      <Link href="/takviyeler">
        <Card padding="md" hover={true}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Takviye Takibi
            </h2>
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              {takenCount} / {totalSupplements}
            </span>
          </div>
          <ProgressBar
            value={supplementProgress}
            color={supplementProgress === 100 ? 'bg-accent-green' : 'bg-accent-blue'}
            height="md"
            showLabel
          />
          {supplementProgress === 100 && (
            <p className="text-xs text-accent-green mt-2 font-medium">
              {'\u2705'} Tum takviyeler alındı!
            </p>
          )}
          {supplementProgress > 0 && supplementProgress < 100 && (
            <p className="text-xs text-[var(--text-tertiary)] mt-2">
              {totalSupplements - takenCount} takviye daha alınacak
            </p>
          )}
          {supplementProgress === 0 && totalSupplements > 0 && (
            <p className="text-xs text-[var(--text-tertiary)] mt-2">
              Henuz takviye alınmadı. Takip icin tıkla.
            </p>
          )}
        </Card>
      </Link>

      {/* Periodization Phase */}
      <Card padding="md" hover={false}>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
          Periyodizasyon
        </h2>
        {weekNumber > 0 ? (
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: `${currentPhase.color}20`, color: currentPhase.color }}
            >
              <span className="text-lg font-bold leading-none">{weekNumber}</span>
              <span className="text-[10px] uppercase font-medium">Hafta</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--text-primary)]">{currentPhase.name}</h3>
                <Badge
                  variant={
                    currentPhase.id === 'adaptasyon'
                      ? 'blue'
                      : currentPhase.id === 'guc'
                        ? 'orange'
                        : currentPhase.id === 'zirve'
                          ? 'red'
                          : 'green'
                  }
                  size="sm"
                >
                  {currentPhase.rpeTarget}
                </Badge>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{currentPhase.focus}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                Faz icinde {weekInPhase}. hafta {'\u00B7'} {currentPhase.intensityRange}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-accent-blue/15 flex items-center justify-center shrink-0">
              <span className="text-2xl">{'\u{23F3}'}</span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Program Henuz Başlamadı</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Başlangıc tarihi: {format(parse(programStartDate, 'yyyy-MM-dd', new Date()), 'd MMMM yyyy', { locale: tr })}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Motivational Quote */}
      <Card padding="md" hover={false}>
        <div className="text-center py-2">
          <p className="text-sm md:text-base italic text-[var(--text-primary)] leading-relaxed">
            &ldquo;{dailyQuote.text}&rdquo;
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-2">
            — {dailyQuote.author}
          </p>
        </div>
      </Card>

      {/* Quick Links */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3 px-1">
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {sectionLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card padding="sm" hover={true} className="text-center">
                <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center text-lg mx-auto mb-2`}>
                  {link.icon}
                </div>
                <span className="text-xs font-medium text-[var(--text-secondary)]">{link.label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
