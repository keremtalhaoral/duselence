export type InteractionSeverity = 'critical' | 'warning' | 'info' | 'safe';

export interface Interaction {
  id: string;
  supplement1: string;
  supplement2: string;
  severity: InteractionSeverity;
  description: string;
  recommendation: string;
}

export const interactions: Interaction[] = [
  {
    id: 'fulsac-ginseng',
    supplement1: 'fulsac',
    supplement2: 'arete-men-multi',
    severity: 'critical',
    description:
      'Ginseng serotonerjik aktiviteyi artırabilir. Serotonin sendromu riski.',
    recommendation:
      'Psikiyatriste danış. ARETE Men Multi yerine ginsengsiz alternatif düşün.',
  },
  {
    id: 'fulsac-omega3',
    supplement1: 'fulsac',
    supplement2: 'omega3',
    severity: 'warning',
    description:
      'Omega-3 antikoagülan etki gösterebilir, Fulsac da kanama riskini artırabilir.',
    recommendation:
      'Dozlar normal aralıkta güvenli. Ameliyat öncesi doktora bildir.',
  },
  {
    id: 'fulsac-melatonin',
    supplement1: 'fulsac',
    supplement2: 'melatonin',
    severity: 'warning',
    description: 'Fluoksetin melatonin metabolizmasını etkileyebilir.',
    recommendation:
      'Düşük dozda (3mg) genelde güvenli. Uyku sorunlarında psikiyatriste danış.',
  },
  {
    id: 'fulsac-kafein',
    supplement1: 'fulsac',
    supplement2: 'kafein',
    severity: 'info',
    description:
      'Kafein anksiyeteyi artırabilir, Fulsac zaten aktivasyon yapabilir.',
    recommendation: "200mg'ı aşma. Anksiyete artarsa azalt.",
  },
  {
    id: 'fulsac-magnezyum',
    supplement1: 'fulsac',
    supplement2: 'magnezyum',
    severity: 'safe',
    description:
      'Sinerjik. Magnezyum GABA reseptörlerini destekler, anksiyolitik etki.',
    recommendation: 'Birlikte kullanım faydalı. Uyku kalitesini artırır.',
  },
  {
    id: 'fulsac-kreatin',
    supplement1: 'fulsac',
    supplement2: 'kreatin',
    severity: 'safe',
    description:
      'Bilinen etkileşim yok. Kreatin dopaminerjik/ATP yolağında çalışır.',
    recommendation: 'Güvenle kullanılabilir.',
  },
  {
    id: 'fulsac-d3k2',
    supplement1: 'fulsac',
    supplement2: 'd3-vitamini',
    severity: 'safe',
    description: 'Etkileşim yok.',
    recommendation: 'Güvenle kullanılabilir.',
  },
  {
    id: 'fulsac-k2',
    supplement1: 'fulsac',
    supplement2: 'k2-vitamini',
    severity: 'safe',
    description: 'Etkileşim yok.',
    recommendation: 'Güvenle kullanılabilir.',
  },
  {
    id: 'alphagpc-kafein',
    supplement1: 'alpha-gpc',
    supplement2: 'kafein',
    severity: 'info',
    description:
      'İkisi birlikte nöromüsküler performansı sinerjik artırır.',
    recommendation: 'Pre-workout stack olarak ideal.',
  },
  {
    id: 'd3-k2',
    supplement1: 'd3-vitamini',
    supplement2: 'k2-vitamini',
    severity: 'info',
    description:
      'Sinerjik. D3 kalsiyum emilimini artırır, K2 kalsiyumu kemiklere yönlendirir.',
    recommendation: 'Birlikte almak şart.',
  },
  {
    id: 'kreatin-kafein',
    supplement1: 'kreatin',
    supplement2: 'kafein',
    severity: 'info',
    description:
      'Eski araştırmalar çelişki gösterdi, güncel meta-analizler sorun yok diyor.',
    recommendation: 'Birlikte kullanım güvenli.',
  },
];
