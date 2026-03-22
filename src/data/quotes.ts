export type QuoteCategory = 'cehennem' | 'ağır' | 'toparlanma' | 'çalışma' | 'genel' | 'motivasyon';

export interface Quote {
  text: string;
  author: string;
  category: QuoteCategory;
}

export const quotes: Quote[] = [
  // ===== CEHENNEM (Hell days) =====
  {
    text: 'Acı geçicidir. Pes etmek sonsuzdur.',
    author: 'David Goggins',
    category: 'cehennem',
  },
  {
    text: 'Sınırlarını düşündüğün yerde, yolculuğun daha yeni başlıyor.',
    author: 'David Goggins',
    category: 'cehennem',
  },
  {
    text: 'Kimse sana yardım etmeye gelmiyor. Her şey senin ellerinde.',
    author: 'David Goggins',
    category: 'cehennem',
  },
  {
    text: 'Zihnin bırakmak istediğinde, kapasitesinin yalnızca yüzde kırkındadır.',
    author: 'David Goggins',
    category: 'cehennem',
  },
  {
    text: 'Rahat bölgenin dışında büyüme başlar.',
    author: 'David Goggins',
    category: 'cehennem',
  },
  {
    text: 'Herkes yetenek ister, kimse ağır antrenman istemez.',
    author: 'Kobe Bryant',
    category: 'cehennem',
  },
  {
    text: 'Her şey antrenmanla başlar. Zihin, beden, ruh. Hepsini birlikte çalıştır.',
    author: 'Kobe Bryant',
    category: 'cehennem',
  },
  {
    text: 'Kaybetmekten korkmuyorum. Denemekten vazgeçmekten korkuyorum.',
    author: 'Kobe Bryant',
    category: 'cehennem',
  },
  {
    text: 'Şampiyon olmak istiyorsan, başkalarının yapmak istemediğini yap.',
    author: 'Muhammad Ali',
    category: 'cehennem',
  },
  {
    text: 'İmkansız hiçbir şey değildir. Kelimenin kendisi bile "Ben mümkünüm" diyor.',
    author: 'Muhammad Ali',
    category: 'cehennem',
  },
  {
    text: 'Acı çekmeden zafer olmaz, dikensiz gül olmaz.',
    author: 'Muhammad Ali',
    category: 'cehennem',
  },
  {
    text: 'Herkesin bırakma noktasına kadar bir planı vardır.',
    author: 'Mike Tyson',
    category: 'cehennem',
  },
  {
    text: 'Disiplin, istediğin şeyi yaparak değil, yapmak istemediğin şeyi yaparak kazanılır.',
    author: 'Mike Tyson',
    category: 'cehennem',
  },
  {
    text: 'Korku düşmanın değil, en iyi öğretmenindir.',
    author: 'Mike Tyson',
    category: 'cehennem',
  },
  // ===== AĞIR (Heavy days) =====
  {
    text: 'Yetenek seni maça sokar. Çalışma seni kazandırır.',
    author: 'Michael Jordan',
    category: 'ağır',
  },
  {
    text: 'Hayatımda tekrar tekrar başarısız oldum. İşte bu yüzden başarılı oldum.',
    author: 'Michael Jordan',
    category: 'ağır',
  },
  {
    text: 'Bazı insanlar olmasını ister, bazıları olacağını umar, bazıları ise gerçekleştirir.',
    author: 'Michael Jordan',
    category: 'ağır',
  },
  {
    text: 'Sınırların senin tanımladığın kadardır.',
    author: 'Michael Jordan',
    category: 'ağır',
  },
  {
    text: 'Başarının sırrı yoktur. Hazırlık, sıkı çalışma ve başarısızlıktan öğrenmenin sonucudur.',
    author: 'Cristiano Ronaldo',
    category: 'ağır',
  },
  {
    text: 'Rüyalarını gerçekleştirmek istiyorsan, tembelliği bırak.',
    author: 'Cristiano Ronaldo',
    category: 'ağır',
  },
  {
    text: 'Yeteneğin seni bir yere kadar götürür. Çalışkanlık ise her yere.',
    author: 'Cristiano Ronaldo',
    category: 'ağır',
  },
  {
    text: 'Her sabah aynada kendine bak ve dünden daha güçlü olup olmadığını sor.',
    author: 'Arnold Schwarzenegger',
    category: 'ağır',
  },
  {
    text: 'Güç acıdan gelir. Karşılaştığın acı seni zayıflatmaz, güçlendirir.',
    author: 'Arnold Schwarzenegger',
    category: 'ağır',
  },
  {
    text: 'Son üç tekrar, kası büyüten tekrarlardır. Gerisini herkes yapar.',
    author: 'Arnold Schwarzenegger',
    category: 'ağır',
  },
  {
    text: 'Büyük bir bedene sahip olmak büyük bir sorumluluk gerektirir. Her gün göster.',
    author: 'Arnold Schwarzenegger',
    category: 'ağır',
  },
  {
    text: 'Bir planın yoksa, başkasının planının parçası olursun.',
    author: 'Arnold Schwarzenegger',
    category: 'ağır',
  },
  // ===== TOPARLANMA (Recovery / Stoic) =====
  {
    text: 'Kontrol edemediğin şeyler tarafından yönetilme.',
    author: 'Marcus Aurelius',
    category: 'toparlanma',
  },
  {
    text: 'Engel yoldur. Yolun üstündeki taş, yolun kendisidir.',
    author: 'Marcus Aurelius',
    category: 'toparlanma',
  },
  {
    text: 'Dışarıdan gelen hiçbir şey sana zarar veremez, senin tepkin zarar verir.',
    author: 'Marcus Aurelius',
    category: 'toparlanma',
  },
  {
    text: 'Mutluluk dışarıda aranmaz, içeride inşa edilir.',
    author: 'Marcus Aurelius',
    category: 'toparlanma',
  },
  {
    text: 'Bugün kendi gücünü kullanmayı seç. Yarına bırakma.',
    author: 'Marcus Aurelius',
    category: 'toparlanma',
  },
  {
    text: 'Hayattan şikayet etmeyi bırak ve onu yaşamaya başla.',
    author: 'Marcus Aurelius',
    category: 'toparlanma',
  },
  {
    text: 'Zorluk karakteri ortaya çıkarmaz, onu inşa eder.',
    author: 'Seneca',
    category: 'toparlanma',
  },
  {
    text: 'Şanslı olmayı bekleyen kişi hiçbir zaman başlamaz.',
    author: 'Seneca',
    category: 'toparlanma',
  },
  {
    text: 'Kaderden korkma. Onu karşıla ve dönüştür.',
    author: 'Seneca',
    category: 'toparlanma',
  },
  {
    text: 'Güçlük olmadan deneyim olmaz. Deneyim olmadan bilgelik olmaz.',
    author: 'Seneca',
    category: 'toparlanma',
  },
  {
    text: 'Bizi rahatsız eden olaylar değil, olaylara bakış açımızdır.',
    author: 'Epictetus',
    category: 'toparlanma',
  },
  {
    text: 'Gücünde olan şeylere odaklan, geri kalanını bırak.',
    author: 'Epictetus',
    category: 'toparlanma',
  },
  {
    text: 'Özgürlük, kontrolün dışındaki şeylere bağlanmamaktır.',
    author: 'Epictetus',
    category: 'toparlanma',
  },
  // ===== ÇALIŞMA (Study / Science) =====
  {
    text: 'Hayal gücü bilgiden daha önemlidir. Bilgi sınırlıdır, hayal gücü ise sınırsız.',
    author: 'Albert Einstein',
    category: 'çalışma',
  },
  {
    text: 'Delilik aynı şeyi tekrar tekrar yapıp farklı sonuç beklemektir.',
    author: 'Albert Einstein',
    category: 'çalışma',
  },
  {
    text: 'Bir şeyi basitçe açıklayamıyorsan, yeterince iyi anlamıyorsun demektir.',
    author: 'Albert Einstein',
    category: 'çalışma',
  },
  {
    text: 'Eğer çok uzağı görebildiysem, devlerin omuzlarında durduğum içindir.',
    author: 'Isaac Newton',
    category: 'çalışma',
  },
  {
    text: 'Bildiğim şey bir damladır. Bilmediğim ise bir okyanustur.',
    author: 'Isaac Newton',
    category: 'çalışma',
  },
  {
    text: 'Deha yüzde bir ilhamdır, yüzde doksan dokuzu terdir.',
    author: 'Isaac Newton',
    category: 'çalışma',
  },
  {
    text: 'Bir şeyi gerçekten anlamanın ilk ilkesi, kendini kandırmamaktır.',
    author: 'Richard Feynman',
    category: 'çalışma',
  },
  {
    text: 'Bilmemek ayıp değildir. Öğrenmemek ayıptır.',
    author: 'Richard Feynman',
    category: 'çalışma',
  },
  {
    text: 'Matematik, kalıplar arasındaki uyumu keşfetme sanatıdır.',
    author: 'Leonhard Euler',
    category: 'çalışma',
  },
  {
    text: 'Doğanın kitabı matematik diliyle yazılmıştır.',
    author: 'Galileo Galilei',
    category: 'çalışma',
  },
  // ===== GENEL (General wisdom) =====
  {
    text: 'Düşen yıldız olmaktansa, yükselen bir güneş ol.',
    author: 'Anonim',
    category: 'genel',
  },
  {
    text: 'Bugün yapabileceğini yarına bırakma.',
    author: 'Anonim',
    category: 'genel',
  },
  {
    text: 'Başarısızlık düştüğünde değil, kalkmayı reddettiğinde gelir.',
    author: 'Anonim',
    category: 'genel',
  },
  {
    text: 'Küçük adımlar büyük yolculukların başlangıcıdır.',
    author: 'Lao Tzu',
    category: 'genel',
  },
  {
    text: 'Su, yolunu bulamadığında yeni bir yol açar.',
    author: 'Anonim',
    category: 'genel',
  },
  {
    text: 'Rüzgar yoksa kürek çek.',
    author: 'Anonim',
    category: 'genel',
  },
  // ===== MOTİVASYON (General motivation) =====
  {
    text: 'Disiplin motivasyondan daha güvenilirdir. Motivasyon gelip gider, disiplin kalır.',
    author: 'Jocko Willink',
    category: 'motivasyon',
  },
  {
    text: 'Dünyanın en tehlikeli cümlesi: "Biz hep böyle yaptık."',
    author: 'Grace Hopper',
    category: 'motivasyon',
  },
  {
    text: 'Yapamayacağına inandığın şeyi yap. Sonra tekrar yap.',
    author: 'Eleanor Roosevelt',
    category: 'motivasyon',
  },
  {
    text: 'Başarı, her gün tekrarlanan küçük çabaların toplamıdır.',
    author: 'Robert Collier',
    category: 'motivasyon',
  },
  {
    text: 'İyi bir plan bugün, mükemmel bir plandan yarın daha iyidir.',
    author: 'George S. Patton',
    category: 'motivasyon',
  },
  {
    text: 'Yarın için en iyi hazırlık, bugün elinden gelenin en iyisini yapmaktır.',
    author: 'H. Jackson Brown Jr.',
    category: 'motivasyon',
  },
  {
    text: 'Fırtına geçene kadar beklemek yerine, yağmurda dans etmeyi öğren.',
    author: 'Anonim',
    category: 'motivasyon',
  },
  {
    text: 'Zayıf anlar seni tanımlamaz. O anlardan nasıl kalktığın tanımlar.',
    author: 'Anonim',
    category: 'motivasyon',
  },
  {
    text: 'Kendine yatırım yapmak, yapabileceğin en iyi yatırımdır.',
    author: 'Warren Buffett',
    category: 'motivasyon',
  },
  {
    text: 'Her ustanın bir zamanlar çaylak olduğunu unutma.',
    author: 'Ralph Waldo Emerson',
    category: 'motivasyon',
  },
];
