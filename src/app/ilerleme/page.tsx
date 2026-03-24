'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { TrendingUp, Scale, Percent, Save } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgressStore } from '@/store/useProgressStore';
import { userProfile } from '@/data/user';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const keyLifts = [
  { id: 'bench-press', name: 'Bench Press' },
  { id: 'back-squat', name: 'Back Squat' },
  { id: 'deadlift', name: 'Deadlift' },
  { id: 'overhead-press', name: 'Overhead Press' },
  { id: 'barbell-row', name: 'Barbell Row' },
];

const liftColors: Record<string, string> = {
  'bench-press': '#2563eb',
  'back-squat': '#16a34a',
  'deadlift': '#b52b32',
  'overhead-press': '#7c3aed',
  'barbell-row': '#d97706',
};

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

  const bodyChartData = useMemo(() => {
    return entries
      .filter(e => e.weight || e.bodyFat)
      .map(e => ({
        date: e.date.slice(5),
        kilo: e.weight ?? null,
        yag: e.bodyFat ?? null,
      }));
  }, [entries]);

  const strengthChartData = useMemo(() => {
    return entries
      .filter(e => e.oneRMs && Object.keys(e.oneRMs).length > 0)
      .map(e => ({
        date: e.date.slice(5),
        ...e.oneRMs,
      }));
  }, [entries]);

  const tooltipStyle = {
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold gradient-text">İlerleme Takibi</h1>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card hover={false} padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Scale size={14} className="text-blue-500" />
            <p className="text-xs text-[var(--text-tertiary)]">Kilo</p>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {latest?.weight ?? userProfile.currentWeight}<span className="text-sm text-[var(--text-secondary)] ml-0.5">kg</span>
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Hedef: {userProfile.targetWeight}kg</p>
          <div className="mt-2">
            <ProgressBar value={Math.max(0, weightProgress)} color="bg-blue-500" height="sm" />
          </div>
        </Card>
        <Card hover={false} padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Percent size={14} className="text-emerald-500" />
            <p className="text-xs text-[var(--text-tertiary)]">Yağ Oranı</p>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            %{latest?.bodyFat ?? userProfile.currentBodyFat}
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Hedef: %{userProfile.targetBodyFat}</p>
          <div className="mt-2">
            <ProgressBar value={Math.max(0, bfProgress)} color="bg-emerald-500" height="sm" />
          </div>
        </Card>
      </div>

      {/* Body Composition Chart */}
      {bodyChartData.length >= 2 && (
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Vücut Kompozisyonu Trendi</h2>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bodyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis yAxisId="weight" tick={{ fontSize: 10, fill: '#94A3B8' }} domain={['dataMin - 1', 'dataMax + 1']} />
                <YAxis yAxisId="bf" orientation="right" tick={{ fontSize: 10, fill: '#94A3B8' }} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#0F172A' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line yAxisId="weight" type="monotone" dataKey="kilo" name="Kilo (kg)" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} connectNulls />
                <Line yAxisId="bf" type="monotone" dataKey="yag" name="Yağ (%)" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Strength Chart */}
      {strengthChartData.length >= 2 && (
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">1RM Güç Trendi</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={strengthChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#0F172A' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                {keyLifts.map(lift => (
                  <Line
                    key={lift.id}
                    type="monotone"
                    dataKey={lift.id}
                    name={lift.name}
                    stroke={liftColors[lift.id]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

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
              <div key={lift.id} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: liftColors[lift.id] }} />
                  <span className="text-sm text-[var(--text-secondary)]">{lift.name}</span>
                </div>
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
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
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
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
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
                    className="w-full px-2 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
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
              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[60px] resize-none transition-shadow"
              placeholder="Bugünkü notlar..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors duration-200 active:scale-[0.98]"
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
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-xs text-[var(--text-tertiary)]">{entry.date}</span>
                <div className="flex gap-2">
                  {entry.weight && <Badge variant="blue">{entry.weight}kg</Badge>}
                  {entry.bodyFat && <Badge variant="green">%{entry.bodyFat}</Badge>}
                  {entry.oneRMs && Object.keys(entry.oneRMs).length > 0 && (
                    <Badge variant="purple">{Object.keys(entry.oneRMs).length} 1RM</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
