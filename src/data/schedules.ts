export type ActivityType = 'fitness' | 'üniversite' | 'hokey' | 'toparlanma' | 'beslenme' | 'takviye' | 'uyku';

export interface TimeSlot {
  time: string;
  endTime: string;
  activity: string;
  type: ActivityType;
  supplements?: string[];
  notes?: string;
}

export interface DaySchedule {
  id: string;
  dayOfWeek: number;
  name: string;
  nickname: string;
  color: string;
  wakeUp: string;
  sleep: string;
  summary: string;
  slots: TimeSlot[];
}

export const weekSchedule: DaySchedule[] = [
  // ─── PAZARTESİ — Cehennem 1 ───
  {
    id: 'pazartesi',
    dayOfWeek: 1,
    name: 'Pazartesi',
    nickname: 'Cehennem 1',
    color: 'red',
    wakeUp: '06:00',
    sleep: '02:00',
    summary: 'Ders + Fitness + Hokey | ARETE günü',
    slots: [
      { time: '06:00', endTime: '06:30', activity: 'Aç Karnına — Sistem Açılışı', type: 'takviye', supplements: ['fulsac', 'probiyotik'], notes: '1 bardak su ile. Kahvaltıya 30dk bekle.' },
      { time: '06:30', endTime: '07:00', activity: 'Kahvaltı: Shake 1 + 3-4 Yumurta', type: 'beslenme', supplements: ['omega-3', 'aslan-yelesi', 'd3k2', 'arete-men'], notes: 'ARETE 1tb. Yağlı kahvaltıyla emilim max.' },
      { time: '08:00', endTime: '10:00', activity: 'MAT 244E — İstatistik', type: 'üniversite' },
      { time: '11:00', endTime: '13:30', activity: 'MAT 374 — Hesaplamalı Sürekli Ortamlar', type: 'üniversite' },
      { time: '12:30', endTime: '13:00', activity: 'Öğle Yemeği (ders arası)', type: 'beslenme', supplements: ['omega-3'], notes: 'Omega-3 2.kapsül — yükleme fazı. Yağlı öğünle.' },
      { time: '15:30', endTime: '16:00', activity: 'Nörolojik Reset (TUR 121 yok)', type: 'toparlanma', supplements: ['l-teanin'], notes: 'Boş mideye L-Teanin + 20dk NSDR.' },
      { time: '17:00', endTime: '17:30', activity: 'Pre-Workout İksir', type: 'takviye', supplements: ['kreatin', 'himalaya-tuzu'], notes: '600ml su + Kreatin 5g + 1/2 çk Himalaya tuzu.' },
      { time: '17:30', endTime: '18:30', activity: 'FITNESS ANTRENMANİ', type: 'fitness' },
      { time: '18:30', endTime: '19:00', activity: 'Post-Workout Kapan', type: 'beslenme', supplements: ['krom'], notes: 'Krom yutulur > 20dk > Shake 2.' },
      { time: '20:00', endTime: '20:30', activity: 'Akşam Yemeği', type: 'beslenme', supplements: ['glukozamin'], notes: 'Glukozamin 2 tablet yemekle.' },
      { time: '22:15', endTime: '22:30', activity: 'Hokey Hazırlık: Vahşet Modu', type: 'takviye', supplements: ['alpha-gpc'], notes: 'Alpha-GPC 300mg + soğuk duş 3dk.' },
      { time: '23:00', endTime: '01:00', activity: 'BUZ HOKEYİ', type: 'hokey' },
      { time: '01:15', endTime: '01:30', activity: 'POST-HOKEY ONARIM [v3 YENİ]', type: 'takviye', supplements: ['kolajen', 'himalaya-tuzu', 'extramag'], notes: 'Kolajen 10g + tuz > ılık su. ExtraMag. Kritik onarım penceresi.' },
      { time: '02:00', endTime: '06:00', activity: 'Uyku', type: 'uyku', notes: 'Direkt yat. Ekran yok.' },
    ],
  },

  // ─── SALI — Toparlanma ───
  {
    id: 'sali',
    dayOfWeek: 2,
    name: 'Salı',
    nickname: 'Toparlanma',
    color: 'purple',
    wakeUp: '08:00',
    sleep: '23:30',
    summary: 'Ders | B-Complex günü',
    slots: [
      { time: '08:00', endTime: '08:30', activity: 'Geç Uyanış — Aç Karnına', type: 'takviye', supplements: ['fulsac', 'probiyotik', 'kreatin'], notes: 'Hokey yorğunu beyne açıl ATP. 1 bardak su.' },
      { time: '08:30', endTime: '09:00', activity: 'Onarım Kahvaltısı: Shake 1 + Yumurta', type: 'beslenme', supplements: ['b-complex', 'd3k2', 'omega-3', 'aslan-yelesi', 'cinko'], notes: 'Öğün. Omega-3 1.kapsül.' },
      { time: '09:00', endTime: '11:00', activity: 'MAT 324E — Cebir (Algebra)', type: 'üniversite' },
      { time: '12:30', endTime: '13:00', activity: 'Öğle Yemeği', type: 'beslenme', supplements: ['cinko', 'omega-3'], notes: 'Çinko 15mg + Omega-3 2.kapsül. Yağlı öğünle.' },
      { time: '14:30', endTime: '15:00', activity: 'Hayat Kurtaran Odak', type: 'toparlanma', supplements: ['l-teanin'], notes: 'L-Teanin boş mideye + 20dk NSDR.' },
      { time: '19:00', endTime: '19:30', activity: 'Akşam Yemeği', type: 'beslenme', supplements: ['krom', 'glukozamin', 'kolajen'], notes: 'Krom yemekten 15dk önce. Kolajen yemekle.' },
      { time: '23:30', endTime: '08:00', activity: 'Kapanış — Aç Karnına', type: 'takviye', supplements: ['extramag'], notes: 'ExtraMag 1-2 tablet.' },
    ],
  },

  // ─── ÇARŞAMBA — Taktiksel ───
  {
    id: 'carsamba',
    dayOfWeek: 3,
    name: 'Çarşamba',
    nickname: 'Taktiksel',
    color: 'orange',
    wakeUp: '06:00',
    sleep: '22:30',
    summary: 'Ders + Fitness | ARETE günü',
    slots: [
      { time: '06:00', endTime: '06:30', activity: 'Aç Karnına — Sistem Açılışı', type: 'takviye', supplements: ['fulsac', 'probiyotik'], notes: '1 bardak su. 30dk bekle.' },
      { time: '06:30', endTime: '07:00', activity: 'Kahvaltı: Shake 1 + Yumurta', type: 'beslenme', supplements: ['omega-3', 'aslan-yelesi', 'd3k2', 'arete-men'], notes: 'ARETE Mën 1tb. Omega-3 1.kapsül.' },
      { time: '08:00', endTime: '10:00', activity: 'MAT 272E — İleri Matematik', type: 'üniversite' },
      { time: '12:30', endTime: '13:00', activity: 'Öğle Yemeği', type: 'beslenme', supplements: ['omega-3'], notes: 'Omega-3 2.kapsül. Yağlı öğünle.' },
      { time: '14:30', endTime: '15:00', activity: 'Derin Odak', type: 'toparlanma', supplements: ['l-teanin'], notes: 'L-Teanin boş mideye.' },
      { time: '17:00', endTime: '17:30', activity: 'Pre-Workout İksir', type: 'takviye', supplements: ['kreatin', 'kolajen', 'himalaya-tuzu'], notes: '600ml su + Kreatin + Kolajen + tuz.' },
      { time: '17:30', endTime: '18:30', activity: 'FITNESS ANTRENMANİ', type: 'fitness' },
      { time: '18:30', endTime: '19:00', activity: 'Post-Workout Kapan', type: 'beslenme', supplements: ['krom'], notes: 'Krom > 20dk > Shake 2.' },
      { time: '20:00', endTime: '20:30', activity: 'Akşam Yemeği', type: 'beslenme', supplements: ['glukozamin'], notes: 'Glukozamin 2 tablet.' },
      { time: '22:30', endTime: '06:00', activity: 'Kapanış — Aç Karnına', type: 'takviye', supplements: ['extramag'], notes: 'ExtraMag. Uyku.' },
    ],
  },

  // ─── PERŞEMBE — Sentez ───
  {
    id: 'persembe',
    dayOfWeek: 4,
    name: 'Perşembe',
    nickname: 'Sentez',
    color: 'cyan',
    wakeUp: '06:00',
    sleep: '23:00',
    summary: 'Ders + Fitness | ARETE günü',
    slots: [
      { time: '06:00', endTime: '06:30', activity: 'Aç Karnına — Sistem Açılışı', type: 'takviye', supplements: ['fulsac', 'probiyotik'], notes: '1 bardak su.' },
      { time: '06:30', endTime: '07:00', activity: 'Kahvaltı: Shake 1 + Yumurta', type: 'beslenme', supplements: ['omega-3', 'aslan-yelesi', 'd3k2', 'arete-men'], notes: 'ARETE Mën 1tb. Omega-3 1.kapsül.' },
      { time: '08:30', endTime: '10:00', activity: 'Polimat Otoyolu — Derin Odak', type: 'üniversite', supplements: ['l-teanin'], notes: 'Sabah ders yok. L-Teanin + hafıza sarayı, zkML.' },
      { time: '12:30', endTime: '13:00', activity: 'Öğle Yemeği', type: 'beslenme', supplements: ['omega-3'], notes: 'Omega-3 2.kapsül.' },
      { time: '14:30', endTime: '16:30', activity: 'MAT 448E — Sayılar Teorisi', type: 'üniversite' },
      { time: '17:30', endTime: '18:00', activity: 'Pre-Workout İksir', type: 'takviye', supplements: ['kreatin', 'kolajen', 'himalaya-tuzu'], notes: 'Dersten çıkınca direkt. 600ml su.' },
      { time: '18:00', endTime: '19:00', activity: 'FITNESS ANTRENMANİ', type: 'fitness' },
      { time: '19:00', endTime: '19:30', activity: 'Post-Workout Kapan', type: 'beslenme', supplements: ['krom'], notes: 'Krom > 20dk > Shake 2.' },
      { time: '20:30', endTime: '21:00', activity: 'Akşam Yemeği', type: 'beslenme', supplements: ['glukozamin'], notes: 'Glukozamin 2 tablet.' },
      { time: '23:00', endTime: '06:00', activity: 'Kapanış — Aç Karnına', type: 'takviye', supplements: ['extramag'], notes: 'ExtraMag. Uyku.' },
    ],
  },

  // ─── CUMA — Cehennem 2 ───
  {
    id: 'cuma',
    dayOfWeek: 5,
    name: 'Cuma',
    nickname: 'Cehennem 2',
    color: 'red',
    wakeUp: '06:00',
    sleep: '04:30',
    summary: 'Ders + Hokey | B-Complex günü',
    slots: [
      { time: '06:00', endTime: '06:30', activity: 'Aç Karnına — Cehennem 2 Başlıyor', type: 'takviye', supplements: ['fulsac', 'probiyotik'], notes: '1 bardak su. Gece uzun.' },
      { time: '06:30', endTime: '07:00', activity: 'Kahvaltı: Shake 1 + Yumurta', type: 'beslenme', supplements: ['b-complex', 'd3k2', 'omega-3', 'aslan-yelesi'], notes: 'Öğün. Omega-3 1.kapsül.' },
      { time: '08:00', endTime: '08:30', activity: 'Ders Öncesi Odak', type: 'toparlanma', supplements: ['l-teanin'], notes: 'L-Teanin boş mideye.' },
      { time: '09:00', endTime: '12:00', activity: 'MAT 234E — Kısmi Diferansiyel Denklemler', type: 'üniversite' },
      { time: '13:00', endTime: '13:30', activity: 'Öğle Yemeği', type: 'beslenme', supplements: ['cinko', 'omega-3'], notes: 'Çinko 15mg + Omega-3 2.kapsül.' },
      { time: '18:00', endTime: '18:30', activity: 'Taktiksel Soğuma', type: 'toparlanma', notes: 'ZORUNLU 20dk NSDR.' },
      { time: '19:00', endTime: '19:30', activity: 'Akşam: Tam Yükleme', type: 'beslenme', supplements: ['krom', 'glukozamin', 'kreatin'], notes: 'Krom yemeğin önce > kreatin aksama. Krom önceden.' },
      { time: '23:30', endTime: '00:00', activity: 'Hokey Hazırlık: Vahşet Modu', type: 'takviye', supplements: ['alpha-gpc'], notes: 'Alpha-GPC + soğuk duş + tuz su ile.' },
      { time: '00:15', endTime: '03:15', activity: 'BUZ HOKEYİ', type: 'hokey' },
      { time: '03:30', endTime: '04:00', activity: 'POST-HOKEY ONARIM [v3 YENİ]', type: 'takviye', supplements: ['kolajen', 'himalaya-tuzu', 'extramag'], notes: 'Kolajen + tuz > ılık su. ExtraMag. EN ağır onarım penceresi.' },
      { time: '04:30', endTime: '15:00', activity: 'Uyku > Cumartesi 15:00\'e kadar', type: 'uyku', notes: 'Karanlık oda. Alarm kurma.' },
    ],
  },

  // ─── CUMARTESİ — Onarım ───
  {
    id: 'cumartesi',
    dayOfWeek: 6,
    name: 'Cumartesi',
    nickname: 'Onarım',
    color: 'green',
    wakeUp: '15:00',
    sleep: '01:00',
    summary: 'Dinlenme | B-Complex günü',
    slots: [
      { time: '15:00', endTime: '15:30', activity: 'T+0 Geç Uyanış — Aç Karnına', type: 'takviye', supplements: ['fulsac', 'probiyotik', 'kreatin'], notes: 'Hokey toparlanma. Kreatin beyne açıl ATP.' },
      { time: '15:30', endTime: '16:00', activity: 'Mega Onarım Öğünü: Shake 1 + Yumurta', type: 'beslenme', supplements: ['b-complex', 'd3k2', 'omega-3', 'aslan-yelesi', 'cinko'], notes: 'Öğün. Aslan Yelesi.' },
      { time: '18:00', endTime: '18:30', activity: 'Hafif Reset [v3 YENİ]', type: 'toparlanma', supplements: ['l-teanin'], notes: 'L-Teanin. Cumartesi de beyin onarımı hak ediyor.' },
      { time: '19:30', endTime: '20:00', activity: 'Akşam Yemeği Öncesi', type: 'takviye', supplements: ['krom'], notes: 'Krom 15-20dk önce.' },
      { time: '20:00', endTime: '20:30', activity: 'Akşam Yemeği', type: 'beslenme', supplements: ['glukozamin', 'kolajen', 'omega-3'], notes: 'Glukozamin + Kolajen [v3 YENİ]. Omega-3 2.kapsül.' },
      { time: '01:00', endTime: '06:00', activity: 'Kapanış — Aç Karnına', type: 'takviye', supplements: ['extramag'], notes: 'ExtraMag. Yarın 06:00.' },
    ],
  },

  // ─── PAZAR — Hazırlık ───
  {
    id: 'pazar',
    dayOfWeek: 7,
    name: 'Pazar',
    nickname: 'Hazırlık',
    color: 'blue',
    wakeUp: '06:00',
    sleep: '22:30',
    summary: 'Fitness | ARETE günü',
    slots: [
      { time: '06:00', endTime: '06:30', activity: 'Aç Karnına — Haftaya Hazırlık', type: 'takviye', supplements: ['fulsac', 'probiyotik'], notes: '1 bardak su. Pazartesi cehenneme tam depo gir.' },
      { time: '06:30', endTime: '07:00', activity: 'Kahvaltı: Shake 1 + Yumurta', type: 'beslenme', supplements: ['omega-3', 'aslan-yelesi', 'd3k2', 'arete-men'], notes: 'ARETE Mën 1tb. Omega-3 1.kapsül.' },
      { time: '11:00', endTime: '11:30', activity: 'Odak Bloğu', type: 'toparlanma', supplements: ['l-teanin'], notes: 'L-Teanin. Hafta planlaması, çalışma.' },
      { time: '12:30', endTime: '13:00', activity: 'Öğle Yemeği', type: 'beslenme', supplements: ['omega-3'], notes: 'Omega-3 2.kapsül.' },
      { time: '16:30', endTime: '17:00', activity: 'Pre-Workout İksir', type: 'takviye', supplements: ['kreatin', 'kolajen', 'himalaya-tuzu'], notes: '600ml su + Kreatin + Kolajen + tuz.' },
      { time: '17:00', endTime: '18:00', activity: 'FITNESS ANTRENMANİ', type: 'fitness' },
      { time: '18:00', endTime: '18:30', activity: 'Post-Workout Kapan', type: 'beslenme', supplements: ['krom'], notes: 'Krom > 20dk > Shake 2.' },
      { time: '20:00', endTime: '20:30', activity: 'Akşam Yemeği', type: 'beslenme', supplements: ['glukozamin'], notes: 'Glukozamin 2 tablet. Yarına hazır.' },
      { time: '22:30', endTime: '06:00', activity: 'Kapanış — Aç Karnına', type: 'takviye', supplements: ['extramag'], notes: 'ExtraMag. Erken uyu — Pazartesi cehennem.' },
    ],
  },
];
