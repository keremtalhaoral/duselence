'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Accordion } from '@/components/ui/Accordion';
import { useSupplementStore } from '@/store/useSupplementStore';
import { supplements, type Supplement, type TimingSlot } from '@/data/supplements';
import { interactions } from '@/data/interactions';

const TIMING_ORDER: TimingSlot[] = [
  'sabah-aç',
  'sabah-kahvaltı',
  'öğle',
  'pre-workout',
  'post-workout',
  'akşam',
  'yatmadan-önce',
];

const TIMING_LABELS: Record<TimingSlot, string> = {
  'sabah-aç': 'Sabah (Aç Karına)',
  'sabah-kahvaltı': 'Sabah (Kahvaltı ile)',
  'öğle': 'Öğle',
  'pre-workout': 'Antrenman Öncesi',
  'post-workout': 'Antrenman Sonrası',
  'akşam': 'Akşam',
  'yatmadan-önce': 'Yatmadan Önce',
};

const TIMING_ICONS: Record<TimingSlot, string> = {
  'sabah-aç': '\u2600\uFE0F',
  'sabah-kahvaltı': '\uD83E\uDD50',
  'öğle': '\uD83C\uDF1E',
  'pre-workout': '\uD83D\uDCAA',
  'post-workout': '\u2705',
  'akşam': '\uD83C\uDF19',
  'yatmadan-önce': '\uD83D\uDE34',
};

const SEVERITY_CONFIG: Record<string, { badge: 'critical' | 'red' | 'orange' | 'blue' | 'green'; label: string }> = {
  critical: { badge: 'critical', label: 'Kritik' },
  warning: { badge: 'orange', label: 'Uyarı' },
  info: { badge: 'blue', label: 'Bilgi' },
  safe: { badge: 'green', label: 'Güvenli' },
};

const CATEGORY_BADGES: Record<string, 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'cyan'> = {
  performans: 'blue',
  'sağlık': 'green',
  toparlanma: 'cyan',
  'ilaç': 'red',
  vitamin: 'orange',
};

function getToday(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getWeeklyIndex(): number {
  // JS getDay: 0=Sun, 1=Mon ... 6=Sat
  // weeklySchedule: 0=Mon, 1=Tue ... 6=Sun
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export default function TakviyePage() {
  const today = getToday();
  const weekIdx = getWeeklyIndex();
  const { markTaken, markUntaken, isTaken, getDayProgress } = useSupplementStore();

  const todaySupplements = useMemo(
    () => supplements.filter((s) => s.weeklySchedule[weekIdx]),
    [weekIdx],
  );

  const grouped = useMemo(() => {
    const map = new Map<TimingSlot, Supplement[]>();
    for (const s of todaySupplements) {
      for (const t of s.timings) {
        if (!map.has(t)) map.set(t, []);
        map.get(t)!.push(s);
      }
    }
    return TIMING_ORDER
      .filter((t) => map.has(t))
      .map((t) => ({ timing: t, items: map.get(t)! }));
  }, [todaySupplements]);

  const totalCount = todaySupplements.length;
  const progress = getDayProgress(today, totalCount);
  const takenCount = Math.round((progress / 100) * totalCount);

  const handleToggle = (id: string) => {
    if (isTaken(today, id)) {
      markUntaken(today, id);
    } else {
      markTaken(today, id);
    }
  };

  const todayInteractions = useMemo(() => {
    const ids = new Set(todaySupplements.map((s) => s.id));
    return interactions.filter(
      (i) => ids.has(i.supplement1) && ids.has(i.supplement2),
    );
  }, [todaySupplements]);

  const supplementNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const s of supplements) {
      map[s.id] = s.name;
    }
    return map;
  }, []);

  const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const dayName = dayNames[weekIdx];

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">
          Takviye Takibi
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          {dayName} &middot; {today}
        </p>
      </div>

      {/* Progress */}
      <Card hover={false} padding="lg">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Günlük İlerleme
            </span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {takenCount} / {totalCount}
            </span>
          </div>
          <ProgressBar
            value={progress}
            color={progress === 100 ? 'bg-accent-green' : 'bg-accent-blue'}
            height="lg"
            showLabel
          />
          {progress === 100 && (
            <p className="text-center text-sm text-accent-green font-medium">
              Tüm takviyeler alındı!
            </p>
          )}
        </div>
      </Card>

      {/* Timing Groups */}
      {grouped.map(({ timing, items }) => (
        <div key={timing} className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">{TIMING_ICONS[timing]}</span>
            <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              {TIMING_LABELS[timing]}
            </h2>
          </div>

          <div className="space-y-2">
            {items.map((supp) => {
              const taken = isTaken(today, supp.id);

              return (
                <Card
                  key={`${timing}-${supp.id}`}
                  hover={false}
                  padding="sm"
                  className={
                    supp.isCritical
                      ? 'border-2 border-accent-red/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                      : ''
                  }
                >
                  <div className="space-y-2">
                    {/* Main row */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggle(supp.id)}
                        aria-label={taken ? `${supp.name} alindi olarak isaretlendi` : `${supp.name} alinmadi`}
                        className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                          taken
                            ? 'bg-accent-green border-accent-green text-white'
                            : supp.isCritical
                              ? 'border-accent-red/60 hover:border-accent-red'
                              : 'border-[var(--border-card)] hover:border-accent-blue'
                        }`}
                      >
                        {taken && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M3 7L6 10L11 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-sm font-medium ${
                              taken
                                ? 'line-through text-[var(--text-tertiary)]'
                                : 'text-[var(--text-primary)]'
                            }`}
                          >
                            {supp.name}
                          </span>
                          {supp.isCritical && <Badge variant="critical">Kritik</Badge>}
                          <Badge variant={CATEGORY_BADGES[supp.category] ?? 'default'}>
                            {supp.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          {supp.dosage}
                          {supp.brandInfo && ` · ${supp.brandInfo}`}
                        </p>
                      </div>
                    </div>

                    {/* Warnings */}
                    {supp.warnings && supp.warnings.length > 0 && (
                      <div className="ml-9 space-y-1">
                        {supp.warnings.map((w, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-1.5 text-xs text-accent-red"
                          >
                            <span className="shrink-0 mt-0.5">\u26A0\uFE0F</span>
                            <span>{w}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="ml-9">
                      <Accordion title="Neden aliyorum?" icon="\uD83E\uDDEC">
                        <p>{supp.explanation}</p>
                      </Accordion>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Drug Interactions */}
      {todayInteractions.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-1">
            \u26A0\uFE0F Etkileşim Uyarıları
          </h2>

          <div className="space-y-2">
            {todayInteractions
              .sort((a, b) => {
                const order = { critical: 0, warning: 1, info: 2, safe: 3 };
                return order[a.severity] - order[b.severity];
              })
              .map((interaction) => {
                const config = SEVERITY_CONFIG[interaction.severity];
                return (
                  <Card
                    key={interaction.id}
                    hover={false}
                    padding="sm"
                    className={
                      interaction.severity === 'critical'
                        ? 'border-2 border-accent-red/40'
                        : ''
                    }
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                          <span>{supplementNameMap[interaction.supplement1]}</span>
                          <span className="text-[var(--text-tertiary)]">&harr;</span>
                          <span>{supplementNameMap[interaction.supplement2]}</span>
                        </div>
                        <Badge variant={config.badge}>{config.label}</Badge>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {interaction.description}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)] italic">
                        \u2192 {interaction.recommendation}
                      </p>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
}
