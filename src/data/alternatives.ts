export interface AlternativeExercise {
  originalId: string;
  originalName: string;
  painArea: string;
  alternative: string;
  reason: string;
}

export const alternatives: AlternativeExercise[] = [
  // Omuz ağrısı
  { originalId: 'incline-db-press', originalName: 'Incline Dumbbell Press', painArea: 'omuz', alternative: 'Landmine Press', reason: 'Omuz eklemine daha az stres, nötr kavrama açısı' },
  { originalId: 'bench-press', originalName: 'Barbell Bench Press', painArea: 'omuz', alternative: 'Floor Press veya Dumbbell Bench', reason: 'ROM kısıtlama ile omuz korunur' },
  { originalId: 'overhead-press', originalName: 'Overhead Press', painArea: 'omuz', alternative: 'Landmine Press veya High Incline DB Press', reason: 'Scapular plane\'de hareket, impingement riski düşük' },
  { originalId: 'lateral-raise', originalName: 'Lateral Raise', painArea: 'omuz', alternative: 'Cable Y-Raise', reason: 'Daha kontrollü hareket yolu, supraspinatus korunur' },
  { originalId: 'dips', originalName: 'Dips', painArea: 'omuz', alternative: 'Close Grip Bench Press', reason: 'Omuz ekstansiyonu azalır, triceps yükü korunur' },

  // Diz ağrısı
  { originalId: 'front-squat', originalName: 'Front Squat', painArea: 'diz', alternative: 'Box Squat veya Goblet Squat', reason: 'Derinlik kontrolü, patellofemoral stres azalır' },
  { originalId: 'back-squat', originalName: 'Back Squat', painArea: 'diz', alternative: 'Belt Squat veya Leg Press (yüksek ayak)', reason: 'Spinal yük azalır, diz açısı kontrol edilir' },
  { originalId: 'walking-lunge', originalName: 'Walking Lunge', painArea: 'diz', alternative: 'Reverse Lunge veya Step-up', reason: 'Ön diz stresi azalır, deselerasyon yükü düşer' },
  { originalId: 'bulgarian-split', originalName: 'Bulgarian Split Squat', painArea: 'diz', alternative: 'Single Leg Press', reason: 'Denge ihtiyacı kalkar, diz açısı korunur' },
  { originalId: 'leg-curl', originalName: 'Leg Curl', painArea: 'diz', alternative: 'Nordic Hamstring Curl (eksentrik)', reason: 'Diz arkası ağrısı varsa eksentrik kontrol daha güvenli' },

  // Bel ağrısı
  { originalId: 'rdl', originalName: 'Romanian Deadlift', painArea: 'bel', alternative: 'Cable Pull-Through veya Hip Thrust', reason: 'Spinal yük minimum, kalça izolasyonu korunur' },
  { originalId: 'back-squat-bel', originalName: 'Back Squat', painArea: 'bel', alternative: 'Front Squat veya Safety Bar Squat', reason: 'Gövde daha dik, lomber yük azalır' },
  { originalId: 'barbell-row', originalName: 'Barbell Row (Pendlay)', painArea: 'bel', alternative: 'Chest Supported Row veya Cable Row', reason: 'Bel üzerindeki yük tamamen kalkar' },
  { originalId: 'hanging-leg-raise', originalName: 'Hanging Leg Raise', painArea: 'bel', alternative: 'Dead Bug veya Pallof Press', reason: 'Lomber fleksiyon yerine anti-extension/rotation' },

  // Bilek ağrısı
  { originalId: 'front-squat-bilek', originalName: 'Front Squat', painArea: 'bilek', alternative: 'Cross Arm Front Squat veya Safety Bar', reason: 'Bilek dorsifleksiyonu gerekmez' },
  { originalId: 'ez-curl', originalName: 'EZ Bar Curl', painArea: 'bilek', alternative: 'Hammer Curl veya Cable Curl', reason: 'Nötr kavrama ile bilek stresi azalır' },
  { originalId: 'bench-press-bilek', originalName: 'Bench Press', painArea: 'bilek', alternative: 'Dumbbell Press (nötr kavrama)', reason: 'Bilek serbestçe döner, ekleme uyum sağlar' },
];
