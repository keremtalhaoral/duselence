'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Dumbbell, Zap, Clock, Layers, ChevronRight, Target } from 'lucide-react';
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
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Antrenman Programı</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Upper/Lower — FCT + Heavy | 4 gün/hafta
        </p>
      </div>

      {/* Periyodizasyon Fazı */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
          >
            <Target size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-sm">{phase.name}</h2>
              <Badge variant="blue" size="sm">
                Hafta {weekNumber} · Faz {weekInPhase}/{phase.weekEnd - phase.weekStart + 1}
              </Badge>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{phase.focus}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'FCT Yükü', value: phase.fctLoad },
            { label: 'Heavy Yükü', value: phase.heavyLoad },
            { label: 'RPE Hedef', value: phase.rpeTarget },
            { label: 'Aksesuar', value: phase.accessoryLoad },
          ].map((item) => (
            <div key={item.label} className="p-2.5 rounded-xl bg-[var(--bg-secondary)]">
              <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">{item.label}</span>
              <p className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Antrenman Günleri */}
      <div className="space-y-3">
        {workoutDays.map((workout) => {
          const isFCT = workout.type === 'fct';
          const totalExercises = workout.sections.reduce((sum, s) => sum + s.exercises.length, 0);

          return (
            <Link key={workout.id} href={`/antrenman/${workout.id}`}>
              <Card className="block mb-3" padding="md" hover={true}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isFCT ? 'bg-violet-50 text-violet-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {isFCT ? <Zap size={20} /> : <Dumbbell size={20} />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[var(--text-primary)] truncate">{workout.name}</h3>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{workout.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[var(--text-tertiary)] shrink-0 mt-1" />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge variant={isFCT ? 'purple' : 'orange'} size="sm">
                    {isFCT ? 'FCT' : 'Heavy'}
                  </Badge>
                  {workout.targetMuscles.map((muscle) => (
                    <Badge key={muscle} variant="default" size="sm">
                      {muscle}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-[var(--text-tertiary)]" />
                    ~{workout.estimatedDuration} dk
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Dumbbell size={12} className="text-[var(--text-tertiary)]" />
                    {totalExercises} hareket
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers size={12} className="text-[var(--text-tertiary)]" />
                    {workout.sections.length} bölüm
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
