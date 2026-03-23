'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { workoutDays, type Exercise, type WorkoutSection, type WorkoutDay } from '@/data/workouts';

const labelColors: Record<string, 'purple' | 'blue' | 'cyan' | 'green' | 'orange' | 'red' | 'default'> = {
  A: 'purple',
  B: 'blue',
  C: 'cyan',
  D: 'green',
  S1a: 'orange',
  S1b: 'orange',
  S2a: 'red',
  S2b: 'red',
  S3a: 'purple',
  S3b: 'purple',
};

// ─── Rest Timer ───
function RestTimer({ seconds, onComplete }: { seconds: number; onComplete?: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setRemaining(seconds);
    setRunning(true);
  }, [seconds]);

  const stop = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          stop();
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, stop, onComplete]);

  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  const progress = seconds > 0 ? ((seconds - remaining) / seconds) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={running ? stop : start}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          running
            ? 'bg-accent-red text-white'
            : remaining === 0
            ? 'bg-accent-green text-white'
            : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-card)]'
        }`}
      >
        {running ? 'Durdur' : remaining === 0 ? 'Tekrar' : 'Dinlenme'}
      </button>
      {(running || remaining < seconds) && (
        <div className="flex items-center gap-2 flex-1">
          <div className="flex-1 bg-[var(--bg-secondary)] rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 ${remaining === 0 ? 'bg-accent-green' : 'bg-accent-blue'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={`text-xs font-mono font-bold ${remaining <= 10 && running ? 'text-accent-red' : 'text-[var(--text-primary)]'}`}>
            {min}:{sec.toString().padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}

function ExerciseRow({ exercise }: { exercise: Exercise }) {
  const color = exercise.label ? (labelColors[exercise.label] || 'default') : 'default';
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] ${exercise.isNew ? 'ring-1 ring-accent-cyan/40' : ''}`}>
      {exercise.label && (
        <div className="shrink-0 mt-0.5">
          <Badge variant={color} size="md">{exercise.label}</Badge>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className={`text-sm font-semibold ${exercise.isNew ? 'text-accent-cyan' : 'text-[var(--text-primary)]'}`}>
            {exercise.name}
          </h4>
          {exercise.isNew && <Badge variant="cyan" size="sm">YENİ</Badge>}
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs">
          <span className="font-mono font-medium text-[var(--text-primary)]">{exercise.load}</span>
        </div>
        {exercise.notes && (
          <p className="text-[11px] text-[var(--text-tertiary)] mt-1">{exercise.notes}</p>
        )}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {exercise.muscleGroups.map((mg) => (
            <Badge key={mg} variant="default" size="sm">{mg}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionView({ section }: { section: WorkoutSection }) {
  const isContrast = section.name.toLowerCase().includes('kontrast');
  const isSuperset = section.name.toLowerCase().includes('superset');

  return (
    <div className="space-y-2">
      <div className={`p-3 rounded-xl border ${isContrast ? 'border-accent-purple/30 bg-accent-purple/5' : isSuperset ? 'border-accent-orange/30 bg-accent-orange/5' : 'border-[var(--border-card)]'}`}>
        <h3 className={`text-sm font-bold ${isContrast ? 'text-accent-purple' : isSuperset ? 'text-accent-orange' : 'gradient-text'}`}>
          {section.name}
        </h3>
        {section.protocol && (
          <p className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono">{section.protocol}</p>
        )}
        {section.description && (
          <p className="text-xs text-[var(--text-tertiary)] mt-1">{section.description}</p>
        )}
      </div>

      {/* Contrast set flow visualization */}
      {isContrast && (
        <div className="flex items-center justify-center gap-1 py-1 flex-wrap">
          {section.exercises.map((ex, i) => (
            <div key={ex.id} className="flex items-center gap-1">
              <Badge variant={labelColors[ex.label || ''] || 'default'} size="sm">{ex.label}</Badge>
              {i < section.exercises.length - 1 && (
                <span className="text-[10px] text-[var(--text-tertiary)] font-mono">&rarr; 15s &rarr;</span>
              )}
            </div>
          ))}
          <span className="text-[10px] text-[var(--text-tertiary)] font-mono ml-1">&rarr; 3dk</span>
        </div>
      )}

      {/* Superset pair visualization */}
      {isSuperset && (
        <div className="flex flex-wrap gap-1 justify-center py-1">
          {['S1', 'S2', 'S3'].map((pair) => {
            const pairExs = section.exercises.filter(e => e.label?.startsWith(pair));
            if (pairExs.length === 0) return null;
            return (
              <div key={pair} className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[var(--bg-secondary)]">
                <Badge variant={labelColors[`${pair}a`] || 'default'} size="sm">{pair}a</Badge>
                <span className="text-[10px] text-[var(--text-tertiary)]">+</span>
                <Badge variant={labelColors[`${pair}b`] || 'default'} size="sm">{pair}b</Badge>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-2">
        {section.exercises.map((exercise) => (
          <ExerciseRow key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

export function WorkoutContent({ gun }: { gun: string }) {
  const workout = useMemo(() => workoutDays.find((w) => w.id === gun), [gun]);

  if (!workout) {
    return (
      <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto">
        <p className="text-[var(--text-secondary)]">Antrenman bulunamadı.</p>
        <Link href="/antrenman" className="inline-block mt-4 text-sm font-medium text-accent-blue hover:underline">
          Geri Dön
        </Link>
      </div>
    );
  }

  const isFCT = workout.type === 'fct';
  const totalExercises = workout.sections.reduce((sum, s) => sum + s.exercises.length, 0);

  return (
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto space-y-5">
      <Link href="/antrenman" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        <span>&larr;</span>
        <span>Antrenman Programı</span>
      </Link>

      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl font-bold gradient-text">{workout.name}</h1>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={isFCT ? 'purple' : 'orange'} size="md">
            {isFCT ? 'French Contrast' : 'Heavy'}
          </Badge>
          <span className="text-xs text-[var(--text-tertiary)]">
            ~{workout.estimatedDuration} dk &middot; {totalExercises} hareket
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">{workout.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {workout.targetMuscles.map((muscle) => (
            <Badge key={muscle} variant="default" size="sm">{muscle}</Badge>
          ))}
        </div>
      </div>

      {/* Isınma */}
      <Accordion title="Isınma (8-12 dk)" icon="*" defaultOpen>
        <ul className="space-y-1">
          {workout.warmup.map((item, i) => (
            <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
              <span className="text-[var(--text-tertiary)] shrink-0">&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Accordion>

      {/* Sections */}
      {workout.sections.map((section) => (
        <SectionView key={section.id} section={section} />
      ))}

      {/* Soğuma */}
      <Accordion title="Soğuma (8-10 dk)" icon="*">
        <ul className="space-y-1">
          {workout.cooldown.map((item, i) => (
            <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
              <span className="text-[var(--text-tertiary)] shrink-0">&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Accordion>

      {/* Dinlenme Timer */}
      <Card hover={false} padding="md">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
          Dinlenme Zamanlayıcı
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] text-[var(--text-tertiary)] mb-1">FCT Arası (15sn)</p>
            <RestTimer seconds={15} />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-tertiary)] mb-1">Tur Arası (3dk)</p>
            <RestTimer seconds={180} />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-tertiary)] mb-1">Set Arası (90sn)</p>
            <RestTimer seconds={90} />
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-tertiary)] mb-1">Ağır Set (2.5dk)</p>
            <RestTimer seconds={150} />
          </div>
        </div>
      </Card>

      <div className="pt-2 pb-4">
        <Link href="/antrenman" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:underline">
          <span>&larr;</span>
          <span>Tüm Antrenmanlara Dön</span>
        </Link>
      </div>
    </div>
  );
}
