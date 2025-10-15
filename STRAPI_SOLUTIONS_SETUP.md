# Strapi Solutions Content Type Setup Guide

Bu kılavuz, verdiğiniz detaylı solution formatını desteklemek için Strapi'de yapılması gerekenleri adım adım açıklar.

## 📋 İçindekiler
1. [Components Oluşturma](#1-components-oluşturma)
2. [Solution Collection Type](#2-solution-collection-type-oluşturma)
3. [Örnek Veri Girişi](#3-örnek-veri-girişi)

---

## 1. Components Oluşturma

Strapi Admin Panel > **Content-Type Builder** > **Create new component**

### Component 1: `solution.tool` (Kullanılan Araçlar)
**Category:** `solution`
**Name:** `tool`

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| name | Text | ✓ | Örn: "n8n", "Playwright" |
| description | Text | - | Örn: "workflow orchestration" |

---

### Component 2: `solution.point` (Problem/Solution Noktaları)
**Category:** `solution`
**Name:** `point`

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| emoji | Text | - | Örn: "❌", "✅", "🤖" |
| text | Text (Long) | ✓ | Madde açıklaması |

---

### Component 3: `solution.result` (Sonuç Metrikleri)
**Category:** `solution`
**Name:** `result`

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| emoji | Text | - | Örn: "✅", "💰" |
| metric | Text | ✓ | Örn: "Cevap süresi" |
| value | Text | ✓ | Örn: "5-10 dk → 30 saniye" |

---

### Component 4: `solution.metric` (Önce/Sonra Metrikleri)
**Category:** `solution`
**Name:** `metric`

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| label | Text | ✓ | Örn: "İşlem süresi" |
| value | Text | ✓ | Örn: "30 saat/gün" |

---

### Component 5: `solution.visual` (Görsel Önerileri)
**Category:** `solution`
**Name:** `visual`

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| type | Text | ✓ | Örn: "diagram", "screenshot", "comparison" |
| description | Text (Long) | ✓ | Görsel açıklaması |

---

### Component 6: `solution.project` (Proje Detayları)
**Category:** `solution`
**Name:** `project`

Bu ana component diğer component'leri içerecek:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| projectName | Text | ✓ | Örn: "Otomatik Fatura İşleme Robotu" |
| clientInfo | Text | - | Örn: "Bir e-ticaret şirketi" |
| **Problem Section** | | | |
| problemTitle | Text | - | Örn: "Problem:" |
| problemDescription | Rich Text (Markdown) | - | Problem genel açıklaması |
| problemPoints | Component (Repeatable) | - | **solution.point** kullanın |
| **Solution Section** | | | |
| solutionTitle | Text | - | Örn: "Çözüm:" |
| solutionDescription | Rich Text (Markdown) | - | Çözüm genel açıklaması |
| solutionSteps | Component (Repeatable) | - | **solution.point** kullanın |
| **Results Section** | | | |
| resultsTitle | Text | - | Örn: "Sonuç:" |
| results | Component (Repeatable) | - | **solution.result** kullanın |
| **Metrics** | | | |
| beforeMetrics | Component (Repeatable) | - | **solution.metric** kullanın |
| afterMetrics | Component (Repeatable) | - | **solution.metric** kullanın |
| savings | Text | - | Örn: "Yıllık 200.000 TL maliyet tasarrufu" |

---

## 2. Solution Collection Type Oluşturma

**Content-Type Builder** > **Create new collection type** > **"solution"**

### Temel Alanlar

| Field Name | Type | Required | Settings |
|------------|------|----------|----------|
| title | Text | ✓ | Örn: "Robot Process Automation - İnsanları Tekrarlayan İşlerden Kurtarıyoruz" |
| subtitle | Text | - | Alt başlık (opsiyonel) |
| slug | UID | ✓ | Target field: `title` |
| shortDescription | Text (Long) | ✓ | Card'larda gösterilecek kısa açıklama |
| icon | Component - **Strapi Icon** | - | Icon seçici |
| service | Relation | ✓ | **service** (Many-to-One) |
| featured | Boolean | - | Default: false |
| order | Number | - | Default: 0 |

### Components

| Field Name | Type | Required | Component |
|------------|------|----------|-----------|
| tools | Component (Repeatable) | - | **solution.tool** |
| project | Component (Single) | - | **solution.project** |
| visuals | Component (Repeatable) | - | **solution.visual** |

---

## 3. Örnek Veri Girişi

### Örnek 1: Otomatik Fatura İşleme Robotu

```
TEMEL BİLGİLER:
─────────────────
Title: Robot Process Automation - İnsanları Tekrarlayan İşlerden Kurtarıyoruz
Slug: otomatik-fatura-isleme-robotu (otomatik oluşacak)
Short Description: E-ticaret şirketleri için günde 500+ faturayı otomatik işleyen akıllı robot sistemi.
Service: RPA & Hyperautomation (dropdown'dan seçin)
Icon: Bot veya Robot icon seçin
Featured: ✓ (öne çıkan yapmak için)
Order: 1

TOOLS (Repeatable):
─────────────────
1. name: "n8n"
   description: "workflow orchestration"

2. name: "Selenium & Playwright"
   description: "web automation"

3. name: "Autom Mate"
   description: "enterprise RPA"

PROJECT (Single Component):
─────────────────
projectName: Otomatik Fatura İşleme Robotu
clientInfo: Bir e-ticaret şirketi

problemTitle: Problem:
problemDescription: Bir e-ticaret şirketi günde 500+ fatura alıyor. Çalışanlar her faturayı manuel olarak işliyor.

problemPoints (Repeatable):
  1. emoji: ""
     text: "Email'den indiriyor"

  2. emoji: ""
     text: "PDF'i açıp bilgileri okuyor"

  3. emoji: ""
     text: "ERP sistemine tek tek giriyorlar"

  4. emoji: "❌"
     text: "1 fatura = 3-4 dakika"

  5. emoji: "❌"
     text: "Günde 30+ saat insan emeği"

solutionTitle: Çözüm:
solutionDescription: n8n ile akıllı otomasyon geliştirdik:

solutionSteps (Repeatable):
  1. emoji: "🤖"
     text: "Robot email kutusunu sürekli izliyor"

  2. emoji: "📧"
     text: "Yeni fatura geldiğinde otomatik indiriyor"

  3. emoji: "🔍"
     text: "Playwright ile PDF'i açıp önemli bilgileri okuyor (fatura no, tutar, tarih, firma)"

  4. emoji: "⚡"
     text: "API ile ERP sistemine otomatik gönderiyor"

  5. emoji: "✅"
     text: "Başarılı işlemleri Slack'ten bildiriyor"

resultsTitle: Sonuç:

results (Repeatable):
  1. emoji: "✅"
     metric: "Zaman tasarrufu"
     value: "30 saat/gün → 30 dakika/gün (sadece kontrol için)"

  2. emoji: "✅"
     metric: "Hata oranı"
     value: "%0 (insan hatası yok)"

  3. emoji: "✅"
     metric: "Çalışan verimliliği"
     value: "Çalışanlar stratejik işlere odaklanabiliyor"

  4. emoji: "💰"
     metric: "Maliyet tasarrufu"
     value: "Yıllık 200.000 TL"

beforeMetrics (Repeatable):
  1. label: "İşlem süresi"
     value: "30 saat/gün"

  2. label: "Hata oranı"
     value: "%5-10"

afterMetrics (Repeatable):
  1. label: "İşlem süresi"
     value: "30 dakika/gün"

  2. label: "Hata oranı"
     value: "%0"

savings: Yıllık 200.000 TL maliyet tasarrufu

VISUALS (Repeatable):
─────────────────
1. type: "comparison"
   description: "Önce/sonra karşılaştırması (saat cinsinden)"

2. type: "diagram"
   description: "Otomasyon akış şeması (basit, renkli ikonlarla)"

3. type: "illustration"
   description: "Robot karakteri fatura işlerken"
```

### Örnek 2: Akıllı Müşteri Hizmetleri Asistanı

```
TEMEL BİLGİLER:
─────────────────
Title: Yapay Zeka - Verilerinizi Konuşturun, Akıllı Kararlar Alın
Slug: akilli-musteri-hizmetleri-asistani
Short Description: Sigorta şirketleri için 10.000+ sayfa dökümanı saniyeler içinde analiz eden RAG tabanlı AI asistan.
Service: AI/ML Solutions (dropdown'dan seçin)
Icon: Brain veya AI icon seçin
Featured: ✓
Order: 2

TOOLS (Repeatable):
─────────────────
1. name: "LangChain"
   description: "orchestration"

2. name: "OpenAI & Ollama APIs"
   description: ""

3. name: "Qdrant, pgvector"
   description: "Vector Databases"

4. name: "RAG Pipelines"
   description: ""

PROJECT (Single Component):
─────────────────
projectName: Akıllı Müşteri Hizmetleri Asistanı
clientInfo: Bir sigorta şirketi

problemTitle: Problem:
problemDescription: Sigorta şirketi 10.000+ sayfa ürün dökümanı yönetmekte zorlanıyor.

problemPoints (Repeatable):
  1. emoji: ""
     text: "10.000+ sayfa ürün dökümanı var"

  2. emoji: ""
     text: "Müşteri temsilcileri her soruya cevap bulmak için 5-10 dakika döküman arıyor"

  3. emoji: "❌"
     text: "Müşteriler bekliyor, memnuniyetsiz"

  4. emoji: "❌"
     text: "Yanlış bilgi verme riski"

  5. emoji: "❌"
     text: "Yeni çalışanların öğrenmesi aylar sürüyor"

solutionTitle: Çözüm:
solutionDescription: RAG (Retrieval Augmented Generation) sistemi kurduk:

solutionSteps (Repeatable):
  1. emoji: "📚"
     text: "Tüm ürün dökümanları, SSS'ler, poliçe bilgileri veritabanına yüklendi"

  2. emoji: "🧠"
     text: "Vector database (Qdrant) ile bilgiler anlamsal olarak saklandı"

  3. emoji: "💬"
     text: "Müşteri temsilcisi soru soruyor: '35 yaşında, sigara içmeyen kadın için hangi hayat sigortası?'"

  4. emoji: "⚡"
     text: "AI sistem saniyeler içinde ilgili dökümanları buluyor, cevabı oluşturuyor, kaynak dökümanları gösteriyor"

  5. emoji: "🎯"
     text: "Temsilci hazır cevabı müşteriye iletiyor"

resultsTitle: Sonuç:

results (Repeatable):
  1. emoji: "✅"
     metric: "Cevap süresi"
     value: "5-10 dk → 30 saniye"

  2. emoji: "✅"
     metric: "Doğruluk oranı"
     value: "%95+"

  3. emoji: "✅"
     metric: "Müşteri memnuniyeti"
     value: "+35%"

  4. emoji: "✅"
     metric: "Yeni çalışan eğitim süresi"
     value: "3 ay → 2 hafta"

  5. emoji: "💡"
     metric: "Bonus"
     value: "Sistem 7/24 çalışıyor, insanlar tatilde bile kullanabiliyor!"

beforeMetrics (Repeatable):
  1. label: "Cevap süresi"
     value: "5-10 dakika"

  2. label: "Doğruluk"
     value: "%80"

afterMetrics (Repeatable):
  1. label: "Cevap süresi"
     value: "30 saniye"

  2. label: "Doğruluk"
     value: "%95+"

savings: Müşteri memnuniyeti +35%

VISUALS (Repeatable):
─────────────────
1. type: "mockup"
   description: "Chat interface mockup"

2. type: "comparison"
   description: "Önce manuel arama vs Şimdi AI ile karşılaştırması"

3. type: "illustration"
   description: "Brain/network görseli, vector database konsepti"
```

---

## 4. Adım Adım Uygulama

### 1. Component'leri Oluşturun
1. Strapi Admin > **Content-Type Builder**
2. Sol menüden **Components** > **Create new component**
3. Yukarıdaki 6 component'i sırayla oluşturun:
   - `solution.tool`
   - `solution.point`
   - `solution.result`
   - `solution.metric`
   - `solution.visual`
   - `solution.project` (en son, çünkü diğer component'leri kullanıyor)

### 2. Solution Collection Type'ı Oluşturun
1. **Content-Type Builder** > **Create new collection type**
2. Display name: `solution`
3. Yukarıdaki tabloyu takip ederek field'ları ekleyin

### 3. Save & Restart
- Sağ üstten **Save** butonu
- Strapi otomatik restart olacak

### 4. İlk Solution'ınızı Ekleyin
1. Sol menüden **Content Manager** > **Solutions**
2. **Create new entry**
3. Yukarıdaki örneklerden birini kullanarak doldurun
4. **Save** ve **Publish**

### 5. Test Edin
- Frontend: `http://localhost:3000/solutions`
- API: `http://localhost:1337/api/solutions?populate=*`

---

## 5. İpuçları

- **Emoji'ler:** Doğrudan emoji karakterlerini kopyala-yapıştır yapabilirsiniz (✅, ❌, 🤖, vb.)
- **Rich Text:** `problemDescription` ve `solutionDescription` için Markdown formatı kullanabilirsiniz
- **Populate:** API'den veri çekerken `?populate=*` eklemeyi unutmayın (nested components için)
- **Service Relation:** Önce services'leri oluşturduğunuzdan emin olun
- **Order:** Solutions'ları sıralamak için `order` alanını kullanın (küçük sayılar önce gelir)

---

## 6. Toplu Veri Girişi İçin

5 solution'ı hızlıca girmek için:

1. **RPA & Hyperautomation** - Otomatik Fatura İşleme Robotu
2. **AI/ML Solutions** - Akıllı Müşteri Hizmetleri Asistanı
3. **Enterprise Integration** - Merkezi IT Varlık Yönetim Sistemi
4. **Custom Software** - Dinamik Fiyatlandırma API'si
5. **Data Engineering** - 360 Derece Müşteri Analiz Platformu

Her birini yukarıdaki format'ı takip ederek girebilirsiniz.

---

## Sorun Giderme

**Component'ler görünmüyor:**
- Strapi'yi restart edin: `npm run develop` (backend klasöründe)

**Relation çalışmıyor:**
- Service content type'ının mevcut ve published olduğundan emin olun

**Populate hatası:**
- API çağrısında `?populate=deep` veya `?populate[project][populate]=*` kullanmayı deneyin

**Emoji'ler görünmüyor:**
- Database'iniz UTF-8 encoding kullandığından emin olun
