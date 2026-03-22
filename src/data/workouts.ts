export type MuscleGroup =
  | 'göğüs'
  | 'sırt'
  | 'omuz'
  | 'biceps'
  | 'triceps'
  | 'quadriceps'
  | 'hamstring'
  | 'kalça'
  | 'baldır'
  | 'core'
  | 'ön kol';

export type ExerciseType = 'compound' | 'isolation' | 'bodyweight';
export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'cable'
  | 'machine'
  | 'bodyweight'
  | 'band';

export interface Exercise {
  id: string;
  name: string;
  muscleGroups: MuscleGroup[];
  type: ExerciseType;
  equipment: EquipmentType;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
  fctGroup?: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  shortName: string;
  dayOfWeek: number;
  type: 'fct' | 'heavy';
  targetMuscles: MuscleGroup[];
  exercises: Exercise[];
  estimatedDuration: number;
  warmup: string;
  cooldown: string;
}

export const workoutDays: WorkoutDay[] = [
  // ─── Day 1: Upper Body FCT (Pazartesi) ───
  {
    id: 'day-1-upper-fct',
    name: 'Pazartesi: Upper Body FCT',
    shortName: 'Üst Vücut FCT',
    dayOfWeek: 1,
    type: 'fct',
    targetMuscles: ['göğüs', 'sırt', 'omuz', 'biceps', 'triceps'],
    estimatedDuration: 65,
    warmup:
      '5 dk genel ısınma (koşu bandı/ip atlama) + 2-3 set artan yükle aktivasyon',
    cooldown: '5-10 dk statik germe + foam roller',
    exercises: [
      // FCT Circuit — A>15s>B>15s>C>15s>D>3min, 4 rounds
      {
        id: 'day1-incline-db-press',
        name: 'Incline Dumbbell Press',
        muscleGroups: ['göğüs'],
        type: 'compound',
        equipment: 'dumbbell',
        sets: 4,
        reps: '8-10',
        restSeconds: 15,
        fctGroup: 'A',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation:
          'Üst göğüs kasının kalınlığını artırır, omuz eklemi güvenli açıda',
      },
      {
        id: 'day1-cable-row',
        name: 'Cable Row (geniş tutuş)',
        muscleGroups: ['sırt'],
        type: 'compound',
        equipment: 'cable',
        sets: 4,
        reps: '10-12',
        restSeconds: 15,
        fctGroup: 'B',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation:
          'Lats ve rhomboidlere eşzamanlı yük, postür düzeltici',
      },
      {
        id: 'day1-lateral-raise-cable',
        name: 'Lateral Raise (cable)',
        muscleGroups: ['omuz'],
        type: 'isolation',
        equipment: 'cable',
        sets: 4,
        reps: '12-15',
        restSeconds: 15,
        fctGroup: 'C',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation: 'Medial deltoid izolasyonu, omuz genişliği',
      },
      {
        id: 'day1-face-pull',
        name: 'Face Pull',
        muscleGroups: ['omuz', 'sırt'],
        type: 'isolation',
        equipment: 'cable',
        sets: 4,
        reps: '15-20',
        restSeconds: 180,
        fctGroup: 'D',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation:
          'Rotator cuff sağlığı, arka deltoid ve alt trapez',
      },
      // After FCT
      {
        id: 'day1-ez-bar-curl',
        name: 'EZ Bar Curl',
        muscleGroups: ['biceps'],
        type: 'isolation',
        equipment: 'barbell',
        sets: 3,
        reps: '10-12',
        restSeconds: 60,
        explanation: 'Biseps kısa ve uzun baş, supinasyon',
      },
      {
        id: 'day1-overhead-triceps-extension',
        name: 'Overhead Triceps Extension (cable)',
        muscleGroups: ['triceps'],
        type: 'isolation',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        restSeconds: 60,
        explanation: 'Triceps uzun başı, tam germe pozisyonu',
      },
      {
        id: 'day1-dumbbell-shrug',
        name: 'Dumbbell Shrug',
        muscleGroups: ['sırt'],
        type: 'isolation',
        equipment: 'dumbbell',
        sets: 3,
        reps: '12-15',
        restSeconds: 60,
        explanation: 'Üst trapez hipertrofisi, boyun-omuz hattı',
      },
    ],
  },

  // ─── Day 2: Lower Body FCT (Çarşamba) ───
  {
    id: 'day-2-lower-fct',
    name: 'Çarşamba: Lower Body FCT',
    shortName: 'Alt Vücut FCT',
    dayOfWeek: 3,
    type: 'fct',
    targetMuscles: ['quadriceps', 'hamstring', 'kalça', 'baldır', 'core'],
    estimatedDuration: 60,
    warmup:
      '5 dk genel ısınma (koşu bandı/ip atlama) + 2-3 set artan yükle aktivasyon',
    cooldown: '5-10 dk statik germe + foam roller',
    exercises: [
      // FCT Circuit — A>15s>B>15s>C>15s>D>3min, 4 rounds
      {
        id: 'day2-front-squat',
        name: 'Front Squat',
        muscleGroups: ['quadriceps'],
        type: 'compound',
        equipment: 'barbell',
        sets: 4,
        reps: '8-10',
        restSeconds: 15,
        fctGroup: 'A',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation:
          'Ön zincir dominant, core stabilizasyonu zorunlu',
      },
      {
        id: 'day2-rdl',
        name: 'Romanian Deadlift (RDL)',
        muscleGroups: ['hamstring', 'kalça'],
        type: 'compound',
        equipment: 'barbell',
        sets: 4,
        reps: '8-10',
        restSeconds: 15,
        fctGroup: 'B',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation:
          'Posterior zincir, kalça menteşesi paterni',
      },
      {
        id: 'day2-walking-lunge',
        name: 'Walking Lunge',
        muscleGroups: ['quadriceps', 'kalça'],
        type: 'compound',
        equipment: 'dumbbell',
        sets: 4,
        reps: '10/bacak',
        restSeconds: 15,
        fctGroup: 'C',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation: 'Tek taraflı denge, fonksiyonel güç',
      },
      {
        id: 'day2-leg-curl',
        name: 'Leg Curl (lying)',
        muscleGroups: ['hamstring'],
        type: 'isolation',
        equipment: 'machine',
        sets: 4,
        reps: '12-15',
        restSeconds: 180,
        fctGroup: 'D',
        notes: 'FCT devre: A>15s>B>15s>C>15s>D>3dk, 4 tur',
        explanation: 'Hamstring izolasyonu, diz fleksiyonu',
      },
      // After FCT
      {
        id: 'day2-standing-calf-raise',
        name: 'Standing Calf Raise',
        muscleGroups: ['baldır'],
        type: 'isolation',
        equipment: 'machine',
        sets: 4,
        reps: '15-20',
        restSeconds: 45,
        explanation: 'Gastrocnemius hipertrofisi',
      },
      {
        id: 'day2-cable-crunch',
        name: 'Cable Crunch',
        muscleGroups: ['core'],
        type: 'isolation',
        equipment: 'cable',
        sets: 3,
        reps: '15-20',
        restSeconds: 45,
        explanation: 'Rectus abdominis, kontrollü fleksiyon',
      },
      {
        id: 'day2-pallof-press',
        name: 'Pallof Press',
        muscleGroups: ['core'],
        type: 'isolation',
        equipment: 'cable',
        sets: 3,
        reps: '12/taraf',
        restSeconds: 45,
        explanation: 'Anti-rotasyon, core stabilite',
      },
    ],
  },

  // ─── Day 3: Upper Body Heavy (Perşembe) ───
  {
    id: 'day-3-upper-heavy',
    name: 'Perşembe: Upper Body Heavy',
    shortName: 'Üst Vücut Ağır',
    dayOfWeek: 4,
    type: 'heavy',
    targetMuscles: ['göğüs', 'sırt', 'omuz', 'biceps', 'triceps'],
    estimatedDuration: 70,
    warmup:
      '5 dk genel ısınma (koşu bandı/ip atlama) + 2-3 set artan yükle aktivasyon',
    cooldown: '5-10 dk statik germe + foam roller',
    exercises: [
      {
        id: 'day3-barbell-bench-press',
        name: 'Barbell Bench Press',
        muscleGroups: ['göğüs'],
        type: 'compound',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        restSeconds: 150,
        explanation:
          'Compound pressing, göğüs-triceps-ön omuz',
      },
      {
        id: 'day3-weighted-pullup',
        name: 'Weighted Pull-up (veya Lat Pulldown)',
        muscleGroups: ['sırt'],
        type: 'compound',
        equipment: 'bodyweight',
        sets: 4,
        reps: '6-8',
        restSeconds: 150,
        explanation: 'Vertikal çekiş, lats dominant',
      },
      {
        id: 'day3-overhead-press',
        name: 'Overhead Press (barbell)',
        muscleGroups: ['omuz'],
        type: 'compound',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        restSeconds: 120,
        explanation:
          'Deltoid anterior ve medial, overhead güç',
      },
      {
        id: 'day3-pendlay-row',
        name: 'Barbell Row (Pendlay)',
        muscleGroups: ['sırt'],
        type: 'compound',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        restSeconds: 120,
        explanation: 'Horizontal çekiş, tüm sırt kasları',
      },
      {
        id: 'day3-incline-db-curl',
        name: 'Incline Dumbbell Curl',
        muscleGroups: ['biceps'],
        type: 'isolation',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        restSeconds: 60,
        explanation: 'Biceps uzun baş germe, tam ROM',
      },
      {
        id: 'day3-dips',
        name: 'Dips (weighted or BW)',
        muscleGroups: ['triceps', 'göğüs'],
        type: 'compound',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-12',
        restSeconds: 90,
        explanation: 'Compound pressing, triceps ağırlıklı',
      },
    ],
  },

  // ─── Day 4: Lower Body Heavy (Pazar) ───
  {
    id: 'day-4-lower-heavy',
    name: 'Pazar: Lower Body Heavy',
    shortName: 'Alt Vücut Ağır',
    dayOfWeek: 7,
    type: 'heavy',
    targetMuscles: ['quadriceps', 'kalça', 'hamstring', 'baldır', 'core'],
    estimatedDuration: 65,
    warmup:
      '5 dk genel ısınma (koşu bandı/ip atlama) + 2-3 set artan yükle aktivasyon',
    cooldown: '5-10 dk statik germe + foam roller',
    exercises: [
      {
        id: 'day4-back-squat',
        name: 'Back Squat',
        muscleGroups: ['quadriceps', 'kalça'],
        type: 'compound',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        restSeconds: 180,
        explanation: 'Kral hareket, tüm alt vücut + core',
      },
      {
        id: 'day4-hip-thrust',
        name: 'Hip Thrust (barbell)',
        muscleGroups: ['kalça'],
        type: 'compound',
        equipment: 'barbell',
        sets: 4,
        reps: '8-10',
        restSeconds: 120,
        explanation:
          'Gluteus maximus izolasyonu, kalça güç üretimi',
      },
      {
        id: 'day4-bulgarian-split-squat',
        name: 'Bulgarian Split Squat',
        muscleGroups: ['quadriceps', 'kalça'],
        type: 'compound',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-10/bacak',
        restSeconds: 90,
        explanation:
          'Tek taraflı güç, denge, VMO aktivasyonu',
      },
      {
        id: 'day4-leg-press',
        name: 'Leg Press',
        muscleGroups: ['quadriceps'],
        type: 'compound',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        restSeconds: 90,
        explanation: 'Yüksek hacim, güvenli yük',
      },
      {
        id: 'day4-seated-calf-raise',
        name: 'Seated Calf Raise',
        muscleGroups: ['baldır'],
        type: 'isolation',
        equipment: 'machine',
        sets: 4,
        reps: '12-15',
        restSeconds: 45,
        explanation: 'Soleus hedefleme, oturarak',
      },
      {
        id: 'day4-hanging-leg-raise',
        name: 'Hanging Leg Raise',
        muscleGroups: ['core'],
        type: 'bodyweight',
        equipment: 'bodyweight',
        sets: 3,
        reps: '12-15',
        restSeconds: 60,
        explanation:
          'Alt karın, hip flexor güçlendirme',
      },
    ],
  },
];
