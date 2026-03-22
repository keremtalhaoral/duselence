'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgressStore } from '@/store/useProgressStore';
import { userProfile } from '@/data/user';

const keyLifts = [
  { id: 'bench-press', name: 'Bench Press' },
  { id: 'back-squat', name: 'Back Squat' },
  { id: 'deadlift', name: 'Deadlift' },
  { id: 'overhead-press', name: 'Overhead Press' },
  { id: 'barbell-row', name: 'Barbell Row' },
];

export default function IlerlemePage() {
  const { entries, addEntry, getLatestEntry } = useProgressStore();
  const latest = getLatestEntry();

  const [formData, setFormData] = useState({
    weight: '',
    bodyFat: '',
    notes: '',
    oneRMs: {} as Record<string, string>,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const oneRMs: Record<string, number> = {};
    for (const [key, val] of Object.entries(formData.oneRMs)) {
      if (val) oneRMs[key] = parseFloat(val);
    }
    addEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      bodyFat: formData.bodyFat ? parseFloat(formData.bodyFat) : undefined,
      oneRMs: Object.keys(oneRMs).length > 0 ? oneRMs : undefined,
      notes: formData.notes || undefined,
    });
    setFormData({ weight: '', bodyFat: '', notes: '', oneRMs: {} });
  };

  const weightProgress = latest?.weight
    ? ((latest.weight - userProfile.currentWeight) / (userProfile.targetWeight - userProfile.currentWeight)) * 100
    : 0;

  const bfProgress = latest?.bodyFat
    ? ((userProfile.currentBodyFat - latest.bodyFat) / (userProfile.currentBodyFat - userProfile.targetBodyFat)) * 100
    : 0;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold gradient-text">İlerleme Takibi</h1>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card hover={false} padding="md">
          <p className="text-xs text-[var(--text-tertiary)] mb-1">Kilo</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {latest?.weight ?? userProfile.currentWeight}<span className="text-sm text-[var(--text-secondary)]">kg</span>
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Hedef: {userProfile.targetWeight}kg</p>
          <div className="mt-2">
            <ProgressBar value={Math.max(0, weightProgress)} color="bg-accent-blue" height="sm" />
          </div>
        </Card>
        <Card hover={false} padding="md">
          <p className="text-xs text-[var(--text-tertiary)] mb-1">Yağ Oranı</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            %{latest?.bodyFat ?? userProfile.currentBodyFat}
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Hedef: %{userProfile.targetBodyFat}</p>
          <div className="mt-2">
            <ProgressBar value={Math.max(0, bfProgress)} color="bg-accent-green" height="sm" />
          </div>
        </Card>
      </div>

      {/* 1RM Records */}
      <Card hover={false} padding="md">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">1RM Kayıtları</h2>
        <div className="space-y-2">
          {keyLifts.map(lift => {
            const latestRM = entries
              .slice()
              .reverse()
              .find(e => e.oneRMs?.[lift.id])?.oneRMs?.[lift.id];
            return (
              <div key={lift.id} className="flex items-center justify-between py-1.5 border-b border-[var(--border-card)] last:border-0">
                <span className="text-sm text-[var(--text-secondary)]">{lift.name}</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {latestRM ? `${latestRM}kg` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Add Entry Form */}
      <Card hover={false} padding="lg">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Yeni Kayıt Ekle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[var(--text-tertiary)] mb-1">Kilo (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={e => setFormData(p => ({ ...p, weight: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                placeholder="75.0"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-tertiary)] mb-1">Yağ Oranı (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.bodyFat}
                onChange={e => setFormData(p => ({ ...p, bodyFat: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                placeholder="17.0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--text-tertiary)] mb-2">1RM Değerleri (kg)</label>
            <div className="grid grid-cols-2 gap-2">
              {keyLifts.map(lift => (
                <div key={lift.id} className="flex items-center gap-2">
                  <span className="text-xs text-[var(--text-secondary)] w-24 shrink-0">{lift.name}</span>
                  <input
                    type="number"
                    step="2.5"
                    value={formData.oneRMs[lift.id] || ''}
                    onChange={e => setFormData(p => ({ ...p, oneRMs: { ...p.oneRMs, [lift.id]: e.target.value } }))}
                    className="w-full px-2 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                    placeholder="—"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--text-tertiary)] mb-1">Notlar</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 min-h-[60px] resize-none"
              placeholder="Bugünkü notlar..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-accent-blue text-white font-semibold text-sm hover:bg-accent-blue/90 transition-colors"
          >
            Kaydet
          </button>
        </form>
      </Card>

      {/* History */}
      {entries.length > 0 && (
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Geçmiş Kayıtlar</h2>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {entries.slice().reverse().map((entry, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border-card)] last:border-0">
                <span className="text-xs text-[var(--text-tertiary)]">{entry.date}</span>
                <div className="flex gap-3">
                  {entry.weight && <Badge variant="blue">{entry.weight}kg</Badge>}
                  {entry.bodyFat && <Badge variant="green">%{entry.bodyFat}</Badge>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
