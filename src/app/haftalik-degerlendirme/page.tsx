'use client';

import { useState, useMemo } from 'react';
import { format, differenceInWeeks } from 'date-fns';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore, type WeeklyReview } from '@/store/useProgressStore';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';

const muscleGroups = ['Göğüs', 'Sırt', 'Omuz', 'Biceps', 'Triceps', 'Quadriceps', 'Hamstring', 'Kalça', 'Core'];
const joints = ['Omuz eklemi', 'Dirsek', 'Bilek', 'Bel', 'Diz', 'Ayak bileği'];

const tooltipStyle = {
  backgroundColor: '#fff',
  border: 'none',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

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
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-110 active:scale-90 ${
              n <= value
                ? n <= 2
                  ? 'bg-emerald-500 text-white'
                  : n <= 3
                  ? 'bg-amber-500 text-white'
                  : 'bg-primary text-white'
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

function ReviewAnalytics({ reviews }: { reviews: WeeklyReview[] }) {
  const trendData = useMemo(() => {
    return reviews.map(r => ({
      week: `H${r.weekNumber}`,
      uyku: r.sleep,
      stres: r.stress,
      kasZihin: r.mindMuscle,
    }));
  }, [reviews]);

  const latestReview = reviews[reviews.length - 1];

  const radarData = useMemo(() => {
    if (!latestReview) return [];
    return muscleGroups.map(mg => ({
      kas: mg,
      yorgunluk: latestReview.fatigue[mg] || 0,
    }));
  }, [latestReview]);

  const jointTrendData = useMemo(() => {
    return reviews.map(r => {
      const entry: Record<string, string | number> = { week: `H${r.weekNumber}` };
      for (const j of joints) {
        entry[j] = r.jointPain[j] || 0;
      }
      return entry;
    });
  }, [reviews]);

  if (reviews.length < 2) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold gradient-text">Trend Analizi</h2>

      {/* Sleep / Stress / Mind-Muscle Trend */}
      <Card hover={false} padding="md">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Uyku / Stres / Kas-Zihin Trendi</h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#0F172A' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="uyku" name="Uyku" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="stres" name="Stres" stroke="#b52b32" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="kasZihin" name="Kas-Zihin" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Muscle Fatigue Radar */}
      {radarData.length > 0 && (
        <Card hover={false} padding="md">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Kas Yorgunluğu Haritası (Son Hafta)</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="kas" tick={{ fontSize: 9, fill: '#475569' }} />
                <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 8, fill: '#94A3B8' }} />
                <Radar name="Yorgunluk" dataKey="yorgunluk" stroke="#b52b32" fill="#b52b32" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Joint Pain Trend */}
      {jointTrendData.length >= 2 && (
        <Card hover={false} padding="md">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Eklem Ağrısı Trendi</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jointTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#0F172A' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="Omuz eklemi" name="Omuz" stroke="#b52b32" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Dirsek" name="Dirsek" stroke="#d97706" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Bilek" name="Bilek" stroke="#ca8a04" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Bel" name="Bel" stroke="#7c3aed" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Diz" name="Diz" stroke="#2563eb" strokeWidth={1.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Ayak bileği" name="Ayak bileği" stroke="#0891b2" strokeWidth={1.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
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
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Card hover={false} padding="lg">
          <div className="text-center py-8">
            <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Değerlendirme Kaydedildi</h2>
            <p className="text-sm text-[var(--text-secondary)]">Hafta {currentWeek} değerlendirmen kaydedildi.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-200 active:scale-[0.98]"
            >
              <RotateCcw size={14} />
              Geri Dön
            </button>
          </div>
        </Card>
        <ReviewAnalytics reviews={weeklyReviews} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Haftalık Değerlendirme</h1>
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
            className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px] resize-none transition-shadow"
            placeholder="Bu haftanın genel değerlendirmesi, ağrılar, değişiklikler..."
          />
        </Card>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors duration-200 active:scale-[0.98]"
        >
          Değerlendirmeyi Kaydet
        </button>
      </form>

      {/* Analytics */}
      <ReviewAnalytics reviews={weeklyReviews} />

      {/* Previous reviews */}
      {weeklyReviews.length > 0 && (
        <Card hover={false} padding="md">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Önceki Değerlendirmeler</h2>
          <div className="space-y-2">
            {weeklyReviews.slice().reverse().map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2">
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
