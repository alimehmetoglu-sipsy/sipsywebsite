# ⚡ Quick Start - sipsy.ai Deployment

Hızlı başlangıç kılavuzu. Detaylı bilgi için diğer guide'lara bakın.

---

## 🚀 ÜÇ BASIT ADIM

### ADIM 1: GoDaddy DNS Ayarları (2 dakika)

**Dosya:** `GODADDY_DNS_SETUP.md`

GoDaddy DNS Manager'da iki A record ekleyin:
```
Type: A, Name: @,   Value: 54.243.251.248, TTL: 600
Type: A, Name: www, Value: 54.243.251.248, TTL: 600
```

DNS propagation: 10-30 dakika bekleyin.

---

### ADIM 2: Sunucuya SSH Bağlantısı

PowerShell'de:
```powershell
cd C:\Users\Ali\Documents\Projects\sipsywebsite
ssh -i sipsy-lightsail-key.pem ubuntu@54.243.251.248
```

İlk soruda: **yes** yazın

---

### ADIM 3: Deployment Script'lerini Çalıştırın

⚠️ **ÖNEMLİ:** Önce projenizi GitHub'a push edin!

#### 3.1 GitHub'a Push (Local bilgisayarda)
```bash
cd C:\Users\Ali\Documents\Projects\sipsywebsite
git add .
git commit -m "Add production configurations"
git push origin master
```

#### 3.2 Sunucuda Clone & Deploy
SSH bağlantısında:
```bash
# Git kontrol
git --version || sudo apt-get update && sudo apt-get install -y git

# Projeyi clone edin
cd ~
git clone <YOUR_GITHUB_REPO_URL> sipsy-website
cd sipsy-website

# Sunucu kurulumu
bash scripts/setup-server.sh

# Deploy
bash scripts/deploy.sh

# Nginx yapılandır
sudo cp scripts/nginx-sipsy.conf /etc/nginx/sites-available/sipsy.ai
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/sipsy.ai /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# SSL kur (DNS propagation tamamlandıysa)
sudo bash scripts/setup-ssl.sh
```

---

## ✅ KONTROL LİSTESİ

- [ ] GoDaddy DNS ayarları yapıldı
- [ ] DNS propagation tamamlandı (dig +short sipsy.ai)
- [ ] Proje GitHub'a push edildi
- [ ] SSH bağlantısı yapıldı
- [ ] Proje sunucuya clone edildi
- [ ] Setup script çalıştırıldı
- [ ] Deploy script çalıştırıldı
- [ ] Nginx yapılandırıldı
- [ ] SSL kuruldu
- [ ] Site test edildi: https://sipsy.ai ✨

---

## 🆘 SORUN YAŞIYORSANIZ

Detaylı guide'lara bakın:
- **DEPLOYMENT_GUIDE.md** - Adım adım deployment
- **GODADDY_DNS_SETUP.md** - DNS ayarları
- **AWS_LIGHTSAIL_SETUP.md** - AWS setup (tamamlandı)

---

## 📞 YARDIM

Bana şunu gönderin:
```bash
# SSH bağlantısında şu komutları çalıştırın:
pm2 list
pm2 logs --lines 50
sudo nginx -t
sudo systemctl status nginx
```

Hemen yardımcı olacağım! 🤝
