'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SupplementState {
  taken: Record<string, Record<string, boolean>>; // date -> supplementId -> taken
  markTaken: (date: string, supplementId: string) => void;
  markUntaken: (date: string, supplementId: string) => void;
  isTaken: (date: string, supplementId: string) => boolean;
  getDayProgress: (date: string, totalCount: number) => number;
}

export const useSupplementStore = create<SupplementState>()(
  persist(
    (set, get) => ({
      taken: {},

      markTaken: (date, supplementId) =>
        set((s) => ({
          taken: {
            ...s.taken,
            [date]: { ...s.taken[date], [supplementId]: true },
          },
        })),

      markUntaken: (date, supplementId) =>
        set((s) => ({
          taken: {
            ...s.taken,
            [date]: { ...s.taken[date], [supplementId]: false },
          },
        })),

      isTaken: (date, supplementId) => get().taken[date]?.[supplementId] ?? false,

      getDayProgress: (date, totalCount) => {
        const day = get().taken[date];
        if (!day) return 0;
        const takenCount = Object.values(day).filter(Boolean).length;
        return totalCount > 0 ? (takenCount / totalCount) * 100 : 0;
      },
    }),
    { name: 'duselence-supplements' }
  )
);
