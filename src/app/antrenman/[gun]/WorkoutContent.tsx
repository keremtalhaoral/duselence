'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { workoutDays, type Exercise } from '@/data/workouts';
import { useProgressStore } from '@/store/useProgressStore';
import { alternatives } from '@/data/alternatives';

const fctGroupColors: Record<string, 'purple' | 'blue' | 'cyan' | 'green'> = {
  A: 'purple',
  B: 'blue',
  C: 'cyan',
  D: 'green',
};

const upperMuscles = ['göğüs', 'sırt', 'omuz', 'biceps', 'triceps', 'ön kol'];

function formatRest(seconds: number): string {
  if (seconds >= 60) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return sec > 0 ? `${min} dk ${sec} sn` : `${min} dk`;
  }
  return `${seconds} sn`;
}

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

interface SetLog {
  weight: string;
  reps: string;
  rpe: string;
  completed: boolean;
}

function WorkoutLogger({ workout }: { workout: typeof workoutDays[0] }) {
  const { addWorkout, workouts, getAutoProgressionWeight } = useProgressStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const alreadyLogged = workouts.some(w => w.date === today && w.workoutId === workout.id);

  const isUpper = workout.targetMuscles.some(m => upperMuscles.includes(m));

  const [exerciseSets, setExerciseSets] = useState<Record<string, SetLog[]>>(() => {
    const initial: Record<string, SetLog[]> = {};
    for (const ex of workout.exercises) {
      const suggestedWeight = getAutoProgressionWeight(ex.id, isUpper);
      initial[ex.id] = Array.from({ length: ex.sets }, () => ({
        weight: suggestedWeight ? suggestedWeight.toString() : '',
        reps: '',
        rpe: '',
        completed: false,
      }));
    }
    return initial;
  });
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(alreadyLogged);

  const updateSet = (exId: string, setIdx: number, field: keyof SetLog, value: string | boolean) => {
    setExerciseSets(prev => {
      const next = { ...prev };
      next[exId] = [...next[exId]];
      next[exId][setIdx] = { ...next[exId][setIdx], [field]: value };
      return next;
    });
  };

  const handleSave = () => {
    const exercises: Record<string, { sets: { weight: number; reps: number; rpe?: number; completed: boolean }[] }> = {};
    for (const [exId, sets] of Object.entries(exerciseSets)) {
      exercises[exId] = {
        sets: sets.map(s => ({
          weight: parseFloat(s.weight) || 0,
          reps: parseInt(s.reps) || 0,
          rpe: s.rpe ? parseFloat(s.rpe) : undefined,
          completed: s.completed,
        })),
      };
    }
    addWorkout({
      date: today,
      workoutId: workout.id,
      exercises,
      notes: notes || undefined,
    });
    setSaved(true);
  };

  const totalSets = Object.values(exerciseSets).flat().length;
  const completedSets = Object.values(exerciseSets).flat().filter(s => s.completed).length;

  if (saved) {
    return (
      <Card hover={false} padding="lg">
        <div className="text-center py-4">
          <p className="text-3xl mb-2">&#10003;</p>
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Antrenman Kaydedildi</h3>
          <p className="text-xs text-[var(--text-secondary)]">{today} &mdash; {workout.shortName}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card hover={false} padding="md">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold gradient-text">Antrenman Kaydi</h2>
          <Badge variant="blue">{completedSets}/{totalSets} set</Badge>
        </div>
        <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
          <div
            className="bg-accent-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalSets > 0 ? (completedSets / totalSets) * 100 : 0}%` }}
          />
        </div>
      </Card>

      {workout.exercises.map(ex => {
        const suggestedWeight = getAutoProgressionWeight(ex.id, isUpper);
        return (
          <Card key={ex.id} hover={false} padding="md">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">{ex.name}</h3>
              {suggestedWeight && (
                <Badge variant="green" size="sm">Öneri: {suggestedWeight}kg</Badge>
              )}
            </div>

            {/* Auto-progression info */}
            {suggestedWeight && (
              <p className="text-[10px] text-[var(--text-tertiary)] mb-2">
                RPE &lt; 8 + tüm setler tamam = +{isUpper ? '2.5' : '5'}kg | 2x başarısız = -%10 deload
              </p>
            )}

            {/* Header */}
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 mb-2 text-[10px] text-[var(--text-tertiary)] font-medium">
              <span className="w-6 text-center">Set</span>
              <span>Kilo(kg)</span>
              <span>Tekrar</span>
              <span>RPE</span>
              <span className="w-8 text-center">OK</span>
            </div>

            {/* Sets */}
            {(exerciseSets[ex.id] || []).map((setData, si) => (
              <div key={si} className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 mb-1.5 items-center">
                <span className="w-6 text-center text-xs text-[var(--text-tertiary)] font-medium">{si + 1}</span>
                <input
                  type="number"
                  step="2.5"
                  value={setData.weight}
                  onChange={e => updateSet(ex.id, si, 'weight', e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-card)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                  placeholder="—"
                />
                <input
                  type="number"
                  value={setData.reps}
                  onChange={e => updateSet(ex.id, si, 'reps', e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-card)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                  placeholder="—"
                />
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="10"
                  value={setData.rpe}
                  onChange={e => updateSet(ex.id, si, 'rpe', e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-card)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                  placeholder="—"
                />
                <button
                  type="button"
                  onClick={() => updateSet(ex.id, si, 'completed', !setData.completed)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    setData.completed
                      ? 'bg-accent-green text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)] border border-[var(--border-card)]'
                  }`}
                >
                  {setData.completed ? '✓' : '○'}
                </button>
              </div>
            ))}

            {/* Rest Timer */}
            <div className="mt-3">
              <RestTimer seconds={ex.restSeconds} />
            </div>
          </Card>
        );
      })}

      <Card hover={false} padding="md">
        <label className="block text-xs text-[var(--text-tertiary)] mb-1">Notlar</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 min-h-[60px] resize-none"
          placeholder="Antrenman notlari..."
        />
      </Card>

      <button
        onClick={handleSave}
        className="w-full py-3 rounded-xl bg-accent-green text-white font-semibold text-sm hover:bg-accent-green/90 transition-colors"
      >
        Antrenmanı Kaydet
      </button>
    </div>
  );
}

// ─── Pain-Based Alternatives ───
function AlternativeSuggestions({ workout }: { workout: typeof workoutDays[0] }) {
  const { weeklyReviews } = useProgressStore();
  const latestReview = weeklyReviews[weeklyReviews.length - 1];

  if (!latestReview) return null;

  // Ağrısı 3+ olan eklem alanlarını bul
  const painAreas = Object.entries(latestReview.jointPain)
    .filter(([, v]) => v >= 3)
    .map(([area]) => area);

  if (painAreas.length === 0) return null;

  // Pain area mapping (haftalık değerlendirme → alternatives.ts)
  const areaMap: Record<string, string> = {
    'Omuz eklemi': 'omuz',
    'Dirsek': 'dirsek',
    'Bilek': 'bilek',
    'Bel': 'bel',
    'Diz': 'diz',
    'Ayak bileği': 'ayak-bilegi',
  };

  const relevantAlts = painAreas.flatMap(area => {
    const mapped = areaMap[area];
    if (!mapped) return [];
    return alternatives
      .filter(a => a.painArea === mapped)
      .filter(a => workout.exercises.some(ex =>
        ex.name.toLowerCase().includes(a.originalName.toLowerCase().split(' ')[0])
      ));
  });

  if (relevantAlts.length === 0) return null;

  return (
    <Card hover={false} padding="md">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-accent-orange">Alternatif Hareket Önerileri</h3>
        <Badge variant="orange" size="sm">Ağrı algılandı</Badge>
      </div>
      <p className="text-[10px] text-[var(--text-tertiary)] mb-3">
        Son haftalık değerlendirmendeki ağrı verilerine göre öneriler:
      </p>
      <div className="space-y-2">
        {relevantAlts.map((alt, i) => (
          <div key={i} className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-accent-orange/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[var(--text-tertiary)] line-through">{alt.originalName}</span>
              <span className="text-xs font-medium text-accent-green">{alt.alternative}</span>
            </div>
            <p className="text-[10px] text-[var(--text-secondary)]">{alt.reason}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function WorkoutContent({ gun }: { gun: string }) {
  const workout = useMemo(() => workoutDays.find((w) => w.id === gun), [gun]);
  const [showLogger, setShowLogger] = useState(false);

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

      {/* Alternative suggestions based on pain */}
      <AlternativeSuggestions workout={workout} />

      {/* Toggle between view and log mode */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowLogger(false)}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
            !showLogger
              ? 'bg-accent-blue text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          Program
        </button>
        <button
          onClick={() => setShowLogger(true)}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
            showLogger
              ? 'bg-accent-green text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          Kayit Yap
        </button>
      </div>

      {showLogger ? (
        <WorkoutLogger workout={workout} />
      ) : (
        <>
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
        </>
      )}

      <div className="pt-2 pb-4">
        <Link href="/antrenman" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue hover:underline">
          <span>&larr;</span>
          <span>Tum Antrenmanlara Don</span>
        </Link>
      </div>
    </div>
  );
}
