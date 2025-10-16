# Strapi Veri Yedekleme ve Geri Yükleme Rehberi

Bu dokümanda Strapi verilerinizi nasıl yedekleyeceğinizi ve geri yükleyeceğinizi bulabilirsiniz.

## Hızlı Başlangıç

### Manuel Yedekleme

```bash
# Windows (PowerShell)
.\scripts\backup-strapi.ps1

# Linux/Mac
./scripts/backup-strapi.sh
```

### Production'a Veri Aktarma

```bash
# 1. Strapi Cloud'a login
npx strapi login

# 2. Transfer token oluşturun (Strapi Cloud Dashboard → Settings → Transfer Tokens)

# 3. Verilerinizi aktarın
npm run strapi transfer -- --to https://your-project.strapiapp.com --to-token YOUR_TRANSFER_TOKEN
```

---

## Detaylı Rehber

### 1. Lokal Verileri Export Etme

```bash
# Tüm içeriği export et
cd backend
npm run strapi export -- --no-encrypt --file ../backup-$(date +%Y%m%d-%H%M%S).tar.gz
```

**Export edilen veriler:**
- Content types ve component'ler (schema'lar)
- Tüm içerik (entities)
- Medya dosyaları (assets)
- İlişkiler (links)
- Yapılandırma (configuration)

### 2. Verileri Import Etme

```bash
# Lokal ortamda import
cd backend
npm run strapi import -- --file ../backup-20241015-104719.tar.gz
```

**Önemli:** Import işlemi mevcut verilerin üzerine yazar. Önce backup alın!

### 3. Production'a Transfer

#### Yöntem A: Direct Transfer (Önerilen)

Strapi Cloud için en güvenli yöntem:

```bash
# Source (lokal) → Target (production)
npm run strapi transfer -- \\
  --to https://your-project.strapiapp.com \\
  --to-token YOUR_TRANSFER_TOKEN
```

**Avantajları:**
- Canlı transfer (downtime yok)
- Otomatik conflict resolution
- Progress tracking

#### Yöntem B: Export/Import

Manuel kontrol gerektiğinde:

```bash
# 1. Lokal'de export
npm run strapi export -- --file backup.tar.gz

# 2. Production sunucusuna yükle (FTP, SCP, vb.)

# 3. Production'da import
npm run strapi import -- --file backup.tar.gz
```

### 4. Otomatik Yedekleme

#### Windows (Task Scheduler)

1. Task Scheduler'ı açın
2. "Create Basic Task" → "Strapi Daily Backup"
3. Trigger: Daily, 3:00 AM
4. Action: Start a program
   - Program: `powershell.exe`
   - Arguments: `-ExecutionPolicy Bypass -File "C:\path\to\scripts\backup-strapi.ps1"`

#### Linux/Mac (Cron)

```bash
# Crontab'ı düzenle
crontab -e

# Her gece saat 3:00'te backup al
0 3 * * * /path/to/scripts/backup-strapi.sh >> /var/log/strapi-backup.log 2>&1
```

### 5. Production Yedekleme (Strapi Cloud)

Strapi Cloud kullanıyorsanız:

```bash
# Production'dan lokal'e pull
npm run strapi transfer -- \\
  --from https://your-project.strapiapp.com \\
  --from-token YOUR_TRANSFER_TOKEN \\
  --only content,files
```

**Recommended:** Haftada bir production backup alın.

---

## Önemli Notlar

### Veritabanı Kalıcılığı

- **Lokal (Development):** SQLite → `.tmp/data.db` (Git'te yok!)
- **Production:** PostgreSQL (Strapi Cloud otomatik sağlar)
- **Deployment:** Lokal ve production veritabanları AYRI

### Backup Stratejisi

1. **Lokal Development:**
   - Her major değişiklikten önce backup
   - Haftalık otomatik backup

2. **Production:**
   - Günlük otomatik backup
   - Deployment öncesi manual backup
   - 30 günlük retention

### Git ve Veriler

**UYARI:** Aşağıdakiler `.gitignore`'da olmalı:
- `/backups` - Backup dosyaları
- `backup-*.tar.gz` - Export dosyaları
- `backend/.tmp` - SQLite veritabanı

Veritabanı dosyaları Git'e commit edilmemelidir!

---

## Sorun Giderme

### "Database connection failed" Hatası

Production'da environment variable'ları kontrol edin:
```env
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:port/database
```

### Import Sırasında Hata

```bash
# Force import (mevcut verileri sil ve import et)
npm run strapi import -- --file backup.tar.gz --force
```

### Transfer Token Bulunamıyor

1. Strapi Cloud Dashboard → Settings
2. Transfer Tokens → Create new token
3. Full access (read + write) seçin
4. Token'ı güvenli bir yerde saklayın

---

## Faydalı Komutlar

```bash
# Sadece schema'ları export et
npm run strapi export -- --only schemas

# Sadece content'leri export et
npm run strapi export -- --only content

# Sadece medya dosyalarını export et
npm run strapi export -- --only files

# Şifreli backup (production için)
npm run strapi export -- --encrypt --key YOUR_ENCRYPTION_KEY

# Backup'ı doğrula (corrupt olup olmadığını kontrol et)
tar -tzf backup.tar.gz > /dev/null && echo "OK" || echo "CORRUPT"
```

---

## İletişim ve Destek

- Strapi Documentation: https://docs.strapi.io/cms/data-management
- Transfer Tool Docs: https://docs.strapi.io/cms/cli#strapi-transfer
- Export/Import Docs: https://docs.strapi.io/cms/cli#strapi-export
