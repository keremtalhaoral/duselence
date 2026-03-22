export type SupplementCategory = 'performans' | 'sağlık' | 'toparlanma' | 'ilaç' | 'vitamin';
export type TimingSlot = 'sabah-aç' | 'sabah-kahvaltı' | 'öğle' | 'pre-workout' | 'post-workout' | 'akşam' | 'yatmadan-önce';

export interface Supplement {
  id: string;
  name: string;
  dosage: string;
  category: SupplementCategory;
  timings: TimingSlot[];
  // Weekly schedule: true = take that day, for 7 days (Mon-Sun)
  weeklySchedule: boolean[];
  isCritical: boolean; // Fulsac = true
  explanation: string; // "Neden?" scientific reason
  warnings?: string[];
  brandInfo?: string;
}

export const supplements: Supplement[] = [
  {
    id: 'fulsac',
    name: 'Fulsac (Fluoksetin) 40mg',
    dosage: '40mg',
    category: 'ilaç',
    timings: ['sabah-kahvaltı'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: true,
    explanation:
      'SSRI grubu. Serotonin geri alımını inhibe eder. OKB semptomlarını azaltır. KESİNLİKLE ATLANMAMALI.',
    warnings: [
      'Ginseng ile etkileşim (ARETE Men Multi içinde var)',
      'Kendi başına doz değiştirme/bırakma TEHLİKELİ',
      "3 Nisan'da Prof. Beştepe randevusuna git",
    ],
  },
  {
    id: 'kreatin',
    name: 'Kreatin Monohidrat',
    dosage: '5g/gün',
    category: 'performans',
    timings: ['sabah-kahvaltı'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'ATP rejenerasyonu hızlandırır. Kas gücü, dayanıklılık ve bilişsel performansı artırır. Doygunluk fazı gereksiz, günlük 5g yeterli.',
  },
  {
    id: 'omega3',
    name: 'Omega-3 (Balık Yağı)',
    dosage: '2000mg (EPA+DHA)',
    category: 'sağlık',
    timings: ['sabah-kahvaltı'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'Anti-inflamatuar. Eklem sağlığı, beyin fonksiyonu, kardiyovasküler koruma. EPA depresyon semptomlarına yardımcı.',
  },
  {
    id: 'd3-vitamini',
    name: 'D3 Vitamini',
    dosage: '4000 IU',
    category: 'vitamin',
    timings: ['sabah-kahvaltı'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      "Kas fonksiyonu, kemik yoğunluğu, bağışıklık, testosteron desteği. Türkiye'de yaygın eksiklik.",
  },
  {
    id: 'k2-vitamini',
    name: 'K2 Vitamini (MK-7)',
    dosage: '100mcg',
    category: 'vitamin',
    timings: ['sabah-kahvaltı'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'D3 ile sinerjik. Kalsiyumu kemiklere yönlendirir, damar kireçlenmesini önler.',
  },
  {
    id: 'magnezyum',
    name: 'Magnezyum (Bisglisinat)',
    dosage: '400mg',
    category: 'sağlık',
    timings: ['yatmadan-önce'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'Kas gevşemesi, uyku kalitesi, sinir sistemi sakinleştirici. 300+ enzim reaksiyonunda kofaktör. Fulsac ile GÜVENLİ ve SİNERJİK.',
  },
  {
    id: 'cinko',
    name: 'Çinko',
    dosage: '25mg',
    category: 'sağlık',
    timings: ['akşam'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'Testosteron üretimi, bağışıklık, yara iyileşmesi. Yoğun egzersizle kayıp artar.',
  },
  {
    id: 'alpha-gpc',
    name: 'Alpha-GPC',
    dosage: '600mg',
    category: 'performans',
    timings: ['pre-workout'],
    weeklySchedule: [true, false, true, true, false, false, true],
    isCritical: false,
    explanation:
      'Asetilkolin öncüsü. Nöromüsküler sinyal hızı, güç çıkışı, odaklanma. Egzersizden 30-60dk önce.',
  },
  {
    id: 'kafein',
    name: 'Kafein',
    dosage: '200mg',
    category: 'performans',
    timings: ['pre-workout'],
    weeklySchedule: [true, false, true, true, false, false, true],
    isCritical: false,
    explanation:
      "Adenozin reseptör antagonisti. Enerji, odak, yağ yakımı. Tolerans yönetimi için off-günlerde almama.",
  },
  {
    id: 'beta-alanin',
    name: 'Beta-Alanin',
    dosage: '3.2g',
    category: 'performans',
    timings: ['pre-workout'],
    weeklySchedule: [true, false, true, true, false, false, true],
    isCritical: false,
    explanation:
      'Karnosin sentezi. Kas asidite tamponlama. Yüksek tekrarlı setlerde dayanıklılık. Karıncalanma normal.',
  },
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    dosage: '25-30g/servis',
    category: 'performans',
    timings: ['post-workout', 'sabah-kahvaltı'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'Hızlı emilimli protein. Kas protein sentezini tetikler. Lösin oranı yüksek.',
  },
  {
    id: 'bcaa',
    name: 'BCAA',
    dosage: '5g',
    category: 'performans',
    timings: ['pre-workout'],
    weeklySchedule: [true, false, true, true, false, false, true],
    isCritical: false,
    explanation:
      'Dallı zincirli aminoasitler. Whey alıyorsan ek BCAA tartışmalı ama antrenman sırası hidrasyon motivasyonu.',
  },
  {
    id: 'glutamin',
    name: 'Glutamin',
    dosage: '5g',
    category: 'toparlanma',
    timings: ['post-workout'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'Bağırsak bariyeri, bağışıklık desteği, kas toparlanması. Yoğun egzersizde plazma düzeyi düşer.',
  },
  {
    id: 'melatonin',
    name: 'Melatonin',
    dosage: '3mg',
    category: 'sağlık',
    timings: ['yatmadan-önce'],
    weeklySchedule: [false, false, false, false, false, false, false],
    isCritical: false,
    explanation:
      'Sirkadiyen ritm düzenleyici. Uyku başlatıcı. Uzun süreli kullanımda tolerans gelişebilir.',
  },
  {
    id: 'arete-men-multi',
    name: 'ARETE Men Multi',
    dosage: '1 tablet',
    category: 'vitamin',
    timings: ['sabah-kahvaltı'],
    weeklySchedule: [true, true, true, true, true, true, true],
    isCritical: false,
    explanation:
      'Çoklu vitamin-mineral. İÇİNDE GİNSENG VAR → Fulsac ile etkileşim olasılığı!',
    warnings: ['İçindeki ginseng Fulsac ile etkileşebilir', 'Psikiyatriste danış'],
  },
  {
    id: 'taurin',
    name: 'Taurin',
    dosage: '2g',
    category: 'performans',
    timings: ['pre-workout'],
    weeklySchedule: [true, false, true, true, false, false, true],
    isCritical: false,
    explanation:
      'Antioksidan, kalp kası koruyucu, hidrasyon desteği. Kafein ile sinerjik.',
  },
];
