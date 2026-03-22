export interface MacroTarget {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  note: string;
}

export interface Meal {
  id: string;
  time: string;
  name: string;
  description: string;
  macros?: { protein: number; carbs: number; fat: number };
  isShake?: boolean;
}

export const macroTargets: MacroTarget = {
  calories: '+200-300 kcal fazlası (temiz bulk)',
  protein: '135-160g (minimum 1.8g/kg)',
  carbs: '300-350g (antrenman yakıtı)',
  fat: '70-85g (hormon sağlığı)',
  note: 'Hedef: 75kg %17 yağ → 80kg %10 yağ. Yavaş, kontrollü kas kazanımı.',
};

export const meals: Meal[] = [
  {
    id: 'sabah-yakiti',
    time: '07:30',
    name: 'Sabah Yakıtı Shake',
    description: '1 ölçek whey + 1 muz + 30g yulaf + 15g fıstık ezmesi + 5g kreatin + 250ml süt',
    macros: { protein: 40, carbs: 55, fat: 15 },
    isShake: true,
  },
  {
    id: 'ogle',
    time: '12:00',
    name: 'Öğle Yemeği',
    description: 'Tavuk/hindi göğsü 200g + pilav/makarna 150g + salata + zeytinyağı',
    macros: { protein: 45, carbs: 65, fat: 15 },
  },
  {
    id: 'post-workout',
    time: '10:00',
    name: 'Post-Workout Shake',
    description: '1 ölçek whey + 1 muz + 5g glutamin + 200ml su',
    macros: { protein: 30, carbs: 30, fat: 2 },
    isShake: true,
  },
  {
    id: 'aksam',
    time: '17:00',
    name: 'Akşam Yemeği',
    description: 'Kırmızı et/balık 200g + patates/bulgur 150g + sebze + zeytinyağı',
    macros: { protein: 45, carbs: 50, fat: 20 },
  },
  {
    id: 'post-hokey',
    time: '21:00',
    name: 'Post-Hokey Shake',
    description: '1 ölçek whey + 5g BCAA + 1 muz + 200ml su. Hokey sonrası 30dk içinde.',
    macros: { protein: 30, carbs: 25, fat: 2 },
    isShake: true,
  },
  {
    id: 'gece-atistirmasi',
    time: '22:00',
    name: 'Gece Atıştırması (opsiyonel)',
    description: 'Yoğurt 200g + 1 avuç badem. Kalori hedefine göre.',
    macros: { protein: 15, carbs: 10, fat: 12 },
  },
];

export const shakeRecipes = [
  {
    id: 'sabah-yakiti',
    name: 'Sabah Yakıtı',
    icon: '🌅',
    ingredients: ['1 ölçek whey protein (vanilya)', '1 orta boy muz', '30g yulaf ezmesi', '15g fıstık ezmesi', '5g kreatin monohidrat', '250ml tam yağlı süt'],
    timing: 'Uyanır uyanmaz, Fulsac\'tan 15dk sonra',
    macros: { protein: 40, carbs: 55, fat: 15, calories: 515 },
  },
  {
    id: 'post-workout',
    name: 'Post-Workout',
    icon: '💪',
    ingredients: ['1 ölçek whey protein (çikolata)', '1 muz', '5g glutamin', '200ml su'],
    timing: 'Antrenman bitiminden 30dk içinde',
    macros: { protein: 30, carbs: 30, fat: 2, calories: 258 },
  },
  {
    id: 'pre-workout',
    name: 'Pre-Workout Mix',
    icon: '⚡',
    ingredients: ['600mg Alpha-GPC', '200mg kafein (veya 1 fincan espresso)', '3.2g beta-alanin', '2g taurin', '200ml su'],
    timing: 'Antrenmandan 30-45dk önce',
    macros: { protein: 0, carbs: 0, fat: 0, calories: 5 },
  },
  {
    id: 'post-hokey',
    name: 'Post-Hokey',
    icon: '🏒',
    ingredients: ['1 ölçek whey protein', '5g BCAA', '1 muz', '200ml su'],
    timing: 'Hokey bitiminden 30dk içinde',
    macros: { protein: 30, carbs: 25, fat: 2, calories: 238 },
  },
];
