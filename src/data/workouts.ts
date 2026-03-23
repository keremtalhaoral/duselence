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
  | 'ön kol'
  | 'boyun'
  | 'rotasyonel';

export interface Exercise {
  id: string;
  name: string;
  label?: string;
  load: string;
  notes?: string;
  muscleGroups: MuscleGroup[];
  isNew?: boolean;
}

export interface WorkoutSection {
  id: string;
  name: string;
  description?: string;
  protocol?: string;
  exercises: Exercise[];
}

export interface WorkoutDay {
  id: string;
  name: string;
  shortName: string;
  dayOfWeek: number;
  type: 'fct' | 'heavy';
  subtitle: string;
  targetMuscles: MuscleGroup[];
  estimatedDuration: number;
  warmup: string[];
  cooldown: string[];
  sections: WorkoutSection[];
}

export const workoutDays: WorkoutDay[] = [
  // ─── PAZARTESİ: UPPER FCT + Rotasyonel Güç ───
  {
    id: 'pazartesi-upper-fct',
    name: 'Pazartesi — Upper FCT + Rotasyonel Güç',
    shortName: 'Üst Vücut FCT',
    dayOfWeek: 1,
    type: 'fct',
    subtitle: 'Patlayıcılık günü. 23:00 Hokey var — bacaklar taze olmalı.',
    targetMuscles: ['göğüs', 'sırt', 'omuz', 'boyun', 'rotasyonel'],
    estimatedDuration: 75,
    warmup: [
      'İp atlama — 3 dk (son 30sn çift ayak zıplama)',
      'Band Pull-Apart — 2x15',
      'Band Dislocate — 2x10',
      'Kol çevirme (ileri+geri) — 10/yön',
      'T-Spine rotasyon (yerde) — 5/taraf',
      'Scapular Push-Up — 10',
      'Boş bar bench — 2x8 (artarak hız)',
    ],
    cooldown: [
      'Dead Hang — 2x30sn',
      'Doorway Chest Stretch — 30sn/taraf',
      'Cross-body Shoulder Stretch — 20sn/taraf',
      'Cat-Cow — 10 tekrar',
      'Foam Roller — thoracic, lats',
      'Kutu Nefesi — 10x (4-4-4-4)',
    ],
    sections: [
      {
        id: 'pzt-kontrast-1',
        name: 'Kontrast Seti 1 — İtme (French Contrast)',
        protocol: '3 tur | A sonrası 15sn > B > 15sn > C > 15sn > D > 3dk tam dinlenme',
        exercises: [
          {
            id: 'pzt-bench-press',
            name: 'Bench Press',
            label: 'A',
            load: '%85 1RM x 3',
            notes: 'Kontrollü iniş, patlayıcı kalkış',
            muscleGroups: ['göğüs'],
          },
          {
            id: 'pzt-plyo-pushup',
            name: 'Plyo Push-Up',
            label: 'B',
            load: 'BW x 5',
            notes: 'Yerden el kalkmalı',
            muscleGroups: ['göğüs'],
          },
          {
            id: 'pzt-speed-bench',
            name: 'Speed Bench (DB)',
            label: 'C',
            load: '%30 1RM x 5',
            notes: '~12kg/el. Hız odaklı',
            muscleGroups: ['göğüs'],
            isNew: true,
          },
          {
            id: 'pzt-band-plyo-pushup',
            name: 'Band-Assisted Plyo Push-Up',
            label: 'D',
            load: 'BW x 5',
            notes: 'Bant kalçadan',
            muscleGroups: ['göğüs'],
          },
        ],
      },
      {
        id: 'pzt-kontrast-2',
        name: 'Kontrast Seti 2 — Çekme (French Contrast)',
        protocol: '3 tur | Aynı protokol',
        exercises: [
          {
            id: 'pzt-weighted-pullup',
            name: 'Weighted Pull-Up',
            label: 'A',
            load: '%85 1RM x 3',
            notes: 'Tam ROM',
            muscleGroups: ['sırt'],
          },
          {
            id: 'pzt-med-ball-slam',
            name: 'Med Ball Slam',
            label: 'B',
            load: '5kg x 5',
            notes: 'Patlayıcı yere çarpma',
            muscleGroups: ['sırt'],
          },
          {
            id: 'pzt-band-lat-pulldown',
            name: 'Band-Resisted Lat Pulldown',
            label: 'C',
            load: 'Hafif x 5',
            notes: 'Hızlı konsantrik',
            muscleGroups: ['sırt'],
          },
          {
            id: 'pzt-band-pullup',
            name: 'Band-Assisted Pull-Up',
            label: 'D',
            load: 'BW x 5',
            notes: 'Patlayıcı çene bara',
            muscleGroups: ['sırt'],
          },
        ],
      },
      {
        id: 'pzt-rotasyonel',
        name: 'Rotasyonel Güç Bloku',
        protocol: '3 tur | 30sn hareket arası, 90sn tur arası',
        exercises: [
          {
            id: 'pzt-med-ball-shot-put',
            name: 'Med Ball Rotational Shot Put',
            label: '1',
            load: '5kg x 5/taraf',
            notes: 'Kalçadan başlat',
            muscleGroups: ['rotasyonel', 'core'],
          },
          {
            id: 'pzt-landmine-rotation',
            name: 'Landmine Rotation Press',
            label: '2',
            load: 'Orta x 5/taraf',
            notes: 'Çapraz zincir',
            muscleGroups: ['rotasyonel', 'omuz'],
          },
          {
            id: 'pzt-med-ball-chest-pass',
            name: 'Med Ball Chest Pass',
            label: '3',
            load: '5kg x 8',
            notes: 'Boks jab/cross transferi',
            muscleGroups: ['göğüs', 'rotasyonel'],
            isNew: true,
          },
        ],
      },
      {
        id: 'pzt-finiser',
        name: 'Boyun + Omuz Finiser',
        protocol: '2-3 tur | 20sn hareket arası',
        exercises: [
          {
            id: 'pzt-neck-curl',
            name: 'Neck Curl (yüz yukarı)',
            label: '1',
            load: 'Plaka x 15',
            notes: 'Havluyla plaka',
            muscleGroups: ['boyun'],
          },
          {
            id: 'pzt-neck-extension',
            name: 'Neck Extension (yüz aşağı)',
            label: '2',
            load: 'Plaka x 15',
            notes: 'Posterior boyun',
            muscleGroups: ['boyun'],
            isNew: true,
          },
          {
            id: 'pzt-lateral-raise',
            name: 'Lateral Raise',
            label: '3',
            load: 'Hafif x 12',
            notes: 'Lateral delt',
            muscleGroups: ['omuz'],
          },
        ],
      },
    ],
  },

  // ─── ÇARŞAMBA: LOWER FCT + Denge ───
  {
    id: 'carsamba-lower-fct',
    name: 'Çarşamba — Lower FCT + Denge',
    shortName: 'Alt Vücut FCT',
    dayOfWeek: 3,
    type: 'fct',
    subtitle: 'Quad + hamstring patlayıcılığı. Paten kayışı ve denge.',
    targetMuscles: ['quadriceps', 'hamstring', 'kalça', 'baldır', 'core'],
    estimatedDuration: 75,
    warmup: [
      'İp atlama — 3 dk',
      'Tibialis Raise — 3x15 (shin splints koruması!)',
      'Cossack Squat — 3x5/taraf',
      'Ayak bileği mobilite — 10/taraf',
      'Glute bridge — 2x10',
      'Banded lateral walk — 2x10/taraf',
      'Goblet squat (hafif) — 2x5',
    ],
    cooldown: [
      'Couch Stretch — 60sn/taraf',
      'Statik Hamstring — 45sn/taraf',
      'Pigeon Stretch — 45sn/taraf',
      'Tibialis Stretch — 30sn/taraf',
      'Foam Roller — quad, IT band, glute, calf',
      'Kutu Nefesi — 10x (4-4-4-4)',
    ],
    sections: [
      {
        id: 'car-kontrast-1',
        name: 'Kontrast Seti 1 — Quad Dominant (French Contrast)',
        protocol: '3 tur | A>15sn>B>15sn>C>15sn>D>3dk',
        exercises: [
          {
            id: 'car-front-squat',
            name: 'Front Squat',
            label: 'A',
            load: '%85 1RM x 3',
            notes: 'Dirsekler yukarı, core sıkı',
            muscleGroups: ['quadriceps'],
          },
          {
            id: 'car-vertical-jump',
            name: 'Vertical Jump (max)',
            label: 'B',
            load: 'BW x 5',
            notes: 'Tam patlama, yumuşak iniş',
            muscleGroups: ['quadriceps', 'kalça'],
          },
          {
            id: 'car-db-jump-squat',
            name: 'DB Jump Squat',
            label: 'C',
            load: '%30 1RM x 5',
            notes: 'Hafif DB hızlı squat>zıplama',
            muscleGroups: ['quadriceps'],
          },
          {
            id: 'car-band-jump-squat',
            name: 'Band-Assisted Jump Squat',
            label: 'D',
            load: 'BW x 5',
            notes: 'Supramaksimal hız',
            muscleGroups: ['quadriceps'],
          },
        ],
      },
      {
        id: 'car-kontrast-2',
        name: 'Kontrast Seti 2 — Posterior Zincir (French Contrast)',
        protocol: '3 tur | Aynı protokol',
        exercises: [
          {
            id: 'car-rdl',
            name: 'Romanian Deadlift (RDL)',
            label: 'A',
            load: '%85 1RM x 3',
            notes: 'Hamstring gerginliği hisset',
            muscleGroups: ['hamstring', 'kalça'],
          },
          {
            id: 'car-broad-jump',
            name: 'Broad Jump',
            label: 'B',
            load: 'BW x 5',
            notes: 'Kalça ext. ile patlama',
            muscleGroups: ['kalça'],
          },
          {
            id: 'car-kb-swing',
            name: 'KB Swing',
            label: 'C',
            load: 'Orta x 5',
            notes: 'Hızlı kalça menteşesi',
            muscleGroups: ['kalça', 'hamstring'],
          },
          {
            id: 'car-band-broad-jump',
            name: 'Band-Assisted Broad Jump',
            label: 'D',
            load: 'BW x 5',
            notes: 'Horizontal hız artışı',
            muscleGroups: ['kalça'],
          },
        ],
      },
      {
        id: 'car-denge',
        name: 'Denge & Stabilite Bloku',
        protocol: '3 tur | 30sn hareket arası, 90sn tur arası',
        exercises: [
          {
            id: 'car-single-leg-rdl',
            name: 'Single-Leg RDL (DB)',
            label: '1',
            load: 'Orta x 6/taraf',
            notes: 'Paten kayışı mekraniği',
            muscleGroups: ['hamstring', 'kalça'],
          },
          {
            id: 'car-lateral-bound',
            name: 'Lateral Bound > Stick',
            label: '2',
            load: 'BW x 4/taraf',
            notes: '3sn dengede kal',
            muscleGroups: ['kalça', 'quadriceps'],
          },
          {
            id: 'car-pallof-press',
            name: 'Pallof Press',
            label: '3',
            load: 'Hafif-orta x 8/taraf',
            notes: 'Anti-rotasyon',
            muscleGroups: ['core'],
          },
          {
            id: 'car-hip-flexor-march',
            name: 'Banded Hip Flexor March',
            label: '4',
            load: 'Bant x 8/taraf',
            notes: 'Paten kayışı motoru',
            muscleGroups: ['kalça', 'core'],
            isNew: true,
          },
          {
            id: 'car-calf-raise',
            name: 'Calf Raise (tempo 2-1-2)',
            label: '5',
            load: 'BW x 15',
            notes: 'Kontrol vurgulu',
            muscleGroups: ['baldır'],
          },
        ],
      },
    ],
  },

  // ─── PERŞEMBE: UPPER HEAVY + Anti-Rotasyon ───
  {
    id: 'persembe-upper-heavy',
    name: 'Perşembe — Upper Heavy + Anti-Rotasyon',
    shortName: 'Üst Vücut Ağır',
    dayOfWeek: 4,
    type: 'heavy',
    subtitle: 'Güç ve hipertrofi. Kol hacmi ve estetik hedef için kritik gün.',
    targetMuscles: ['omuz', 'sırt', 'göğüs', 'biceps', 'triceps', 'boyun', 'ön kol'],
    estimatedDuration: 70,
    warmup: [
      'İp atlama — 3 dk',
      'Band Pull-Apart — 2x15',
      'Band Dislocate — 2x10',
      'Scapular Pull-Up — 2x8',
      'Boyun çevirme (yavaş) — 5/yön',
      'Hafif DB press — 2x8',
    ],
    cooldown: [
      'Dead Hang — 2x30sn',
      'Doorway Chest Stretch — 30sn/taraf',
      'Overhead Lat Stretch — 20sn/taraf',
      'Foam Roller — thoracic, lats, bicep',
      'Kutu Nefesi — 10x (4-4-4-4)',
    ],
    sections: [
      {
        id: 'per-ana-kaldirislar',
        name: 'Ana Kaldırışlar — Güç',
        protocol: '4 set her biri | Set arası 2-3dk',
        exercises: [
          {
            id: 'per-db-shoulder-press',
            name: 'DB Shoulder Press',
            label: 'A',
            load: '4 x 5 (%80-85)',
            notes: 'Kontrollü eksantrik',
            muscleGroups: ['omuz'],
          },
          {
            id: 'per-bent-over-row',
            name: 'Bent-Over Barbell Row',
            label: 'B',
            load: '4 x 5 (%80-85)',
            notes: 'Gövde 45°. Çekme hızı max',
            muscleGroups: ['sırt'],
          },
        ],
      },
      {
        id: 'per-aksesuar',
        name: 'Aksesuar — Hipertrofi + Anti-Rotasyon (Superset)',
        protocol: '3 tur superset | Superset içi 0-15sn, arası 90sn',
        exercises: [
          {
            id: 'per-db-incline-press',
            name: 'DB Incline Press',
            label: 'S1a',
            load: '8-10',
            notes: '30 derece eğim',
            muscleGroups: ['göğüs'],
          },
          {
            id: 'per-single-arm-cable-row',
            name: 'Single-Arm Cable Row',
            label: 'S1b',
            load: '8/taraf',
            notes: 'Anti-rotasyon + lat',
            muscleGroups: ['sırt'],
          },
          {
            id: 'per-landmine-anti-rot',
            name: 'Landmine Anti-Rot Hold',
            label: 'S2a',
            load: '20sn/taraf',
            notes: 'Core rotasyona direniyor',
            muscleGroups: ['core'],
          },
          {
            id: 'per-face-pull',
            name: 'Face Pull (halat)',
            label: 'S2b',
            load: '12-15',
            notes: 'Dış rotasyon + arka delt',
            muscleGroups: ['omuz', 'sırt'],
          },
          {
            id: 'per-zottman-curl',
            name: 'Zottman Curl',
            label: 'S3a',
            load: '10-12',
            notes: 'Bicep + forearm',
            muscleGroups: ['biceps', 'ön kol'],
          },
          {
            id: 'per-oh-tricep-extension',
            name: 'OH Tricep Extension',
            label: 'S3b',
            load: '10-12',
            notes: 'Kol kalınlığının ~%65\'i tricep',
            muscleGroups: ['triceps'],
            isNew: true,
          },
        ],
      },
      {
        id: 'per-finiser',
        name: 'Boyun + Grip Finiser',
        protocol: '2 tur',
        exercises: [
          {
            id: 'per-neck-4way',
            name: 'Neck 4-Way (plaka)',
            label: '1',
            load: '12/yön',
            notes: 'Ön, arka, sağ, sol',
            muscleGroups: ['boyun'],
            isNew: true,
          },
          {
            id: 'per-plate-pinch',
            name: 'Plate Pinch Hold',
            label: '2',
            load: '2x20sn',
            notes: 'Kavrama gücü',
            muscleGroups: ['ön kol'],
            isNew: true,
          },
        ],
      },
    ],
  },

  // ─── PAZAR: LOWER HEAVY + Unilateral Denge ───
  {
    id: 'pazar-lower-heavy',
    name: 'Pazar — Lower Heavy + Unilateral Denge',
    shortName: 'Alt Vücut Ağır',
    dayOfWeek: 7,
    type: 'heavy',
    subtitle: 'Ağır posterior zincir + tek taraf dengesi. Paten kayışı gücünün temeli.',
    targetMuscles: ['hamstring', 'kalça', 'quadriceps', 'baldır', 'core'],
    estimatedDuration: 65,
    warmup: [
      'İp atlama — 3 dk',
      'Tek ayak gözler kapalı denge — 3xmax/taraf',
      'Tibialis Raise — 3x15',
      'Cossack Squat — 3x5/taraf',
      'Ayak bileği mobilite — 10/taraf',
      'Glute bridge — 2x10',
      'Hafif RDL — 2x5',
    ],
    cooldown: [
      'Couch Stretch — 60sn/taraf',
      'Statik Hamstring — 45sn/taraf',
      'Pigeon Stretch — 45sn/taraf',
      'Adductor Stretch (kurbağa) — 60sn',
      'Dead Hang — 30sn',
      'Foam Roller — quad, hamstring, glute, calf',
      'Kutu Nefesi — 10x (4-4-4-4)',
    ],
    sections: [
      {
        id: 'paz-ana-kaldirislar',
        name: 'Ana Kaldırışlar — Güç',
        protocol: '4 set her biri | Set arası 2.5-3dk',
        exercises: [
          {
            id: 'paz-rdl',
            name: 'Romanian Deadlift (RDL)',
            label: 'A',
            load: '4 x 4 (%82-87)',
            notes: 'Bar bacağa yapışık',
            muscleGroups: ['hamstring', 'kalça'],
          },
          {
            id: 'paz-bulgarian-split',
            name: 'Bulgarian Split Squat',
            label: 'B',
            load: '4 x 6/taraf (%75-80)',
            notes: 'Arka ayak bench\'te',
            muscleGroups: ['quadriceps', 'kalça'],
          },
        ],
      },
      {
        id: 'paz-aksesuar',
        name: 'Aksesuar — Hipertrofi + Denge (Superset)',
        protocol: '3 tur superset | Superset içi 0-15sn, arası 90sn',
        exercises: [
          {
            id: 'paz-hip-thrust',
            name: 'Barbell Hip Thrust',
            label: 'S1a',
            load: '8-10',
            notes: 'Tam kilitleme yukarıda',
            muscleGroups: ['kalça'],
          },
          {
            id: 'paz-nordic-curl',
            name: 'Nordic Hamstring Curl',
            label: 'S1b',
            load: '4-6',
            notes: 'Negatif faz kontrollü',
            muscleGroups: ['hamstring'],
          },
          {
            id: 'paz-sl-squat-box',
            name: 'Single-Leg Squat to Box',
            label: 'S2a',
            load: '6/taraf',
            notes: 'Kontrollü iniş',
            muscleGroups: ['quadriceps'],
          },
          {
            id: 'paz-copenhagen-plank',
            name: 'Copenhagen Plank',
            label: 'S2b',
            load: '30sn/taraf',
            notes: 'Adductor gücü',
            muscleGroups: ['core', 'kalça'],
          },
          {
            id: 'paz-reverse-lunge',
            name: 'DB Reverse Lunge',
            label: 'S3a',
            load: '8/taraf',
            notes: 'Patlayıcı kalkış',
            muscleGroups: ['quadriceps', 'kalça'],
          },
          {
            id: 'paz-farmer-carry',
            name: 'Farmer Carry',
            label: 'S3b',
            load: 'Ağır x 30m',
            notes: 'Core + grip + tüm vücut',
            muscleGroups: ['core', 'ön kol'],
            isNew: true,
          },
        ],
      },
      {
        id: 'paz-finiser',
        name: 'Bacak Finiser',
        protocol: '2-3 tur',
        exercises: [
          {
            id: 'paz-calf-raise',
            name: 'Calf Raise (tempo 2-1-2)',
            label: '1',
            load: '15',
            notes: 'Düz + ice + dışa (5+5+5)',
            muscleGroups: ['baldır'],
          },
          {
            id: 'paz-banded-tke',
            name: 'Banded TKE',
            label: '2',
            load: '15/taraf',
            notes: 'VMO koruması',
            muscleGroups: ['quadriceps'],
            isNew: true,
          },
        ],
      },
    ],
  },
];
