# Strapi Solutions Schema - Yeni Alanlar

Bu dokümanda Solutions content type'ına eklenecek yeni alanlar ve nasıl oluşturulacakları açıklanmaktadır.

## Solutions Content Type'a Eklenecek Alanlar

### 1. Hero CTA (Component - Single)

**Component Adı:** `solution.hero-cta`

**Alanlar:**
- `primaryButtonText` (Text, Optional) - Örn: "Ücretsiz Demo Talep Edin"
- `secondaryButtonText` (Text, Optional) - Örn: "Uzmanla Görüş"

**Nasıl Oluşturulur:**
1. Content-Type Builder → Components → "Create new component" butonuna tıklayın
2. Category: `solution`, Name: `hero-cta`
3. Yukarıdaki alanları ekleyin
4. Solutions content type'ına gidin → "Add another field" → Component → Type: Single component → `solution.hero-cta` seçin

---

### 2. Technologies Section (Component - Single)

**Component Adı:** `solution.technologies-section`

**Alanlar:**
- `title` (Text, Optional) - Örn: "Güçlü Teknoloji Altyapımız"
- `description` (Text, Optional) - Örn: "Endüstri lideri araçlar ve platformlar kullanıyoruz"

**Nasıl Oluşturulur:**
1. Content-Type Builder → Components → "Create new component"
2. Category: `solution`, Name: `technologies-section`
3. Yukarıdaki alanları ekleyin
4. Solutions content type'ına gidin → "Add another field" → Component → Type: Single component → `solution.technologies-section` seçin

---

### 3. Before After Section (Component - Single)

**Component Adı:** `solution.before-after-section`

**Alanlar:**
- `title` (Text, Optional) - Örn: "Dönüşüm: Önce vs Sonra"
- `description` (Text, Optional) - Örn: "Gerçek verilerle kanıtlanmış dramatik iyileştirmeler"

**Nasıl Oluşturulur:**
1. Content-Type Builder → Components → "Create new component"
2. Category: `solution`, Name: `before-after-section`
3. Yukarıdaki alanları ekleyin
4. Solutions content type'ına gidin → "Add another field" → Component → Type: Single component → `solution.before-after-section` seçin

---

### 4. FAQ (Component - Repeatable)

**Component Adı:** `solution.faq-item`

**Alanlar:**
- `question` (Text, Required)
- `answer` (Text, Long text, Required)
- `order` (Number, Optional)

**Nasıl Oluşturulur:**
1. Content-Type Builder → Components → "Create new component"
2. Category: `solution`, Name: `faq-item`
3. Yukarıdaki alanları ekleyin
4. Solutions content type'ına gidin → "Add another field" → Component → Type: **Repeatable component** → `solution.faq-item` seçin
5. Field adı: `faqs`

---

### 5. Final CTA (Component - Single)

**Component Adı:** `solution.final-cta`

**Alanlar:**
- `title` (Text, Optional) - Örn: "Benzer Sonuçları Sizin İçin de Gerçekleştirelim"
- `description` (Text, Optional) - Örn: "Ücretsiz demo ve danışmanlık için hemen iletişime geçin"
- `contactPhone` (Text, Optional) - Örn: "+90 555 123 45 67"
- `contactEmail` (Email, Optional) - Örn: "info@sipsy.ai"
- `guarantees` (Text, Optional) - Örn: "✓ Taahhüt gerektirmez  •  ✓ %100 gizlilik  •  ✓ Hızlı yanıt garantisi"
- `options` (Component - Repeatable) → `solution.cta-option`

**CTA Option Component:** `solution.cta-option`
- `icon` (Text, Required) - Değerler: "Calendar", "MessageCircle", "Mail"
- `title` (Text, Required) - Örn: "Demo Rezervasyonu"
- `description` (Text, Required) - Örn: "30 dakikalık ücretsiz demo"

**Nasıl Oluşturulur:**
1. Önce `solution.cta-option` component'ini oluşturun:
   - Content-Type Builder → Components → "Create new component"
   - Category: `solution`, Name: `cta-option`
   - Yukarıdaki 3 alanı ekleyin

2. Sonra `solution.final-cta` component'ini oluşturun:
   - Content-Type Builder → Components → "Create new component"
   - Category: `solution`, Name: `final-cta`
   - İlk 5 alanı ekleyin (title, description, contactPhone, contactEmail, guarantees)
   - "Add another field" → Component → Type: **Repeatable component** → `solution.cta-option` seçin
   - Field adı: `options`

3. Solutions content type'ına gidin → "Add another field" → Component → Type: Single component → `solution.final-cta` seçin

---

### 6. Related Solutions Section (Component - Single)

**Component Adı:** `solution.related-solutions-section`

**Alanlar:**
- `title` (Text, Optional) - Örn: "Diğer Çözümlerimiz"
- `description` (Text, Optional) - Örn: "İşletmeniz için başka çözümler de keşfedin"

**Nasıl Oluşturulur:**
1. Content-Type Builder → Components → "Create new component"
2. Category: `solution`, Name: `related-solutions-section`
3. Yukarıdaki alanları ekleyin
4. Solutions content type'ına gidin → "Add another field" → Component → Type: Single component → `solution.related-solutions-section` seçin

---

## Özet: Solutions Content Type Yapısı

Tüm yeni alanlar eklendikten sonra Solutions content type şu yapıda olacak:

```
Solutions
├── title (Text) ✓ Mevcut
├── subtitle (Text) ✓ Mevcut
├── slug (UID) ✓ Mevcut
├── shortDescription (Text) ✓ Mevcut
├── service (Relation) ✓ Mevcut
├── icon (Component) ✓ Mevcut
├── featured (Boolean) ✓ Mevcut
├── order (Number) ✓ Mevcut
├── tools (Component - Repeatable) ✓ Mevcut
├── project (Component - Single) ✓ Mevcut
│   ├── projectName
│   ├── clientInfo
│   ├── problemTitle
│   ├── problemDescription
│   ├── problemPoints (Repeatable)
│   ├── solutionTitle
│   ├── solutionDescription
│   ├── solutionSteps (Repeatable)
│   ├── resultsTitle
│   ├── results (Repeatable)
│   ├── beforeMetrics (Repeatable)
│   ├── afterMetrics (Repeatable)
│   └── savings
├── heroCTA (Component - Single) ⚡ YENİ
├── technologiesSection (Component - Single) ⚡ YENİ
├── beforeAfterSection (Component - Single) ⚡ YENİ
├── faqs (Component - Repeatable) ⚡ YENİ
├── finalCTA (Component - Single) ⚡ YENİ
└── relatedSolutionsSection (Component - Single) ⚡ YENİ
```

---

## Örnek Veri Girişi

### Hero CTA
```
primaryButtonText: "Ücretsiz Demo Talep Edin"
secondaryButtonText: "Uzmanla Görüş"
```

### Technologies Section
```
title: "Güçlü Teknoloji Altyapımız"
description: "Endüstri lideri araçlar ve platformlar kullanıyoruz"
```

### Before After Section
```
title: "Dönüşüm: Önce vs Sonra"
description: "Gerçek verilerle kanıtlanmış dramatik iyileştirmeler"
```

### FAQs (4 adet)
```json
[
  {
    "question": "Bu çözüm ne kadar sürede uygulanır?",
    "answer": "Proje karmaşıklığına bağlı olarak, genellikle 4-12 hafta arasında değişir. İlk sonuçları 2-3 hafta içinde görmeye başlarsınız.",
    "order": 1
  },
  {
    "question": "Mevcut sistemlerimizle entegre olur mu?",
    "answer": "Evet, API'ler ve standart protokoller kullanarak mevcut ERP, CRM ve diğer sistemlerinizle sorunsuz entegrasyon sağlıyoruz.",
    "order": 2
  },
  {
    "question": "Ekibimiz eğitime ihtiyaç duyar mı?",
    "answer": "Evet, kullanıcı dostu arayüz tasarımına rağmen, ekibinizin maksimum verimlilik için 1-2 günlük eğitim sunuyoruz.",
    "order": 3
  },
  {
    "question": "Destek ve bakım nasıl sağlanıyor?",
    "answer": "7/24 teknik destek, düzenli güncellemeler ve proaktif izleme hizmetleri ile kapsamlı destek paketleri sunuyoruz.",
    "order": 4
  }
]
```

### Final CTA
```
title: "Benzer Sonuçları Sizin İçin de Gerçekleştirelim"
description: "Ücretsiz demo ve danışmanlık için hemen iletişime geçin"
contactPhone: "+90 555 123 45 67"
contactEmail: "info@sipsy.ai"
guarantees: "✓ Taahhüt gerektirmez  •  ✓ %100 gizlilik  •  ✓ Hızlı yanıt garantisi"

options: [
  {
    icon: "Calendar",
    title: "Demo Rezervasyonu",
    description: "30 dakikalık ücretsiz demo"
  },
  {
    icon: "MessageCircle",
    title: "Uzmanla Görüş",
    description: "Özel çözüm danışmanlığı"
  },
  {
    icon: "Mail",
    title: "Teklif Al",
    description: "Ücretsiz ROI analizi"
  }
]
```

### Related Solutions Section
```
title: "Diğer Çözümlerimiz"
description: "İşletmeniz için başka çözümler de keşfedin"
```

---

## Notlar

1. **Tüm yeni alanlar Optional'dır** - Eğer Strapi'de boş bırakılırsa, kod otomatik olarak fallback değerlerini (default Türkçe/İngilizce metinleri) kullanacaktır.

2. **populate=deep kullanımı** - `lib/strapi.ts` dosyasında `getSolutionBySlug` fonksiyonu artık `populate=deep` parametresi kullanarak tüm nested component'leri çekiyor.

3. **Icon alanları** - `finalCTA.options[].icon` alanı string olarak "Calendar", "MessageCircle" veya "Mail" değerlerini kabul eder. Kod bu stringleri Lucide React icon component'lerine çevirir.

4. **Dil desteği** - Tüm alanlar lokalizasyon destekliyor. Strapi admin panelinde her bir solution için hem Türkçe (tr) hem de İngilizce (en) versiyonlarını girebilirsiniz.

5. **Sıralama** - FAQ'larda `order` alanı kullanarak sıralama yapabilirsiniz.

---

## Sorun Giderme

Eğer yeni alanlar frontend'de görünmüyorsa:

1. Strapi sunucusunu yeniden başlatın
2. Browser cache'ini temizleyin
3. Network tab'den API response'unu kontrol edin (`/api/solutions?filters[slug][$eq]=...&populate=deep`)
4. Strapi admin panelinde ilgili solution'ın bu alanlarının doldurulduğundan emin olun
