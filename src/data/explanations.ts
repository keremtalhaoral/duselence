export interface Explanation {
  id: string;
  topic: string;
  category: 'takviye' | 'egzersiz' | 'protokol' | 'beslenme';
  shortExplanation: string;
  detailedExplanation: string;
  mechanism?: string;
  references?: string[];
}

export const explanations: Explanation[] = [
  {
    id: 'fct-protokolu',
    topic: 'FCT (Faz Kontrast Antrenmanı)',
    category: 'protokol',
    shortExplanation: 'Agonist-antagonist süper setleri ile metabolik stres ve mekanik gerilim kombinasyonu.',
    detailedExplanation: 'FCT, 4 egzersizi 15 saniyelik dinlenmelerle art arda yapar, sonra 3 dakika dinlenir. Bu yapı: (1) metabolik stres ile büyüme hormonu salgısını artırır, (2) antagonist kasları aktive ederek agonist performansı yükseltir, (3) kısa sürede yüksek hacim sağlar.',
    mechanism: 'A→15sn→B→15sn→C→15sn→D→3dk dinlenme × 4 tur',
  },
  {
    id: 'kreatin',
    topic: 'Kreatin Monohidrat',
    category: 'takviye',
    shortExplanation: 'ATP rejenerasyonu → Kas gücü ↑ + Bilişsel performans ↑',
    detailedExplanation: 'Kreatin, fosfokreatin sistemini doldurarak yüksek yoğunluklu egzersizlerde ATP üretimini hızlandırır. 5g/gün doygunluk sağlar. Ayrıca beyinde enerji tamponlama yaparak bilişsel performansı da artırır. En çok araştırılmış, en güvenli takviyelerden biri.',
    mechanism: 'Kreatin → Fosfokreatin → ATP rejenerasyonu (kas + beyin)',
  },
  {
    id: 'alpha-gpc',
    topic: 'Alpha-GPC',
    category: 'takviye',
    shortExplanation: 'Asetilkolin öncüsü → Nöromüsküler sinyal hızı ↑ + Odaklanma ↑',
    detailedExplanation: 'Alpha-GPC, kan-beyin bariyerini geçebilen bir kolin kaynağıdır. Asetilkolin sentezini artırarak hem bilişsel fonksiyonu (odak, hafıza) hem nöromüsküler bağlantıyı güçlendirir. Egzersizden 30-60dk önce alındığında güç çıkışını %3-14 artırabilir.',
    mechanism: 'Alpha-GPC → Kolin → Asetilkolin → Motor nöron aktivasyonu ↑',
  },
  {
    id: 'fulsac',
    topic: 'Fulsac (Fluoksetin)',
    category: 'takviye',
    shortExplanation: 'SSRI → Serotonin geri alım inhibisyonu → OKB semptomları ↓',
    detailedExplanation: 'Fluoksetin, sinaptik aralıktaki serotoninin geri alımını bloke eder. Daha fazla serotonin reseptörlere bağlanır. OKB\'de obsesif düşünce döngülerini kırar. Etki 2-4 hafta sonra başlar. OKB\'de terapötik doz 40-80mg arası. KESİNLİKLE kendi başına doz değiştirilmemeli.',
    mechanism: 'Fluoksetin → SERT blokajı → Sinaptik serotonin ↑ → 5-HT reseptör aktivasyonu',
  },
  {
    id: 'omega3',
    topic: 'Omega-3 (EPA/DHA)',
    category: 'takviye',
    shortExplanation: 'Anti-inflamatuar → Eklem sağlığı + Beyin fonksiyonu + Ruh hali',
    detailedExplanation: 'EPA anti-inflamatuar etki gösterir, eklem ağrılarını azaltır, depresyon semptomlarına yardımcı olabilir. DHA beyin dokusunun yapısal bileşenidir. Yoğun egzersizde artan inflamasyonu dengelemek için önemli.',
    mechanism: 'EPA → Resolvin/Protektin sentezi → İnflamasyon ↓ | DHA → Nöronal membran bütünlüğü',
  },
  {
    id: 'magnezyum',
    topic: 'Magnezyum Bisglisinat',
    category: 'takviye',
    shortExplanation: 'Kas gevşemesi + Uyku kalitesi ↑ + 300+ enzim reaksiyonu',
    detailedExplanation: 'Magnezyum 300\'den fazla enzim reaksiyonunda kofaktör. Bisglisinat formu bağırsak dostu ve yüksek biyoyararlanımlı. GABA reseptörlerini destekleyerek anksiyolitik etki gösterir. Fulsac ile sinerjik — birlikte uyku ve ruh hali iyileşir.',
    mechanism: 'Mg²⁺ → GABA-A reseptör modülasyonu → Sinir sistemi sakinleşmesi',
  },
  {
    id: 'd3-k2',
    topic: 'D3 + K2 Kombinasyonu',
    category: 'takviye',
    shortExplanation: 'D3 kalsiyum emilimi ↑ + K2 kalsiyumu kemiklere yönlendirir',
    detailedExplanation: 'D3 bağırsaktaki kalsiyum emilimini artırır ama tek başına kalsiyum damarlarda birikebilir. K2 (MK-7 formu) osteocalcin ve matrix GLA proteinini aktive ederek kalsiyumu kemiklere yönlendirir, damar kireçlenmesini önler. İkisi birlikte alınmalı.',
    mechanism: 'D3 → Kalsiyum emilimi ↑ → K2 → Kalsiyum kemiklere yönlendirme',
  },
  {
    id: 'progresyon',
    topic: 'Progresif Aşırı Yüklenme',
    category: 'protokol',
    shortExplanation: 'Kas büyümesi için artan yük zorunlu — vücut adaptasyona zorlanmalı.',
    detailedExplanation: 'Kas hipertrofisi için üç mekanizma: mekanik gerilim, metabolik stres, kas hasarı. Progresif yüklenme ilkesi: vücut her hafta biraz daha fazla stimülusa maruz kalmalı. Üst vücut +2.5kg/hafta, alt vücut +5kg/hafta başlangıç hedefi.',
    mechanism: 'Artan yük → mTOR sinyal yolağı aktivasyonu → Kas protein sentezi ↑',
  },
  {
    id: 'protein-zamanlama',
    topic: 'Protein Zamanlaması',
    category: 'beslenme',
    shortExplanation: '30dk anabolik pencere + günlük 1.8g/kg minimum',
    detailedExplanation: 'Post-workout 30dk içinde 25-40g hızlı protein (whey) kas protein sentezini maksimize eder. Günlük toplam protein 1.6-2.2g/kg hedeflenmeli. 4 saatte bir 30-40g protein dağılımı ideal. Lösin eşiği (2.5-3g) her öğünde aşılmalı.',
    mechanism: 'Lösin → mTOR aktivasyonu → Ribozom rekrutmanı → Kas protein sentezi başlangıcı',
  },
  {
    id: 'uyku',
    topic: 'Uyku ve Toparlanma',
    category: 'protokol',
    shortExplanation: '7-9 saat uyku → Büyüme hormonu ↑ + Kas onarımı + Bellek konsolidasyonu',
    detailedExplanation: 'Derin uyku sırasında büyüme hormonu (GH) pik yapar — kas onarımı ve hipertrofisi için kritik. REM uykusu motor öğrenme ve bellek konsolidasyonu için gerekli. Yetersiz uyku kortizolü artırır, testosteronu düşürür, kas kazanımını %60 azaltabilir.',
    mechanism: 'N3 (derin) uyku → GH pulsatil salınımı → IGF-1 → Kas/kemik anabolizması',
  },
];
