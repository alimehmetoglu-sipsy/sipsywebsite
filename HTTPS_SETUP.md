# HTTPS Setup Guide for sipsy.ai

Bu rehber Debian 12 (Bitnami Lightsail) üzerinde Nginx + Let's Encrypt SSL kurulumunu anlatır.

## Önkoşullar

- ✓ Domain DNS ayarları yapılmış (GoDaddy)
- ✓ Lightsail instance'da portlar açık (80, 443, 22)
- ✓ PM2 ile Strapi ve Next.js çalışıyor

## Adım 1: Nginx Kurulumu

```bash
# Nginx kur
sudo apt-get update
sudo apt-get install -y nginx

# Başlat ve enable et
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

## Adım 2: Nginx Konfigürasyonunu Uygula

```bash
cd ~/sipsywebsite

# Config dosyasını kopyala
sudo cp scripts/nginx-sipsy.conf /etc/nginx/sites-available/sipsy.ai

# Symlink oluştur
sudo ln -s /etc/nginx/sites-available/sipsy.ai /etc/nginx/sites-enabled/

# Default config'i kaldır
sudo rm -f /etc/nginx/sites-enabled/default

# Test et
sudo nginx -t

# Restart et
sudo systemctl restart nginx
```

## Adım 3: Certbot (Let's Encrypt) Kurulumu

```bash
# Certbot kur (Debian 12)
sudo apt-get install -y certbot python3-certbot-nginx

# SSL sertifikası al (otomatik nginx config güncellemesi)
sudo certbot --nginx -d sipsy.ai -d www.sipsy.ai --email your@email.com --agree-tos --no-eff-email

# Otomatik yenileme testi
sudo certbot renew --dry-run
```

## Adım 4: Backend Environment Güncelle

```bash
nano ~/sipsywebsite/backend/.env
```

Şu satırları değiştir:

```env
PUBLIC_URL=https://sipsy.ai
IS_PROXIED=true
```

Admin config'i güncelle:

```bash
nano ~/sipsywebsite/backend/config/admin.ts
```

Şunu ekle:

```typescript
export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  session: {
    cookie: {
      secure: env.bool('ADMIN_COOKIE_SECURE', true), // HTTPS için true
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'lax',
    },
  },
});
```

## Adım 5: Frontend Environment Güncelle

```bash
nano ~/sipsywebsite/.env.local
```

```env
NEXT_PUBLIC_STRAPI_URL=https://sipsy.ai
NODE_ENV=production
```

## Adım 6: Servisleri Restart Et

```bash
# PM2'yi restart et
pm2 restart all
pm2 save

# Nginx'i restart et
sudo systemctl restart nginx

# Durumu kontrol et
pm2 status
sudo systemctl status nginx
```

## Adım 7: Test Et

```bash
# HTTP -> HTTPS redirect testi
curl -I http://sipsy.ai

# HTTPS testi
curl -I https://sipsy.ai

# SSL sertifikası kontrolü
sudo certbot certificates
```

## Tarayıcıdan Test

1. **Frontend:** https://sipsy.ai
2. **Strapi Admin:** https://sipsy.ai/admin
3. **Strapi API:** https://sipsy.ai/api/hero-section

## SSL Auto-Renewal

Certbot otomatik olarak cron job oluşturur. Kontrol:

```bash
sudo systemctl list-timers | grep certbot
```

## Firewall Kuralları (AWS Lightsail)

AWS Console → Instances → Networking → Firewall:

```
HTTP    | 80   | 0.0.0.0/0
HTTPS   | 443  | 0.0.0.0/0
SSH     | 22   | 0.0.0.0/0
Custom  | 1337 | 127.0.0.1 (sadece localhost, nginx proxy kullan)
Custom  | 3000 | 127.0.0.1 (sadece localhost, nginx proxy kullan)
```

## Sorun Giderme

### SSL Sertifikası Alınamıyor

```bash
# Domain'in IP'yi gösterdiğini kontrol et
dig sipsy.ai +short
nslookup sipsy.ai

# Nginx çalışıyor mu?
sudo systemctl status nginx

# Port 80 açık mı?
sudo netstat -tuln | grep :80
```

### Admin Login Hatası

```bash
# Backend loglarına bak
pm2 logs strapi-backend

# Cookie secure ayarını kontrol et
cat ~/sipsywebsite/backend/config/admin.ts | grep secure
```

### 502 Bad Gateway

```bash
# PM2 servisleri çalışıyor mu?
pm2 status

# Nginx upstream'i kontrol et
sudo nginx -t
sudo tail -f /var/log/nginx/sipsy.ai.error.log
```

## Yararlı Komutlar

```bash
# Nginx logları
sudo tail -f /var/log/nginx/sipsy.ai.access.log
sudo tail -f /var/log/nginx/sipsy.ai.error.log

# PM2 logları
pm2 logs

# SSL sertifika bilgisi
sudo certbot certificates

# Nginx reload (config değişikliği sonrası)
sudo nginx -t && sudo systemctl reload nginx
```

## Başarı Kontrol Listesi

- [ ] Nginx kurulu ve çalışıyor
- [ ] SSL sertifikası alındı
- [ ] HTTP -> HTTPS redirect çalışıyor
- [ ] Frontend https://sipsy.ai'da açılıyor
- [ ] Strapi admin https://sipsy.ai/admin'de login oluyor
- [ ] API https://sipsy.ai/api/* çalışıyor
- [ ] PM2 servisleri online
- [ ] SSL auto-renewal aktif
