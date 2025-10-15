# Strapi Solution Content Type - CREATE API Documentation

## Overview
Bu dokümantasyon, Strapi Solution content type için CREATE API endpoint'ini detaylı olarak açıklar.

## API Endpoint

```
POST http://localhost:1337/api/solutions
```

### Locale Configuration

**IMPORTANT**: To create solutions in different locales, use query string parameter:

```
# English (default)
POST http://localhost:1337/api/solutions

# Turkish
POST http://localhost:1337/api/solutions?locale=tr
```

**Critical Notes:**
- ✅ **Correct**: `?locale=tr` as query string parameter in URL
- ❌ **Incorrect**: `"locale": "tr"` in request body (this does NOT work!)
- Default locale is `en` (English)
- The locale field in request body is **ignored** by the API
- You MUST use query string parameter for locale selection

## Authentication
API'ye erişim için Bearer token authentication gereklidir.

```bash
Authorization: Bearer YOUR_API_TOKEN
```

## Headers

```
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN
```

## Request Body Structure

### Ana Alanlar (Root Level)

| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `title` | String | ✅ | Solution başlığı |
| `subtitle` | String | ❌ | Alt başlık |
| `slug` | String | ✅ | URL-friendly identifier (unique) |
| `shortDescription` | String | ✅ | Kısa açıklama |
| `icon` | String | ❌ | Icon identifier |
| `featured` | Boolean | ❌ | Öne çıkarılan solution olup olmadığı (default: false) |
| `order` | Number | ❌ | Sıralama değeri (default: 0) |
| `locale` | String | ❌ | Dil kodu (default: "en") |
| `service` | Relation | ❌ | İlişkili service |
| `tools` | Array[Component] | ❌ | Kullanılan teknolojiler/araçlar |
| `project` | Component | ❌ | Proje detayları |
| `visuals` | Array[Component] | ❌ | Görsel öğeler |

### Tools Component

Her bir tool objesi:

```json
{
  "name": "String",        // Araç adı (zorunlu)
  "description": "String"  // Araç açıklaması (opsiyonel)
}
```

### Project Component

```json
{
  "projectName": "String",           // Proje adı
  "clientInfo": "String",            // Müşteri bilgisi
  "problemTitle": "String",          // Problem başlığı
  "problemDescription": "String",    // Problem açıklaması
  "solutionTitle": "String",         // Çözüm başlığı
  "solutionDescription": "String",   // Çözüm açıklaması
  "resultsTitle": "String",          // Sonuçlar başlığı
  "problemPoints": [                 // Problem noktaları dizisi
    {
      "emoji": "String",
      "text": "String"
    }
  ],
  "solutionSteps": [                 // Çözüm adımları dizisi
    {
      "emoji": "String",
      "text": "String"
    }
  ],
  "results": [                       // Sonuç metrikleri dizisi (Ana metrikler burada gösterilir)
    {
      "emoji": "String",
      "metric": "String",
      "value": "String"
    }
  ],
  "beforeMetrics": [                 // Öncesi metrikler
    {
      "label": "String",
      "value": "String"
    }
  ],
  "afterMetrics": [                  // Sonrası metrikler
    {
      "label": "String",
      "value": "String"
    }
  ]
}
```

### Visuals Component

Her bir visual objesi:

```json
{
  "type": "String",        // Görsel tipi (mockup, comparison, illustration, vs.)
  "description": "String"  // Görsel açıklaması
}
```

## Örnek Kullanımlar



### 1. Tam Kapsamlı Request (Tüm Alanlar)

```bash
# English solution (default locale)
curl -X POST 'http://localhost:1337/api/solutions' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "data": {
      "title": "Complete Test Solution - All Fields",
      "subtitle": "Testing all available fields in Solution content type",
      "slug": "complete-test-solution",
      "shortDescription": "This is a comprehensive test solution that includes all possible fields including tools, project details, and visuals.",
      "icon": "rocket",
      "featured": true,
      "order": 5,
      "tools": [
        {
          "name": "React",
          "description": "Frontend framework"
        },
        {
          "name": "Node.js",
          "description": "Backend runtime"
        },
        {
          "name": "PostgreSQL",
          "description": "Database"
        }
      ],
      "project": {
        "projectName": "E-Commerce Platform Redesign",
        "clientInfo": "A mid-size retail company",
        "problemTitle": "Problem:",
        "problemDescription": "The client'\''s old e-commerce platform had poor user experience and low conversion rates.",
        "solutionTitle": "Solution:",
        "solutionDescription": "We rebuilt the platform from scratch with modern technologies:",
        "resultsTitle": "Results:",
        "problemPoints": [
          {
            "emoji": "❌",
            "text": "Slow page load times (5+ seconds)"
          },
          {
            "emoji": "❌",
            "text": "Mobile experience was unusable"
          },
          {
            "emoji": "❌",
            "text": "Checkout process had 60% abandonment rate"
          }
        ],
        "solutionSteps": [
          {
            "emoji": "⚡",
            "text": "Implemented server-side rendering for faster load times"
          },
          {
            "emoji": "📱",
            "text": "Built mobile-first responsive design"
          },
          {
            "emoji": "🛒",
            "text": "Simplified checkout to 2 steps with guest checkout option"
          }
        ],
        "results": [
          {
            "emoji": "✅",
            "metric": "Page load time",
            "value": "5s → 0.8s"
          },
          {
            "emoji": "✅",
            "metric": "Mobile conversion",
            "value": "+120%"
          },
          {
            "emoji": "✅",
            "metric": "Checkout completion",
            "value": "40% → 78%"
          }
        ],
        "beforeMetrics": [
          {
            "label": "Conversion rate",
            "value": "1.2%"
          },
          {
            "label": "Average order value",
            "value": "$45"
          }
        ],
        "afterMetrics": [
          {
            "label": "Conversion rate",
            "value": "3.5%"
          },
          {
            "label": "Average order value",
            "value": "$62"
          }
        ]
      },
      "visuals": [
        {
          "type": "mockup",
          "description": "Homepage redesign mockup"
        },
        {
          "type": "comparison",
          "description": "Before/After performance metrics"
        },
        {
          "type": "illustration",
          "description": "User journey flow diagram"
        }
      ]
    }
  }'
```

**Response:**
```json
{
  "data": {
    "id": 21,
    "documentId": "s5tgy0z00lxtl6tmkjkh3xuy",
    "title": "Complete Test Solution - All Fields",
    "subtitle": "Testing all available fields in Solution content type",
    "slug": "complete-test-solution",
    "shortDescription": "This is a comprehensive test solution that includes all possible fields including tools, project details, and visuals.",
    "icon": "rocket",
    "featured": true,
    "order": 5,
    "createdAt": "2025-10-14T10:41:36.932Z",
    "updatedAt": "2025-10-14T10:41:36.932Z",
    "publishedAt": "2025-10-14T10:41:36.937Z",
    "locale": "en"
  },
  "meta": {}
}
```

### 2. Türkçe Solution Oluşturma

```bash
# Turkish solution - IMPORTANT: Use ?locale=tr in URL, not in request body!
curl -X POST 'http://localhost:1337/api/solutions?locale=tr' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "data": {
      "title": "E-Ticaret Performans Optimizasyonu",
      "subtitle": "Modern teknolojilerle yeniden tasarlandı",
      "slug": "e-ticaret-performans-optimizasyonu",
      "shortDescription": "Sayfa yükleme süresini 5 saniyeden 0.8 saniyeye düşürdük ve dönüşüm oranını %120 artırdık.",
      "icon": "rocket",
      "featured": true,
      "order": 1,
      "tools": [
        {
          "name": "React",
          "description": "Frontend framework"
        },
        {
          "name": "Next.js",
          "description": "Server-side rendering"
        }
      ],
      "project": {
        "projectName": "E-Ticaret Platformu Yenileme",
        "clientInfo": "Orta ölçekli perakende şirketi",
        "problemTitle": "Problem:",
        "problemDescription": "Müşterinin eski e-ticaret platformu kötü kullanıcı deneyimi ve düşük dönüşüm oranlarına sahipti.",
        "solutionTitle": "Çözüm:",
        "solutionDescription": "Platformu modern teknolojilerle sıfırdan yeniden inşa ettik.",
        "resultsTitle": "Sonuçlar:",
        "problemPoints": [
          {
            "emoji": "❌",
            "text": "Yavaş sayfa yükleme süreleri (5+ saniye)"
          },
          {
            "emoji": "❌",
            "text": "Mobil deneyim kullanılamaz durumdaydı"
          }
        ],
        "solutionSteps": [
          {
            "emoji": "⚡",
            "text": "Daha hızlı yükleme için server-side rendering uyguladık"
          },
          {
            "emoji": "📱",
            "text": "Mobile-first responsive tasarım yaptık"
          }
        ],
        "results": [
          {
            "emoji": "✅",
            "metric": "Sayfa yükleme süresi",
            "value": "5s → 0.8s"
          },
          {
            "emoji": "✅",
            "metric": "Mobil dönüşüm",
            "value": "+120%"
          }
        ]
      }
    }
  }'
```

**Response:**
```json
{
  "data": {
    "id": 39,
    "documentId": "g112hy3dosxb8zripdlx1a1e",
    "title": "E-Ticaret Performans Optimizasyonu",
    "subtitle": "Modern teknolojilerle yeniden tasarlandı",
    "slug": "e-ticaret-performans-optimizasyonu",
    "shortDescription": "Sayfa yükleme süresini 5 saniyeden 0.8 saniyeye düşürdük ve dönüşüm oranını %120 artırdık.",
    "icon": "rocket",
    "featured": true,
    "order": 1,
    "createdAt": "2025-10-14T12:36:10.281Z",
    "updatedAt": "2025-10-14T12:36:10.281Z",
    "publishedAt": "2025-10-14T12:36:10.285Z",
    "locale": "tr"
  },
  "meta": {}
}
```

## GET Request ile Tüm Verileri Çekme

Oluşturulan solution'ın tüm nested verilerini çekmek için `populate=deep` parametresini kullanın:

```bash
curl -X GET "http://localhost:1337/api/solutions/{documentId}?populate=deep" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

**Örnek:**
```bash
curl -X GET "http://localhost:1337/api/solutions/s5tgy0z00lxtl6tmkjkh3xuy?populate=deep" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

**Response (Tüm Nested Verilerle):**
```json
{
  "data": {
    "id": 21,
    "documentId": "s5tgy0z00lxtl6tmkjkh3xuy",
    "title": "Complete Test Solution - All Fields",
    "subtitle": "Testing all available fields in Solution content type",
    "slug": "complete-test-solution",
    "shortDescription": "This is a comprehensive test solution that includes all possible fields including tools, project details, and visuals.",
    "icon": "rocket",
    "featured": true,
    "order": 5,
    "createdAt": "2025-10-14T10:41:36.932Z",
    "updatedAt": "2025-10-14T10:41:36.932Z",
    "publishedAt": "2025-10-14T10:41:36.937Z",
    "locale": "en",
    "service": null,
    "tools": [
      {
        "id": 55,
        "name": "React",
        "description": "Frontend framework"
      },
      {
        "id": 56,
        "name": "Node.js",
        "description": "Backend runtime"
      },
      {
        "id": 57,
        "name": "PostgreSQL",
        "description": "Database"
      }
    ],
    "visuals": [
      {
        "id": 49,
        "type": "mockup",
        "description": "Homepage redesign mockup"
      },
      {
        "id": 50,
        "type": "comparison",
        "description": "Before/After performance metrics"
      },
      {
        "id": 51,
        "type": "illustration",
        "description": "User journey flow diagram"
      }
    ],
    "project": {
      "id": 17,
      "projectName": "E-Commerce Platform Redesign",
      "clientInfo": "A mid-size retail company",
      "problemTitle": "Problem:",
      "problemDescription": "The client's old e-commerce platform had poor user experience and low conversion rates.",
      "solutionTitle": "Solution:",
      "solutionDescription": "We rebuilt the platform from scratch with modern technologies:",
      "resultsTitle": "Results:",
      "problemPoints": [
        {
          "id": 165,
          "emoji": "❌",
          "text": "Slow page load times (5+ seconds)"
        },
        {
          "id": 166,
          "emoji": "❌",
          "text": "Mobile experience was unusable"
        },
        {
          "id": 167,
          "emoji": "❌",
          "text": "Checkout process had 60% abandonment rate"
        }
      ],
      "solutionSteps": [
        {
          "id": 168,
          "emoji": "⚡",
          "text": "Implemented server-side rendering for faster load times"
        },
        {
          "id": 169,
          "emoji": "📱",
          "text": "Built mobile-first responsive design"
        },
        {
          "id": 170,
          "emoji": "🛒",
          "text": "Simplified checkout to 2 steps with guest checkout option"
        }
      ],
      "results": [
        {
          "id": 76,
          "emoji": "✅",
          "metric": "Page load time",
          "value": "5s → 0.8s"
        },
        {
          "id": 77,
          "emoji": "✅",
          "metric": "Mobile conversion",
          "value": "+120%"
        },
        {
          "id": 78,
          "emoji": "✅",
          "metric": "Checkout completion",
          "value": "40% → 78%"
        }
      ],
      "beforeMetrics": [
        {
          "id": 73,
          "label": "Conversion rate",
          "value": "1.2%"
        },
        {
          "id": 74,
          "label": "Average order value",
          "value": "$45"
        }
      ],
      "afterMetrics": [
        {
          "id": 75,
          "label": "Conversion rate",
          "value": "3.5%"
        },
        {
          "id": 76,
          "label": "Average order value",
          "value": "$62"
        }
      ]
    }
  },
  "meta": {}
}
```

## HTTP Status Codes

| Status Code | Açıklama |
|-------------|----------|
| 200 OK | İstek başarılı |
| 201 Created | Solution başarıyla oluşturuldu |
| 400 Bad Request | İstek formatı hatalı veya gerekli alanlar eksik |
| 401 Unauthorized | Authentication hatası (token geçersiz veya eksik) |
| 403 Forbidden | Yetkisiz erişim (token'ın yeterli izni yok) |
| 409 Conflict | Slug değeri zaten mevcut (unique constraint) |
| 500 Internal Server Error | Sunucu hatası |

## Notlar

1. **Slug Unique Constraint**: `slug` alanı benzersiz olmalıdır. Aynı slug'a sahip başka bir solution varsa 409 Conflict hatası döner.

2. **Auto-publish**: Solution oluşturulduğunda otomatik olarak `publishedAt` alanı set edilir ve published duruma geçer.

3. **Locale**: Varsayılan locale "en" dir. **ÖNEMLİ**: Farklı bir locale için URL'de query string parametresi kullanmalısınız (`?locale=tr`). Request body'deki `locale` alanı API tarafından **göz ardı edilir**!

4. **Nested Components**: `tools`, `project` ve `visuals` alanları nested component'lerdir. Bu alanlar oluşturulurken otomatik olarak ID'leri atanır ve relationship kurulur.

5. **Service Relation**: `service` alanı bir relation field'dır. Mevcut bir service'e bağlamak için service'in ID'sini kullanabilirsiniz:
   ```json
   {
     "data": {
       "title": "...",
       "service": 1  // Mevcut service ID'si
     }
   }
   ```

6. **API Token**: API token'ı `.env.local` dosyasındaki `STRAPI_TOKEN` değişkeninden alınır.

## Test Edilen Alanlar

✅ title (required)
✅ subtitle (optional)
✅ slug (required, unique)
✅ shortDescription (required)
✅ icon (optional)
✅ featured (boolean)
✅ order (number)
✅ locale (string)
✅ tools[] (array of components)
  - name
  - description
✅ project (component)
  - projectName
  - clientInfo
  - problemTitle
  - problemDescription
  - solutionTitle
  - solutionDescription
  - resultsTitle
  - problemPoints[]
  - solutionSteps[]
  - results[]
  - beforeMetrics[]
  - afterMetrics[]
✅ visuals[] (array of components)
  - type
  - description

## Tarih
Test Tarihi: 2025-10-14
Test Eden: Claude Code
Strapi Version: v5.27.0
