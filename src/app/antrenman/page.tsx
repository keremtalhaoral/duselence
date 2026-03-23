'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { workoutDays } from '@/data/workouts';
import { getCurrentPhase, getWeekInPhase } from '@/data/periodization';
import { useProgressStore } from '@/store/useProgressStore';

function getWeekNumber(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, diffWeeks + 1);
}

export default function AntrenmanPage() {
  const programStartDate = useProgressStore((s) => s.programStartDate);

  const weekNumber = useMemo(() => getWeekNumber(programStartDate), [programStartDate]);
  const phase = useMemo(() => getCurrentPhase(weekNumber), [weekNumber]);
  const weekInPhase = useMemo(() => getWeekInPhase(weekNumber), [weekNumber]);

  return (
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold gradient-text">Antrenman Programı</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Upper/Lower — FCT + Heavy | 4 gün/hafta
        </p>
      </div>

      {/* Periyodizasyon Fazı */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: phase.color }}
          />
          <h2 className="font-semibold text-sm">{phase.name}</h2>
          <Badge variant="blue" size="sm">
            Hafta {weekNumber} &middot; Faz {weekInPhase}/{phase.weekEnd - phase.weekStart + 1}
          </Badge>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
          {phase.focus}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--text-tertiary)]">FCT Yükü</span>
            <span className="font-medium">{phase.fctLoad}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--text-tertiary)]">Heavy Yükü</span>
            <span className="font-medium">{phase.heavyLoad}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--text-tertiary)]">RPE Hedef</span>
            <span className="font-medium">{phase.rpeTarget}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[var(--text-tertiary)]">Aksesuar</span>
            <span className="font-medium">{phase.accessoryLoad}</span>
          </div>
        </div>
      </Card>

      {/* Antrenman Günleri */}
      <div className="space-y-3">
        {workoutDays.map((workout) => {
          const isFCT = workout.type === 'fct';
          const totalExercises = workout.sections.reduce((sum, s) => sum + s.exercises.length, 0);

          return (
            <Link key={workout.id} href={`/antrenman/${workout.id}`}>
              <Card className="block mb-3" padding="md">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">{workout.name}</h3>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                      {workout.subtitle}
                    </p>
                  </div>
                  <Badge variant={isFCT ? 'purple' : 'orange'} size="sm">
                    {isFCT ? 'FCT' : 'Heavy'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {workout.targetMuscles.map((muscle) => (
                    <Badge key={muscle} variant="default" size="sm">
                      {muscle}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <span className="text-[var(--text-tertiary)]">Süre:</span>
                    <span className="font-medium">~{workout.estimatedDuration} dk</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[var(--text-tertiary)]">Hareket:</span>
                    <span className="font-medium">{totalExercises}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[var(--text-tertiary)]">Bölüm:</span>
                    <span className="font-medium">{workout.sections.length}</span>
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
