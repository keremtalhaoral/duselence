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
    }),
    { name: 'duselence-progress' }
  )
);
