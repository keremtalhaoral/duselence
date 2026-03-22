'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { workoutDays, type Exercise } from '@/data/workouts';

const fctGroupColors: Record<string, 'purple' | 'blue' | 'cyan' | 'green'> = {
  A: 'purple',
  B: 'blue',
  C: 'cyan',
  D: 'green',
};

function formatRest(seconds: number): string {
  if (seconds >= 60) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return sec > 0 ? `${min} dk ${sec} sn` : `${min} dk`;
  }
  return `${seconds} sn`;
}

function ExerciseCard({ exercise, showFCTLabel }: { exercise: Exercise; showFCTLabel: boolean }) {
  return (
    <Card padding="md" hover={false} className="relative">
      {showFCTLabel && exercise.fctGroup && (
        <div className="absolute -top-2 -left-1">
          <Badge variant={fctGroupColors[exercise.fctGroup]} size="md">
            {exercise.fctGroup}
          </Badge>
        </div>
      )}
      <div className={showFCTLabel && exercise.fctGroup ? 'mt-2' : ''}>
        <h3 className="font-semibold text-sm mb-2">{exercise.name}</h3>
        <div className="flex items-center gap-3 mb-2 text-xs">
          <span className="font-medium text-[var(--text-primary)]">
            {exercise.sets} x {exercise.reps}
          </span>
          <span className="text-[var(--text-tertiary)]">|</span>
          <span className="text-[var(--text-secondary)]">
            Dinlenme: {formatRest(exercise.restSeconds)}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {exercise.muscleGroups.map((muscle) => (
            <Badge key={muscle} variant="default" size="sm">{muscle}</Badge>
          ))}
        </div>
        {exercise.explanation && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{exercise.explanation}</p>
        )}
      </div>
    </Card>
  );
}

export function WorkoutContent({ gun }: { gun: string }) {
  const workout = useMemo(() => workoutDays.find((w) => w.id === gun), [gun]);

  if (!workout) {
    return (
      <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto">
        <p className="text-[var(--text-secondary)]">Antrenman bulunamadi.</p>
        <Link href="/antrenman" className="inline-block mt-4 text-sm font-medium text-accent-blue hover:underline">
          Geri Don
        </Link>
      </div>
    );
  }

  const isFCT = workout.type === 'fct';
  const fctExercises = workout.exercises.filter((e) => e.fctGroup);
  const afterExercises = workout.exercises.filter((e) => !e.fctGroup);

  return (
    <div className="px-4 py-6 md:px-8 max-w-3xl mx-auto space-y-5">
      <Link href="/antrenman" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
        <span>&larr;</span>
        <span>Antrenman Programi</span>
      </Link>

      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl font-bold gradient-text">{workout.name}</h1>
          <Badge variant={isFCT ? 'purple' : 'orange'} size="md">{isFCT ? 'FCT' : 'Heavy'}</Badge>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <span>~{workout.estimatedDuration} dk</span>
          <span className="text-[var(--text-tertiary)]">&middot;</span>
          <span>{workout.exercises.length} hareket</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {workout.targetMuscles.map((muscle) => (
            <Badge key={muscle} variant="default" size="sm">{muscle}</Badge>
          ))}
        </div>
      </div>

      <Accordion title="Isinma" icon="*" defaultOpen>
        <p>{workout.warmup}</p>
      </Accordion>

      {isFCT && fctExercises.length > 0 && (
        <div className="space-y-3">
          <div>
            <h2 className="font-semibold text-sm gradient-text mb-1">FCT Devresi</h2>
            <Card hover={false} padding="sm">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                <span className="font-semibold text-[var(--text-primary)]">Devre Yapisi:</span>{' '}
                A &rarr; 15 sn &rarr; B &rarr; 15 sn &rarr; C &rarr; 15 sn &rarr; D &rarr; 3 dk dinlenme
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Toplam <span className="font-semibold">4 tur</span> tekrarla
              </p>
            </Card>
          </div>
          <div className="space-y-3">
            {fctExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} showFCTLabel />
            ))}
          </div>
        </div>
      )}

      {isFCT && afterExercises.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold text-sm gradient-text">Devre Sonrasi Hareketler</h2>
          {afterExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} showFCTLabel={false} />
          ))}
        </div>
      )}

      {!isFCT && (
        <div className="space-y-3">
          <h2 className="font-semibold text-sm gradient-text">Hareketler</h2>
          {workout.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} showFCTLabel={false} />
          ))}
        </div>
      )}

      <Accordion title="Soguma" icon="*">
        <p>{workout.cooldown}</p>
      </Accordion>

      <div className="pt-2 pb-4">
        <Link href="/antrenman" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:underline">
          <span>&larr;</span>
          <span>Tum Antrenmanlara Don</span>
        </Link>
      </div>
    </div>
  );
}
