# GoDaddy DNS Setup Guide for sipsy.ai

Bu guide AWS Lightsail Static IP'nizi GoDaddy domain'inize bağlamak için kullanılır.

⏱️ **Tahmini Süre:** 2-5 dakika (DNS propagation: 10-30 dakika)

---

## 📋 Gerekli Bilgiler

Bu adımdan önce AWS Lightsail Static IP adresinizi bana iletmiş olmalısınız. Ben size exact IP adresini vereceğim.

**Static IP:** `XXX.XXX.XXX.XXX` ← Size özel olarak bu bilgiyi vereceğim

---

## 🌐 ADIM 1: GoDaddy'ye Giriş

1. [GoDaddy.com](https://www.godaddy.com/) adresine gidin
2. Hesabınıza giriş yapın
3. Sağ üst köşeden **My Products** seçin
4. **Domains** bölümünde **sipsy.ai** domain'inizi bulun
5. Domain'in yanındaki **DNS** butonuna tıklayın

---

## 🔧 ADIM 2: Mevcut A Records'u Kontrol Edin

### 2.1 Records Sayfasında
1. **DNS Management** sayfası açılacak
2. **Records** bölümünü bulun
3. Mevcut **A** record'ları kontrol edin

### 2.2 Eski Records'u Silin (Eğer varsa)
Eğer aşağıdaki gibi kayıtlar varsa **DELETE** (çöp kutusu ikonu) ile silin:
- Type: **A**, Name: **@**, Points to: (herhangi bir IP)
- Type: **A**, Name: **www**, Points to: (herhangi bir IP)

⚠️ **Dikkat:** Sadece Type'ı **A** olan ve Name'i **@** veya **www** olan kayıtları silin!

---

## ➕ ADIM 3: Yeni A Records Ekleme

### 3.1 Ana Domain İçin A Record

1. **Add** butonuna tıklayın
2. Aşağıdaki bilgileri girin:

```
Type: A
Name: @
Data: XXX.XXX.XXX.XXX  ← Ben size vereceğim
TTL: 600 seconds (veya Custom: 600)
```

3. **Save** butonuna tıklayın

### 3.2 WWW Subdomain İçin A Record

1. Tekrar **Add** butonuna tıklayın
2. Aşağıdaki bilgileri girin:

```
Type: A
Name: www
Data: XXX.XXX.XXX.XXX  ← Aynı IP adresi
TTL: 600 seconds (veya Custom: 600)
```

3. **Save** butonuna tıklayın

---

## ✅ ADIM 4: Ayarları Doğrulayın

DNS Records sayfanızda şu iki kayıt görünmeli:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | XXX.XXX.XXX.XXX | 600 |
| A | www | XXX.XXX.XXX.XXX | 600 |

---

## ⏳ ADIM 5: DNS Propagation Bekleyin

### 5.1 Ne Kadar Sürer?
- **Minimum:** 10-15 dakika
- **Ortalama:** 30 dakika
- **Maximum:** 24-48 saat (nadir)

### 5.2 Propagation'ı Kontrol Edin

#### Yöntem 1: Online Tool (Kolay)
1. [WhatsMyDNS.net](https://www.whatsmydns.net/) adresine gidin
2. Domain: `sipsy.ai` yazın
3. Type: **A** seçin
4. **Search** butonuna tıklayın
5. Çoğu lokasyonda Static IP'niz görünmeli

#### Yöntem 2: Command Line
Windows PowerShell veya CMD'de:
```powershell
nslookup sipsy.ai
nslookup www.sipsy.ai
```

Sonuç olarak Static IP adresinizi görmelisiniz.

---

## 🚨 Sorun Giderme

### Propagation Çok Uzun Sürüyor
- **TTL değerini kontrol edin:** 600 saniye (10 dakika) olmalı
- **DNS cache'i temizleyin:**
  - Windows: `ipconfig /flushdns`
  - Mac: `sudo dscacheutil -flushcache`
  - Linux: `sudo systemd-resolve --flush-caches`

### IP Adresi Yanlış Görünüyor
- GoDaddy DNS Management sayfasını yenileyin
- Records'ı kontrol edin
- Doğru IP adresini girdiğinizden emin olun

### "This site can't be reached" Hatası
- DNS henüz propagate olmamış olabilir (biraz daha bekleyin)
- AWS Lightsail instance'ınızın **Running** durumda olduğunu kontrol edin
- Static IP'nin instance'a bağlı olduğunu kontrol edin

---

## 📧 DNS Propagation Tamamlandıktan Sonra

DNS propagation tamamlandığında bana haber verin. Ben de:
1. Nginx reverse proxy'yi aktif edeceğim
2. SSL sertifikasını (Let's Encrypt) kuracağım
3. HTTPS'i aktif edeceğim

Sonrasında siteniz **https://sipsy.ai** adresinde live olacak! 🚀

---

## 🔐 Opsiyonel: DNSSEC (Ekstra Güvenlik)

Eğer ekstra güvenlik isterseniz:
1. GoDaddy DNS Management sayfasında
2. **Settings** tabına gidin
3. **DNSSEC** bölümünü bulun
4. **Enable** butonuna tıklayın

⚠️ **Not:** DNSSEC'i aktif ederseniz DNS propagation 24-48 saat sürebilir.

---

## 📸 Örnek Ekran Görüntüleri

### Doğru DNS Records Görünümü:
```
Records (2)
┌──────────────────────────────────────────────────┐
│ Type │ Name │ Value              │ TTL          │
├──────────────────────────────────────────────────┤
│ A    │ @    │ XXX.XXX.XXX.XXX   │ 600 seconds  │
│ A    │ www  │ XXX.XXX.XXX.XXX   │ 600 seconds  │
└──────────────────────────────────────────────────┘
```

---

## ✉️ Bana İletmeniz Gerekenler

DNS ayarlarını tamamladıktan sonra, şu bilgiyi bana iletin:

```
✅ GoDaddy DNS ayarları tamamlandı
✅ A records eklendi (@ ve www)
✅ Propagation test edildi (isteğe bağlı)
```

Ben de size "DNS propagation tamamlandı mı?" diye kontrol edeceğim ve sonraki adımlara geçeceğiz!

---

## 🎯 Özet Checklist

- [ ] GoDaddy hesabına giriş yaptım
- [ ] sipsy.ai domain'inin DNS Management sayfasına gittim
- [ ] Eski A records'u sildim (varsa)
- [ ] Yeni A record ekledim: @ → Static IP
- [ ] Yeni A record ekledim: www → Static IP
- [ ] TTL değerini 600 saniye olarak ayarladım
- [ ] Records'u kaydettim
- [ ] DNS propagation'ı kontrol ettim (opsiyonel)
- [ ] Claude'a bilgi verdim

Tamamlandı! 🎉
