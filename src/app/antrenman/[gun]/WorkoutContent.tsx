'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Square, RotateCcw, Timer, Dumbbell, Zap, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { workoutDays, type Exercise, type WorkoutSection } from '@/data/workouts';

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
function RestTimer({ seconds, label }: { seconds: number; label: string; onComplete?: () => void }) {
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
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, stop]);

  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  const progress = seconds > 0 ? ((seconds - remaining) / seconds) * 100 : 0;

  return (
    <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
      <p className="text-[10px] text-[var(--text-tertiary)] mb-2 font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={running ? stop : start}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
            running
              ? 'bg-primary text-white'
              : remaining === 0
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-[var(--text-secondary)] shadow-[var(--shadow-sm)]'
          }`}
        >
          {running ? <Square size={12} /> : remaining === 0 ? <RotateCcw size={12} /> : <Play size={12} />}
        </button>
        <div className="flex-1">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 ${remaining === 0 ? 'bg-emerald-500' : 'bg-primary'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className={`text-sm font-mono font-bold min-w-[40px] text-right ${remaining <= 10 && running ? 'text-primary' : 'text-[var(--text-primary)]'}`}>
          {min}:{sec.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

function ExerciseRow({ exercise }: { exercise: Exercise }) {
  const color = exercise.label ? (labelColors[exercise.label] || 'default') : 'default';
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] ${exercise.isNew ? 'ring-1 ring-cyan-300' : ''}`}>
      {exercise.label && (
        <div className="shrink-0 mt-0.5">
          <Badge variant={color} size="md">{exercise.label}</Badge>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className={`text-sm font-semibold ${exercise.isNew ? 'text-cyan-600' : 'text-[var(--text-primary)]'}`}>
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
      <Card hover={false} padding="sm" className={
        isContrast ? 'bg-violet-50/50' : isSuperset ? 'bg-amber-50/50' : ''
      }>
        <h3 className={`text-sm font-bold ${isContrast ? 'text-violet-700' : isSuperset ? 'text-amber-700' : 'gradient-text'}`}>
          {section.name}
        </h3>
        {section.protocol && (
          <p className="text-[11px] text-[var(--text-secondary)] mt-1 font-mono">{section.protocol}</p>
        )}
        {section.description && (
          <p className="text-xs text-[var(--text-tertiary)] mt-1">{section.description}</p>
        )}
      </Card>

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
      <div className="max-w-2xl mx-auto px-4 py-8">
        <p className="text-[var(--text-secondary)]">Antrenman bulunamadı.</p>
        <Link href="/antrenman" className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary hover:underline">
          <ArrowLeft size={14} />
          Geri Dön
        </Link>
      </div>
    );
  }

  const isFCT = workout.type === 'fct';
  const totalExercises = workout.sections.reduce((sum, s) => sum + s.exercises.length, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <Link href="/antrenman" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        <ArrowLeft size={14} />
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
            ~{workout.estimatedDuration} dk · {totalExercises} hareket
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
      <Accordion title="Isınma (8-12 dk)" defaultOpen>
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
      <Accordion title="Soğuma (8-10 dk)">
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
        <div className="flex items-center gap-2 mb-3">
          <Timer size={16} className="text-[var(--text-tertiary)]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
            Dinlenme Zamanlayıcı
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <RestTimer seconds={15} label="FCT Arası (15sn)" />
          <RestTimer seconds={180} label="Tur Arası (3dk)" />
          <RestTimer seconds={90} label="Set Arası (90sn)" />
          <RestTimer seconds={150} label="Ağır Set (2.5dk)" />
        </div>
      </Card>

      <div className="pt-2 pb-4">
        <Link href="/antrenman" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          <ArrowLeft size={14} />
          Tüm Antrenmanlara Dön
        </Link>
      </div>
    </div>
  );
}
