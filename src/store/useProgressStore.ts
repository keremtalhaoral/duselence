'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProgressEntry {
  date: string;
  weight?: number;
  bodyFat?: number;
  oneRMs?: Record<string, number>;
  notes?: string;
}

export interface WorkoutCompletion {
  date: string;
  workoutId: string;
  exercises: Record<string, {
    sets: { weight: number; reps: number; rpe?: number; completed: boolean }[];
  }>;
  notes?: string;
}

export interface WeeklyReview {
  date: string;
  weekNumber: number;
  fatigue: Record<string, number>; // muscle group -> 1-5
  jointPain: Record<string, number>; // joint -> 1-5
  mindMuscle: number; // 1-5
  sleep: number; // 1-5
  stress: number; // 1-5
  notes?: string;
}

interface ProgressState {
  entries: ProgressEntry[];
  workouts: WorkoutCompletion[];
  weeklyReviews: WeeklyReview[];
  programStartDate: string;

  addEntry: (entry: ProgressEntry) => void;
  addWorkout: (workout: WorkoutCompletion) => void;
  addWeeklyReview: (review: WeeklyReview) => void;
  setProgramStartDate: (date: string) => void;
  getLatestEntry: () => ProgressEntry | undefined;
  getLatestOneRM: (exercise: string) => number | undefined;
  getAutoProgressionWeight: (exerciseId: string, isUpperBody: boolean) => number | null;
  exportData: () => string;
  importData: (json: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      entries: [],
      workouts: [],
      weeklyReviews: [],
      programStartDate: '2026-03-23', // next Monday

      addEntry: (entry) => set((s) => ({ entries: [...s.entries, entry] })),
      addWorkout: (workout) => set((s) => ({ workouts: [...s.workouts, workout] })),
      addWeeklyReview: (review) => set((s) => ({ weeklyReviews: [...s.weeklyReviews, review] })),
      setProgramStartDate: (date) => set({ programStartDate: date }),

      getLatestEntry: () => {
        const entries = get().entries;
        return entries.length > 0 ? entries[entries.length - 1] : undefined;
      },

      getLatestOneRM: (exercise: string) => {
        const entries = get().entries;
        for (let i = entries.length - 1; i >= 0; i--) {
          if (entries[i].oneRMs?.[exercise]) return entries[i].oneRMs![exercise];
        }
        return undefined;
      },

      // Auto-progression: RPE bazlı ağırlık önerisi
      getAutoProgressionWeight: (exerciseId: string, isUpperBody: boolean) => {
        const workouts = get().workouts;
        // Son 2 antrenmanı bul
        const relevant = workouts
          .filter(w => w.exercises[exerciseId])
          .slice(-2);

        if (relevant.length === 0) return null;

        const latest = relevant[relevant.length - 1];
        const latestSets = latest.exercises[exerciseId].sets;
        const completedSets = latestSets.filter(s => s.completed);

        if (completedSets.length === 0) return null;

        const avgWeight = completedSets.reduce((sum, s) => sum + s.weight, 0) / completedSets.length;
        const avgRPE = completedSets.reduce((sum, s) => sum + (s.rpe || 7), 0) / completedSets.length;
        const allCompleted = latestSets.every(s => s.completed);

        // RPE < 8 ve tüm setler tamamlandıysa → ağırlık artır
        if (allCompleted && avgRPE < 8) {
          return avgWeight + (isUpperBody ? 2.5 : 5);
        }

        // 2 ardışık başarısız → deload (%10 düşür)
        if (relevant.length >= 2) {
          const prev = relevant[relevant.length - 2];
          const prevSets = prev.exercises[exerciseId]?.sets || [];
          const prevAllCompleted = prevSets.every(s => s.completed);
          if (!allCompleted && !prevAllCompleted) {
            return Math.round((avgWeight * 0.9) / 2.5) * 2.5;
          }
        }

        // Başarısız ama tek sefer → aynı ağırlık
        return avgWeight;
      },

      exportData: () => {
        const { entries, workouts, weeklyReviews, programStartDate } = get();
        return JSON.stringify({ entries, workouts, weeklyReviews, programStartDate }, null, 2);
      },

      importData: (json: string) => {
        try {
          const data = JSON.parse(json);
          if (data.entries && data.workouts && data.weeklyReviews) {
            set({
              entries: data.entries,
              workouts: data.workouts,
              weeklyReviews: data.weeklyReviews,
              programStartDate: data.programStartDate || get().programStartDate,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    { name: 'duselence-progress' }
  )
);
