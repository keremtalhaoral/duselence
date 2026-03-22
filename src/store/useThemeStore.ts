'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,
      toggle: () => set((s) => ({ isDark: !s.isDark })),
      setDark: (dark) => set({ isDark: dark }),
    }),
    { name: 'duselence-theme' }
  )
);
