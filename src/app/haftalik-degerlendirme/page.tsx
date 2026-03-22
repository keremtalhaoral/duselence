'use client';

import { useState, useMemo } from 'react';
import { format, differenceInWeeks } from 'date-fns';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore } from '@/store/useProgressStore';

const muscleGroups = ['Göğüs', 'Sırt', 'Omuz', 'Biceps', 'Triceps', 'Quadriceps', 'Hamstring', 'Kalça', 'Core'];
const joints = ['Omuz eklemi', 'Dirsek', 'Bilek', 'Bel', 'Diz', 'Ayak bileği'];

function RatingSelector({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-[var(--text-secondary)] flex-1">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
              n <= value
                ? n <= 2
                  ? 'bg-accent-green text-white'
                  : n <= 3
                  ? 'bg-accent-orange text-white'
                  : 'bg-accent-red text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HaftalikDegerlendirmePage() {
  const { programStartDate, addWeeklyReview, weeklyReviews } = useProgressStore();

  const currentWeek = useMemo(() => {
    const start = new Date(programStartDate);
    return Math.max(1, differenceInWeeks(new Date(), start) + 1);
  }, [programStartDate]);

  const [fatigue, setFatigue] = useState<Record<string, number>>({});
  const [jointPain, setJointPain] = useState<Record<string, number>>({});
  const [mindMuscle, setMindMuscle] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [stress, setStress] = useState(3);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWeeklyReview({
      date: format(new Date(), 'yyyy-MM-dd'),
      weekNumber: currentWeek,
      fatigue,
      jointPain,
      mindMuscle,
      sleep,
      stress,
      notes: notes || undefined,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <Card hover={false} padding="lg">
          <div className="text-center py-8">
            <p className="text-4xl mb-4">OK</p>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Değerlendirme Kaydedildi</h2>
            <p className="text-sm text-[var(--text-secondary)]">Hafta {currentWeek} değerlendirmen kaydedildi.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold gradient-text">Haftalık Değerlendirme</h1>
        <Badge variant="blue" size="md">Hafta {currentWeek}</Badge>
      </div>

      <p className="text-sm text-[var(--text-secondary)]">
        1 = Sorun yok, 5 = Çok kötü. Dürüst ol — veriler progresyonu etkiler.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Muscle Fatigue */}
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Kas Yorgunluğu</h2>
          <div className="space-y-1">
            {muscleGroups.map(mg => (
              <RatingSelector
                key={mg}
                label={mg}
                value={fatigue[mg] || 0}
                onChange={v => setFatigue(p => ({ ...p, [mg]: v }))}
              />
            ))}
          </div>
        </Card>

        {/* Joint Pain */}
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Eklem Ağrısı</h2>
          <div className="space-y-1">
            {joints.map(j => (
              <RatingSelector
                key={j}
                label={j}
                value={jointPain[j] || 0}
                onChange={v => setJointPain(p => ({ ...p, [j]: v }))}
              />
            ))}
          </div>
        </Card>

        {/* General ratings */}
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Genel Durum</h2>
          <div className="space-y-1">
            <RatingSelector label="Kas-zihin bağlantısı" value={mindMuscle} onChange={setMindMuscle} />
            <RatingSelector label="Uyku kalitesi" value={sleep} onChange={setSleep} />
            <RatingSelector label="Stres seviyesi" value={stress} onChange={setStress} />
          </div>
        </Card>

        {/* Notes */}
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Notlar</h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 min-h-[80px] resize-none"
            placeholder="Bu haftanın genel değerlendirmesi, ağrılar, değişiklikler..."
          />
        </Card>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-accent-blue text-white font-semibold text-sm hover:bg-accent-blue/90 transition-colors"
        >
          Değerlendirmeyi Kaydet
        </button>
      </form>

      {/* Previous reviews */}
      {weeklyReviews.length > 0 && (
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Önceki Değerlendirmeler</h2>
          <div className="space-y-2">
            {weeklyReviews.slice().reverse().map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border-card)] last:border-0">
                <span className="text-xs text-[var(--text-tertiary)]">Hafta {r.weekNumber} — {r.date}</span>
                <div className="flex gap-1">
                  <Badge variant={r.sleep <= 2 ? 'green' : r.sleep <= 3 ? 'orange' : 'red'}>
                    Uyku: {r.sleep}/5
                  </Badge>
                  <Badge variant={r.stress <= 2 ? 'green' : r.stress <= 3 ? 'orange' : 'red'}>
                    Stres: {r.stress}/5
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
