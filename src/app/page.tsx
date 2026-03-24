'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { format, differenceInWeeks, isAfter, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import { AlertTriangle, Dumbbell, Pill, UtensilsCrossed, Calendar, TrendingUp, Repeat, ChevronRight, Moon, Zap } from 'lucide-react';
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

const activityTypeIcons: Record<string, React.ReactNode> = {
  fitness: <Dumbbell size={18} />,
  'üniversite': <span className="text-base">🎓</span>,
  hokey: <span className="text-base">🏒</span>,
  toparlanma: <Moon size={18} />,
  beslenme: <UtensilsCrossed size={18} />,
  takviye: <Pill size={18} />,
  uyku: <Moon size={18} />,
};

const sectionLinks = [
  { href: '/antrenman', label: 'Antrenman', icon: Dumbbell, color: 'text-primary bg-primary-light' },
  { href: '/takviye', label: 'Takviyeler', icon: Pill, color: 'text-emerald-700 bg-emerald-50' },
  { href: '/protokol', label: 'Program', icon: Calendar, color: 'text-blue-700 bg-blue-50' },
  { href: '/beslenme', label: 'Beslenme', icon: UtensilsCrossed, color: 'text-amber-700 bg-amber-50' },
  { href: '/ilerleme', label: 'İlerleme', icon: TrendingUp, color: 'text-violet-700 bg-violet-50' },
  { href: '/periodizasyon', label: 'Periyodizasyon', icon: Repeat, color: 'text-cyan-700 bg-cyan-50' },
];

function getJsDayToDataDay(jsDay: number): number {
  return jsDay === 0 ? 7 : jsDay;
}

function getWeeklyScheduleIndex(jsDay: number): number {
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

  const todaySchedule = weekSchedule.find((d) => d.dayOfWeek === dataDay);
  const todayWorkout = workoutDays.find((w) => w.dayOfWeek === dataDay);

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

    if (!current && !next && slots.length > 0) {
      current = slots[slots.length - 1];
    }

    return { currentActivity: current, nextActivity: next };
  }, [todaySchedule, currentTimeStr]);

  const todaySupplements = supplements.filter((s) => s.weeklySchedule[weeklyIndex]);
  const takenCount = todaySupplements.filter((s) => isTaken(today, s.id)).length;
  const totalSupplements = todaySupplements.length;
  const supplementProgress = totalSupplements > 0 ? (takenCount / totalSupplements) * 100 : 0;

  const fulsac = supplements.find((s) => s.id === 'fulsac');
  const fulsacTaken = fulsac ? isTaken(today, fulsac.id) : true;
  const fulsacScheduledToday = fulsac ? fulsac.weeklySchedule[weeklyIndex] : false;
  const showFulsacWarning = fulsacScheduledToday && !fulsacTaken;

  const weekNumber = useMemo(() => {
    const startDate = parse(programStartDate, 'yyyy-MM-dd', new Date());
    if (isAfter(startDate, now)) return 0;
    return differenceInWeeks(now, startDate) + 1;
  }, [programStartDate, now]);

  const currentPhase = getCurrentPhase(weekNumber);
  const weekInPhase = getWeekInPhase(weekNumber);

  const dailyQuote = useMemo(() => {
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    return quotes[dayOfYear % quotes.length];
  }, [now]);

  const formattedDate = format(now, "d MMMM yyyy, EEEE", { locale: tr });
  const greeting = currentHour < 12 ? 'Günaydın' : currentHour < 18 ? 'İyi günler' : 'İyi akşamlar';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Fulsac Warning */}
      {showFulsacWarning && (
        <Link href="/takviye">
          <div className="bg-red-50 rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Fulsac Alınmadı!</p>
              <p className="text-xs text-red-600 mt-0.5">
                Fulsac (Fluoksetin) 40mg bugün henüz alınmadı.
              </p>
            </div>
            <ChevronRight size={16} className="text-red-400" />
          </div>
        </Link>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
          {greeting}, <span className="gradient-text">Kerem</span>
        </h1>
        <p className="text-[var(--text-secondary)] mt-1 text-sm">{formattedDate}</p>
        {todaySchedule && (
          <div className="flex items-center gap-2 mt-3">
            <Badge variant={todaySchedule.color as 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'cyan'} size="md">
              {todaySchedule.nickname}
            </Badge>
            <span className="text-sm text-[var(--text-tertiary)]">{todaySchedule.summary}</span>
          </div>
        )}
      </div>

      {/* Current / Next Activity */}
      <Card padding="md">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
          Şu An / Sıradaki
        </p>
        <div className="space-y-3">
          {currentActivity && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0 text-primary">
                {activityTypeIcons[currentActivity.type] || <Zap size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">ŞİMDİ</Badge>
                  <span className="text-xs text-[var(--text-tertiary)] font-mono">
                    {currentActivity.time} – {currentActivity.endTime}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)] mt-1 truncate">
                  {currentActivity.activity}
                </p>
              </div>
            </div>
          )}
          {nextActivity && (
            <div className="flex items-start gap-3 opacity-60">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 text-[var(--text-tertiary)]">
                {activityTypeIcons[nextActivity.type] || <Zap size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="sm">SIRADA</Badge>
                  <span className="text-xs text-[var(--text-tertiary)] font-mono">
                    {nextActivity.time} – {nextActivity.endTime}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mt-1 truncate">
                  {nextActivity.activity}
                </p>
              </div>
            </div>
          )}
          {!currentActivity && !nextActivity && (
            <p className="text-sm text-[var(--text-tertiary)]">Bugün için planlanmış etkinlik yok.</p>
          )}
        </div>
      </Card>

      {/* Workout Card */}
      {todayWorkout ? (
        <Link href={`/antrenman/${todayWorkout.id}`}>
          <Card padding="md" hover={true}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                  <Dumbbell size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{todayWorkout.shortName}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant={todayWorkout.type === 'fct' ? 'purple' : 'orange'} size="sm">
                      {todayWorkout.type === 'fct' ? 'FCT' : 'HEAVY'}
                    </Badge>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      ~{todayWorkout.estimatedDuration} dk
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-[var(--text-tertiary)]" />
            </div>
          </Card>
        </Link>
      ) : (
        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Moon size={22} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Dinlenme Günü</h3>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                Bugün antrenman yok. Toparlanmaya odaklan.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Supplement Progress */}
      <Link href="/takviye">
        <Card padding="md" hover={true}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              Takviye Takibi
            </p>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {takenCount}/{totalSupplements}
            </span>
          </div>
          <ProgressBar
            value={supplementProgress}
            color={supplementProgress === 100 ? 'bg-emerald-500' : 'bg-primary'}
            height="md"
          />
          <p className="text-xs text-[var(--text-tertiary)] mt-2">
            {supplementProgress === 100
              ? 'Tüm takviyeler alındı!'
              : supplementProgress > 0
                ? `${totalSupplements - takenCount} takviye daha alınacak`
                : 'Henüz takviye alınmadı. Takip için tıkla.'
            }
          </p>
        </Card>
      </Link>

      {/* Periodization Phase */}
      <Card padding="md">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
          Periyodizasyon
        </p>
        {weekNumber > 0 ? (
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: `${currentPhase.color}15`, color: currentPhase.color }}
            >
              <span className="text-lg font-bold leading-none">{weekNumber}</span>
              <span className="text-[10px] uppercase font-medium">Hafta</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--text-primary)]">{currentPhase.name}</h3>
                <Badge variant="default" size="sm">{currentPhase.rpeTarget}</Badge>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{currentPhase.focus}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                Faz içinde {weekInPhase}. hafta · {currentPhase.intensityRange}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Program Henüz Başlamadı</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Başlangıç tarihi: {format(parse(programStartDate, 'yyyy-MM-dd', new Date()), 'd MMMM yyyy', { locale: tr })}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Quote */}
      <div className="py-4 text-center">
        <p className="text-sm italic text-[var(--text-secondary)] leading-relaxed">
          &ldquo;{dailyQuote.text}&rdquo;
        </p>
        <p className="text-xs text-[var(--text-tertiary)] mt-2">— {dailyQuote.author}</p>
      </div>

      {/* Quick Links */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3 px-1">
          Hızlı Erişim
        </p>
        <div className="grid grid-cols-3 gap-3">
          {sectionLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card padding="sm" hover={true} className="text-center">
                  <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center mx-auto mb-2`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">{link.label}</span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
