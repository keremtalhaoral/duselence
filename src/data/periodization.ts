export interface Phase {
  id: string;
  name: string;
  weekStart: number;
  weekEnd: number;
  focus: string;
  description: string;
  color: string;
  fctLoad: string;
  heavyLoad: string;
  accessoryLoad: string;
  intensityRange: string;
  rpeTarget: string;
  progressionRule: string;
  tips: string[];
  deloadInfo?: string;
}

export const phases: Phase[] = [
  {
    id: 'adaptasyon',
    name: 'Adaptasyon',
    weekStart: 1,
    weekEnd: 3,
    focus: 'Hareket kalitesi, nöromüsküler adaptasyon, teknik öğrenme',
    description: 'Form > ağırlık. Her tekrarı mükemmel yap. FCT ritmini öğren: ağır > patlayıcı > hızlı > asiste. Boyun hareketlerinde hafif başla, ROM öğren.',
    color: '#3b82f6',
    fctLoad: '%80 1RM x 3 (A hareketi)',
    heavyLoad: '%75-80 1RM',
    accessoryLoad: '3x10-12 (hafif-orta)',
    intensityRange: '%75-80 1RM',
    rpeTarget: 'RPE 6-7',
    progressionRule: 'Form temizse her hafta üst vücut +2.5kg, alt vücut +5kg',
    tips: [
      'Form > ağırlık. Her tekrarı mükemmel yap.',
      'FCT ritmini öğren: ağır > patlayıcı > hızlı > asiste.',
      'Boyun hareketlerinde hafif başla, ROM öğren.',
      'Bu fazda 1RM test YAPMA — tahmini değerlerle çalış.',
    ],
  },
  {
    id: 'guc',
    name: 'Güç Geliştirme',
    weekStart: 4,
    weekEnd: 6,
    focus: 'Kuvvet artışı, FCT hızının geliştirilmesi, hipertrofi temeli',
    description: 'Ana kaldırışlarda +2.5kg (üst) / +5kg (alt) artış. FCT\'de patlayıcılık kalitesini koru — yorulunca hız düşerse tur azalt.',
    color: '#f97316',
    fctLoad: '%85 1RM x 3 (A hareketi)',
    heavyLoad: '%80-85 1RM',
    accessoryLoad: '3x8-10 (orta-ağır)',
    intensityRange: '%80-85 1RM',
    rpeTarget: 'RPE 7-8.5',
    progressionRule: 'Her fazda ana kaldırışlarda progresyon. FCT\'de ağırlık DEĞİL hız artar.',
    tips: [
      'Ana kaldırışlarda +2.5kg (üst) / +5kg (alt) artış.',
      'FCT\'de patlayıcılık kalitesini koru — yorulunca hız düşerse tur azalt.',
      'Aksesuar ağırlıklarını artır, tekrar sayısını düşür.',
      'Hafta 6 sonunda vücudun ağır hissedecek — normal.',
    ],
  },
  {
    id: 'zirve',
    name: 'Yoğunluk Zirvesi',
    weekStart: 7,
    weekEnd: 9,
    focus: 'Maksimal güç, patlayıcılık zirvesi, performans testi',
    description: 'En ağır faz. Vücut zorlanacak ama adapte olacak. Uyku ve beslenme bu fazda KRİTİK — atlama.',
    color: '#ef4444',
    fctLoad: '%87-90 1RM x 2-3 (A hareketi)',
    heavyLoad: '%85-90 1RM',
    accessoryLoad: '3x6-8 (ağır)',
    intensityRange: '%85-90 1RM',
    rpeTarget: 'RPE 8.5-9.5',
    progressionRule: 'Haftalık progresyon yavaşlar. Kalite > Miktar.',
    tips: [
      'En ağır faz. Vücut zorlanacak ama adapte olacak.',
      'Hafta 9 sonunda 1RM test yapılabilir (isteğe bağlı).',
      'Uyku ve beslenme bu fazda KRİTİK — atlama.',
      '3 tekrar temiz yapamıyorsan 2\'ye düş, yüzü bırakma.',
    ],
  },
  {
    id: 'deload',
    name: 'Deload',
    weekStart: 10,
    weekEnd: 10,
    focus: 'Aktif dinlenme, vücut onarımı, nöromüsküler toparlanma',
    description: 'Deload = tembel değilsin, akıllı davranışın. Hareketleri yap ama zorlanma. Ter dökme hedef değil.',
    color: '#22c55e',
    fctLoad: '%60-65 1RM x 3 (teknik)',
    heavyLoad: '%60-65 1RM x 5',
    accessoryLoad: '2x12-15 (hafif)',
    intensityRange: '%60-65 1RM',
    rpeTarget: 'RPE 5-6',
    progressionRule: 'Ağırlık düşür, set sayısı yarısına düşür. Teknik temizle.',
    deloadInfo: 'Deload ZORUNLU. Atlamak yaralanma riskini artırır.',
    tips: [
      'Deload = tembel değilsin, akıllı davranışın.',
      'Hareketleri yap ama zorlanma. Ter dökme hedef değil.',
      'Bu hafta uyku, beslenme, foam roller ÖNCELİKLİ.',
      'Hafta sonunda kendini ucabilecek gibi hissetmelisin.',
    ],
  },
  {
    id: 'test',
    name: 'Performans Zirvesi',
    weekStart: 11,
    weekEnd: 12,
    focus: 'Yeni 1RM, performans demonstrasyonu, sonraki bloğa hazırlık',
    description: 'Hafta 11: 1RM testleri (Pzt: Bench, Çar: Front Squat + RDL, Per: Press + Row). Hafta 12: Yeni yüzdelerle tam program. Her şey taze.',
    color: '#a855f7',
    fctLoad: 'Yeni %85 1RM x 3',
    heavyLoad: 'Yeni %80-85 1RM',
    accessoryLoad: '3x8-10',
    intensityRange: '%80-85 1RM (yeni)',
    rpeTarget: 'RPE 8-9',
    progressionRule: 'Hafta 11: 1RM test → yeni yüzdeleri hesapla. Hafta 12: Yeni programla başla.',
    tips: [
      'Hafta 11 Pazartesi: Bench 1RM testi.',
      'Hafta 11 Çarşamba: Front Squat + RDL 1RM testi.',
      'Hafta 11 Perşembe: Press + Row 1RM testi.',
      'Hafta 12: Yeni yüzdelerle tam program. Her şey taze.',
      'Blok sonunda: sonuçları kaydet, sonraki 12 haftayı planla.',
    ],
  },
];

export function getCurrentPhase(weekNumber: number): Phase {
  return phases.find(p => weekNumber >= p.weekStart && weekNumber <= p.weekEnd) ?? phases[0];
}

export function getWeekInPhase(weekNumber: number): number {
  const phase = getCurrentPhase(weekNumber);
  return weekNumber - phase.weekStart + 1;
}
