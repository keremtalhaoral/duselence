export const userProfile = {
  name: 'Kerem',
  age: 24,
  university: 'İTÜ Matematik Mühendisliği',
  sports: ['Buz Hokeyi', 'Boks', 'Fitness'],
  currentWeight: 75,
  currentBodyFat: 17,
  targetWeight: 80,
  targetBodyFat: 10,
  height: 178,

  // İlaç bilgileri
  medication: {
    name: 'Fulsac (Fluoksetin)',
    currentDose: '40mg (2×20mg tablet)',
    condition: 'OKB (Obsesif Kompulsif Bozukluk)',
    secondaryDiagnosis: 'Depresyon (remisyonda)',
    suspectedCondition: 'DEHB (henüz tanı yok, güçlü şüphe)',
  },

  // İlaç öyküsü (kronolojik)
  medicationHistory: [
    { step: 1, event: 'İlk başlangıç', detail: '1 tablet (20mg) ile başlandı' },
    { step: 2, event: 'Doz artışı', detail: 'Psikiyatrist 2 tablete (40mg) çıkardı' },
    { step: 3, event: 'Psikiyatristi bırakma', detail: 'Zorunlu nedenlerle psikiyatristini bırakmak zorunda kaldı' },
    { step: 4, event: 'Kendi başına ilacı bırakma', detail: 'Doktor kontrolü olmadan ilacı tamamen kesti' },
    { step: 5, event: 'İlaçsız dönem', detail: 'Üniversiteye başladı, spora başladı, aşırı aktifleşti' },
    { step: 6, event: 'Kötüleşme → yeniden başlama', detail: 'Direkt 40mg ile yeniden başladı (kademeli artış olmadan)' },
    { step: 7, event: 'İyi hissedince tekrar bırakma', detail: 'İlacı yine kendi başına bıraktı' },
    { step: 8, event: 'Çok kötü olma', detail: 'Muhtemel kesilme sendromu + nüks' },
    { step: 9, event: 'Tekrar başlama', detail: 'Yine direkt 40mg ile başladı' },
    { step: 10, event: 'Şu anki durum', detail: '40mg kullanıyor, obsesif düşünceler nüks etti, motor belirtiler devam' },
  ],

  // Motor belirtiler
  motorSymptoms: [
    { behavior: 'Parmak kıtlatma', frequency: 'Çok sık, sürekli' },
    { behavior: 'Bacak sallama', frequency: 'Çok sık, sürekli' },
    { behavior: 'Yatarken kalça kaslarını sıkma', frequency: 'Çok sık' },
  ],

  // Psikiyatrist randevusu
  psychiatristAppointment: {
    doctor: 'Prof. Dr. Engin Emrem Beştepe',
    hospital: 'Erenköy Ruh ve Sinir Hastalıkları EAH',
    date: '2026-04-03',
    cost: 'Ücretsiz (SGK)',
    bringList: [
      'Tüm ilaç öyküsü (kronolojik sıra ile)',
      'Motor belirtilerin detaylı tarifi',
      'ARETE Men Multi ginseng etkileşimi sorusu',
      'DEHB şüphesi ve değerlendirme talebi',
      'OKB tedavi optimizasyonu (40mg yeterli mi?)',
    ],
  },
};
