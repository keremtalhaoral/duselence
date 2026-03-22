export interface Phase {
  id: string;
  name: string;
  weekStart: number;
  weekEnd: number;
  focus: string;
  description: string;
  color: string;
  intensityRange: string;
  volumeChange: string;
  rpeTarget: string;
  progressionRule: string;
  deloadInfo?: string;
}

export const phases: Phase[] = [
  {
    id: 'adaptasyon',
    name: 'Adaptasyon',
    weekStart: 1,
    weekEnd: 3,
    focus: 'Nöromüsküler adaptasyon ve teknik öğrenme',
    description: 'Hafif-orta yüklerle hareket kalıplarını öğrenme, eklem/tendon hazırlığı, FCT protokolüne alışma. Yükleri agresif artırma, formu mükemmelleştir.',
    color: '#3b82f6',
    intensityRange: '%55-70 1RM',
    volumeChange: 'Orta hacim, düşük yoğunluk',
    rpeTarget: 'RPE 6-7',
    progressionRule: 'Her hafta üst vücut +2.5kg, alt vücut +5kg (form temizse)',
  },
  {
    id: 'guc',
    name: 'Güç Geliştirme',
    weekStart: 4,
    weekEnd: 7,
    focus: 'Progresif aşırı yüklenme ve güç artışı',
    description: 'Yükleri sistematik artırma, kas hipertrofisi ve güç kazanımı. Heavy günlerde yoğunluk artışı, FCT günlerinde hacim korunur.',
    color: '#f97316',
    intensityRange: '%70-82 1RM',
    volumeChange: 'Yüksek hacim, artan yoğunluk',
    rpeTarget: 'RPE 7-8.5',
    progressionRule: 'Her hafta progresyon dene. 2 ardışık başarısızlıkta ağırlığı koru, ekstra set ekle.',
  },
  {
    id: 'zirve',
    name: 'Zirve Performans',
    weekStart: 8,
    weekEnd: 10,
    focus: 'Maksimum güç ve performans',
    description: 'En yüksek yoğunluklar, düşürülmüş hacim. Sinir sistemi adaptasyonu, 1RM yaklaşımları. Toparlanmaya ekstra dikkat.',
    color: '#ef4444',
    intensityRange: '%82-92 1RM',
    volumeChange: 'Azaltılmış hacim, maksimum yoğunluk',
    rpeTarget: 'RPE 8.5-9.5',
    progressionRule: 'Haftalık progresyon yavaşlar. Kalite > Miktar. PR denemeleri hafta 9-10.',
  },
  {
    id: 'deload',
    name: 'Deload & Test',
    weekStart: 11,
    weekEnd: 12,
    focus: 'Aktif dinlenme ve performans testi',
    description: 'Hafta 11: Yükleri %50-60\'a düşür, hacmi yarıya indir. Hafta 12: 1RM testleri, vücut ölçümleri, sonraki döngü planlaması.',
    color: '#22c55e',
    intensityRange: '%50-60 (deload) / %95-100 (test)',
    volumeChange: 'Yarı hacim (deload) / Minimal hacim (test)',
    rpeTarget: 'RPE 5-6 (deload) / RPE 10 (test)',
    progressionRule: 'Deload: ağırlık düşür, teknik temizle. Test: ısınma protokolü sonrası tekli maksimumlar.',
    deloadInfo: 'Hafta 11 deload ZORUNLU. Atlamak yaralanma riskini artırır. Hafta 12\'de bench, squat, deadlift, press, row testleri.',
  },
];

export function getCurrentPhase(weekNumber: number): Phase {
  return phases.find(p => weekNumber >= p.weekStart && weekNumber <= p.weekEnd) ?? phases[0];
}

export function getWeekInPhase(weekNumber: number): number {
  const phase = getCurrentPhase(weekNumber);
  return weekNumber - phase.weekStart + 1;
}
