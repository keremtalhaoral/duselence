'use client';

import { useMemo } from 'react';
import { differenceInWeeks } from 'date-fns';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { phases, getCurrentPhase, getWeekInPhase } from '@/data/periodization';
import { useProgressStore } from '@/store/useProgressStore';

const phaseColorMap: Record<string, { badge: 'blue' | 'orange' | 'red' | 'green' | 'purple'; bar: string }> = {
  adaptasyon: { badge: 'blue', bar: 'bg-accent-blue' },
  guc: { badge: 'orange', bar: 'bg-accent-orange' },
  zirve: { badge: 'red', bar: 'bg-accent-red' },
  deload: { badge: 'green', bar: 'bg-accent-green' },
  test: { badge: 'purple', bar: 'bg-accent-purple' },
};

export default function PeriodizasyonPage() {
  const { programStartDate } = useProgressStore();

  const { currentWeek, currentPhase, weekInPhase } = useMemo(() => {
    const start = new Date(programStartDate);
    const now = new Date();
    const weeks = Math.max(1, differenceInWeeks(now, start) + 1);
    const clamped = Math.min(weeks, 12);
    return {
      currentWeek: clamped,
      currentPhase: getCurrentPhase(clamped),
      weekInPhase: getWeekInPhase(clamped),
    };
  }, [programStartDate]);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold gradient-text">Periodizasyon</h1>

      {/* Current week indicator */}
      <Card hover={false} padding="md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--text-secondary)]">Program Haftası</span>
          <Badge variant={phaseColorMap[currentPhase.id]?.badge || 'blue'} size="md">
            Hafta {currentWeek}/12
          </Badge>
        </div>
        <ProgressBar value={(currentWeek / 12) * 100} color={phaseColorMap[currentPhase.id]?.bar || 'bg-accent-blue'} height="md" />
        <p className="text-xs text-[var(--text-tertiary)] mt-2">
          Şu anki faz: <strong className="text-[var(--text-primary)]">{currentPhase.name}</strong> — Faz haftası {weekInPhase}/{currentPhase.weekEnd - currentPhase.weekStart + 1}
        </p>
      </Card>

      {/* Phase cards */}
      <div className="space-y-4">
        {phases.map(phase => {
          const isActive = phase.id === currentPhase.id;
          const colors = phaseColorMap[phase.id];
          const phaseWeeks = phase.weekEnd - phase.weekStart + 1;

          return (
            <Card
              key={phase.id}
              hover={false}
              padding="lg"
              className={isActive ? 'ring-2 ring-accent-blue ring-offset-1 ring-offset-[var(--bg-primary)]' : 'opacity-75'}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">{phase.name}</h2>
                    {isActive && <Badge variant={colors?.badge || 'blue'} size="sm">Aktif</Badge>}
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Hafta {phase.weekStart}-{phase.weekEnd} ({phaseWeeks} hafta)
                  </p>
                </div>
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: phase.color }}
                />
              </div>

              <p className="text-sm text-[var(--text-secondary)] mb-3">{phase.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-[var(--text-tertiary)]">FCT Yükü</span>
                  <p className="font-medium text-[var(--text-primary)]">{phase.fctLoad}</p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-[var(--text-tertiary)]">Heavy Yükü</span>
                  <p className="font-medium text-[var(--text-primary)]">{phase.heavyLoad}</p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-[var(--text-tertiary)]">RPE Hedef</span>
                  <p className="font-medium text-[var(--text-primary)]">{phase.rpeTarget}</p>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-[var(--text-tertiary)]">Aksesuar</span>
                  <p className="font-medium text-[var(--text-primary)]">{phase.accessoryLoad}</p>
                </div>
              </div>

              {/* İpuçları */}
              {phase.tips && phase.tips.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {phase.tips.map((tip, i) => (
                    <li key={i} className="text-[11px] text-[var(--text-secondary)] flex items-start gap-1.5">
                      <span className="text-[var(--text-tertiary)] shrink-0">&bull;</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              )}

              {phase.deloadInfo && (
                <div className="mt-3 p-2 rounded-lg bg-accent-green/10 border border-accent-green/20">
                  <p className="text-xs text-accent-green">{phase.deloadInfo}</p>
                </div>
              )}

              {isActive && (
                <div className="mt-3">
                  <ProgressBar
                    value={(weekInPhase / phaseWeeks) * 100}
                    color={colors?.bar || 'bg-accent-blue'}
                    height="sm"
                    label="Faz ilerlemesi"
                    showLabel
                  />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
