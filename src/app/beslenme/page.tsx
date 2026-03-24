'use client';

import { useState, useMemo } from 'react';
import { Flame, Dumbbell, Heart, UtensilsCrossed } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Accordion } from '@/components/ui/Accordion';
import { meals, macroTargets, shakeRecipes, type Meal } from '@/data/nutrition';

type DayType = 'antrenman' | 'toparlanma';

const dayTypeConfig = {
  antrenman: { label: 'Antrenman Günü', badge: 'red' as const, mealIds: ['sabah-yakiti', 'post-workout', 'ogle', 'aksam', 'gece-atistirmasi'] },
  toparlanma: { label: 'Toparlanma Günü', badge: 'green' as const, mealIds: ['sabah-yakiti', 'ogle', 'aksam', 'gece-atistirmasi'] },
};

function MacroBar({ label, current, color }: { label: string; current: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-[var(--text-secondary)]">{label}</span>
        <span className="text-xs font-semibold text-[var(--text-primary)]">{current}g</span>
      </div>
      <ProgressBar value={Math.min(100, current)} color={color} height="sm" />
    </div>
  );
}

function MealCard({ meal }: { meal: Meal }) {
  return (
    <Card hover={false} padding="md">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">{meal.name}</h3>
            {meal.isShake && <Badge variant="cyan" size="sm">shake</Badge>}
          </div>
          <span className="text-xs text-[var(--text-tertiary)]">{meal.time}</span>
        </div>
        {meal.macros && (
          <div className="text-right">
            <span className="text-xs font-semibold text-[var(--text-primary)]">
              {meal.macros.protein * 4 + meal.macros.carbs * 4 + meal.macros.fat * 9} kcal
            </span>
          </div>
        )}
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">{meal.description}</p>
      {meal.macros && (
        <div className="flex gap-2 text-[10px]">
          <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-medium">P: {meal.macros.protein}g</span>
          <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 font-medium">K: {meal.macros.carbs}g</span>
          <span className="px-2 py-0.5 rounded-lg bg-violet-50 text-violet-700 font-medium">Y: {meal.macros.fat}g</span>
        </div>
      )}
    </Card>
  );
}

export default function BeslenmePage() {
  const [dayType, setDayType] = useState<DayType>('antrenman');

  const config = dayTypeConfig[dayType];
  const filteredMeals = useMemo(() => {
    return meals.filter(m => config.mealIds.includes(m.id));
  }, [config.mealIds]);

  const totals = useMemo(() => {
    return filteredMeals.reduce(
      (acc, m) => ({
        protein: acc.protein + (m.macros?.protein || 0),
        carbs: acc.carbs + (m.macros?.carbs || 0),
        fat: acc.fat + (m.macros?.fat || 0),
        calories: acc.calories + (m.macros ? m.macros.protein * 4 + m.macros.carbs * 4 + m.macros.fat * 9 : 0),
      }),
      { protein: 0, carbs: 0, fat: 0, calories: 0 }
    );
  }, [filteredMeals]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold gradient-text">Beslenme Planı</h1>

      {/* Day type toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setDayType('antrenman')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
            dayType === 'antrenman'
              ? 'bg-primary text-white shadow-[var(--shadow-md)]'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
          }`}
        >
          Antrenman Günü
        </button>
        <button
          onClick={() => setDayType('toparlanma')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
            dayType === 'toparlanma'
              ? 'bg-emerald-500 text-white shadow-[var(--shadow-md)]'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
          }`}
        >
          Toparlanma Günü
        </button>
      </div>

      {/* Macro targets */}
      <Card hover={false} padding="md">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-1">Makro Hedefler</h2>
        <p className="text-xs text-[var(--text-secondary)] mb-3">{macroTargets.note}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Kalori</span>
            <span className="font-medium text-[var(--text-primary)]">{macroTargets.calories}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Protein</span>
            <span className="font-medium text-[var(--text-primary)]">{macroTargets.protein}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Karbonhidrat</span>
            <span className="font-medium text-[var(--text-primary)]">{macroTargets.carbs}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Yağ</span>
            <span className="font-medium text-[var(--text-primary)]">{macroTargets.fat}</span>
          </div>
        </div>
      </Card>

      {/* Daily summary */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Günlük Toplam</h2>
          <Badge variant={config.badge} size="sm">{config.label}</Badge>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-3 text-center">
          <div>
            <p className="text-lg font-bold text-[var(--text-primary)]">{totals.calories}</p>
            <p className="text-[10px] text-[var(--text-tertiary)]">kcal</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-600">{totals.protein}g</p>
            <p className="text-[10px] text-[var(--text-tertiary)]">protein</p>
          </div>
          <div>
            <p className="text-lg font-bold text-amber-600">{totals.carbs}g</p>
            <p className="text-[10px] text-[var(--text-tertiary)]">karb</p>
          </div>
          <div>
            <p className="text-lg font-bold text-violet-600">{totals.fat}g</p>
            <p className="text-[10px] text-[var(--text-tertiary)]">yağ</p>
          </div>
        </div>
        <div className="space-y-2">
          <MacroBar label="Protein" current={totals.protein} color="bg-blue-500" />
          <MacroBar label="Karbonhidrat" current={totals.carbs} color="bg-amber-500" />
          <MacroBar label="Yağ" current={totals.fat} color="bg-violet-500" />
        </div>
      </Card>

      {/* Meals */}
      <div>
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3 px-1">Öğünler</h2>
        <div className="space-y-3">
          {filteredMeals
            .sort((a, b) => a.time.localeCompare(b.time))
            .map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
        </div>
      </div>

      {/* Shake Recipes */}
      <div>
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3 px-1">Shake Tarifleri</h2>
        <div className="space-y-2">
          {shakeRecipes.map(shake => (
            <Accordion key={shake.id} title={`${shake.name}`} defaultOpen={false}>
              <div className="space-y-2">
                <p className="text-xs text-blue-600 font-medium">{shake.timing}</p>
                <ul className="space-y-1">
                  {shake.ingredients.map((ing, i) => (
                    <li key={i} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" />
                      {ing}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 text-[10px] mt-2">
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-medium">P: {shake.macros.protein}g</span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 font-medium">K: {shake.macros.carbs}g</span>
                  <span className="px-2 py-0.5 rounded-lg bg-violet-50 text-violet-700 font-medium">Y: {shake.macros.fat}g</span>
                  <span className="px-2 py-0.5 rounded-lg bg-gray-50 text-[var(--text-primary)] font-medium">{shake.macros.calories} kcal</span>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
