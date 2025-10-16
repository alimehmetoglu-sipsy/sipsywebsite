# AWS Lightsail Setup Guide - sipsy.ai

Bu guide'ı takip ederek AWS Lightsail altyapınızı oluşturacaksınız. Her adımda ekran görüntüleriyle desteklenmiş detaylı talimatlar bulacaksınız.

⏱️ **Tahmini Süre:** 15-20 dakika

---

## 🎯 ADIM 1: Lightsail Instance Oluşturma

### 1.1 AWS Console'a Giriş
1. [AWS Console](https://console.aws.amazon.com/) adresine gidin
2. Sağ üst köşeden **Region** seçin: **US East (N. Virginia) us-east-1** (en ucuz ve stabil)
3. Arama çubuğuna "Lightsail" yazın ve **Amazon Lightsail** seçin

### 1.2 Instance Oluştur
1. **Create instance** butonuna tıklayın
2. **Instance location:** US East (N. Virginia, Zone A) - Varsayılan olarak kalsın

### 1.3 Platform ve Blueprint Seçimi
1. **Select a platform:** **Linux/Unix** seçin
2. **Select a blueprint:**
   - **Apps + OS** tabını seçin
   - **Node.js** blueprint'ini seçin (otomatik Node.js 18+ kurulu gelir)

### 1.4 SSH Key Pair
1. **Change SSH key pair** bölümünde:
   - **Create new** seçin
   - Key pair name: `sipsy-lightsail-key`
   - **Download** butonuna tıklayıp `.pem` dosyasını indirin
   - ⚠️ **ÖNEMLİ:** Bu dosyayı güvenli bir yere kaydedin! Sonra lazım olacak

### 1.5 Instance Plan Seçimi
1. **Choose your instance plan:**
   - **$10 USD/month** planını seçin
   - ✅ 1 GB RAM
   - ✅ 1 vCPU
   - ✅ 40 GB SSD
   - ✅ 2 TB Transfer

### 1.6 Instance İsmi
1. **Identify your instance:**
   - Instance name: `sipsy-production`

### 1.7 Create Instance
1. **Create instance** butonuna tıklayın
2. ⏳ Instance oluşması 2-3 dakika sürer (Status: Running olana kadar bekleyin)

---

## 🌐 ADIM 2: Static IP Oluşturma

### 2.1 Static IP Ekle
1. Instance'ınız **Running** durumuna geldiğinde, instance adına tıklayın
2. **Networking** tabına gidin
3. **Create static IP** butonuna tıklayın
4. Static IP name: `sipsy-static-ip`
5. **Create** butonuna tıklayın

### 2.2 IP Adresini Kaydet
1. Static IP oluşturulduktan sonra, IP adresini kopyalayın
2. 📝 **Bu IP adresini bana iletin:** `XXX.XXX.XXX.XXX`

---

## 🗄️ ADIM 3: Lightsail Database Oluşturma

### 3.1 Database Oluştur
1. Sol menüden **Databases** seçin
2. **Create database** butonuna tıklayın

### 3.2 Database Ayarları
1. **Database location:** US East (N. Virginia, Zone A) - Instance ile aynı zone
2. **Pick your database engine:**
   - **PostgreSQL** seçin
   - Version: **16.x** (en güncel)

### 3.3 Database Plan
1. **Choose your database plan:**
   - **$15 USD/month** planını seçin
   - ✅ 1 GB RAM
   - ✅ 40 GB SSD
   - ✅ 100 GB Transfer
   - ℹ️ **Not:** İlk ay ücretsiz (yeni müşteriler için)

### 3.4 Database İsmi ve Master User
1. **Identify your database:**
   - Database name: `sipsy-db`
   - Master username: `strapiuser` (varsayılan: dbmasteruser, değiştirebilirsiniz)

### 3.5 Master Password
1. **Specify your master password:**
   - Otomatik üretilen şifreyi kullanın (önerilen)
   - VEYA kendi şifrenizi girin (min 8 karakter, büyük/küçük harf, rakam)
   - ⚠️ **ÖNEMLİ:** Show password'a tıklayıp şifreyi kopyalayın/kaydedin

### 3.6 Create Database
1. **Create database** butonuna tıklayın
2. ⏳ Database oluşması 5-10 dakika sürer (Status: Available olana kadar bekleyin)

### 3.7 Connection Details
1. Database **Available** durumuna geldiğinde, database adına tıklayın
2. **Connect** tabında şu bilgileri bulacaksınız:
   - **Endpoint:** `ls-xxxxxxxxxxxxx.czowadgeezqi.us-east-1.rds.amazonaws.com`
   - **Port:** `5432`
   - **Username:** `strapiuser` (veya belirlediğiniz)
   - **Password:** (daha önce kaydettiğiniz)
   - **Database name:** `postgres` (varsayılan, değişmez)

3. 📝 **Bu bilgileri bana şu formatta iletin:**
```
DATABASE_HOST=ls-xxxxxxxxxxxxx.czowadgeezqi.us-east-1.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_USERNAME=strapiuser
DATABASE_PASSWORD=your-password-here
DATABASE_NAME=postgres
```

---

## 📦 ADIM 4: S3 Bucket Oluşturma

### 4.1 S3'ye Git
1. AWS Console'da arama çubuğuna "S3" yazın
2. **S3** servisini seçin

### 4.2 Bucket Oluştur
1. **Create bucket** butonuna tıklayın
2. **Bucket name:** `sipsy-media-uploads` (global unique olmalı, varsa `sipsy-media-uploads-2025` deneyin)
3. **AWS Region:** **US East (N. Virginia) us-east-1** (Lightsail ile aynı)
4. **Object Ownership:** **ACLs disabled** (varsayılan)
5. **Block Public Access settings:**
   - ⚠️ **UNCHECKED** (kapatın): "Block all public access"
   - ✅ Uyarı mesajını okuyup onaylayın
6. **Bucket Versioning:** Disabled (varsayılan)
7. **Tags:** (opsiyonel)
   - Key: `Project`, Value: `sipsy-ai`
8. **Default encryption:** Enable (varsayılan)
9. **Create bucket** butonuna tıklayın

### 4.3 CORS Configuration
1. Oluşturduğunuz bucket'a tıklayın
2. **Permissions** tabına gidin
3. **Cross-origin resource sharing (CORS)** bölümüne scroll edin
4. **Edit** butonuna tıklayın
5. Aşağıdaki JSON'u yapıştırın:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "POST", "PUT", "DELETE", "HEAD"],
        "AllowedOrigins": ["https://sipsy.ai", "https://www.sipsy.ai"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
    }
]
```

6. **Save changes** butonuna tıklayın

### 4.4 Bucket Policy (Public Read)
1. Aynı **Permissions** tabında, **Bucket policy** bölümüne gidin
2. **Edit** butonuna tıklayın
3. Aşağıdaki policy'yi yapıştırın (bucket name'i değiştirin):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::sipsy-media-uploads/*"
        }
    ]
}
```

4. **Save changes** butonuna tıklayın

5. 📝 **Bucket name'i bana iletin:**
```
AWS_BUCKET=sipsy-media-uploads
AWS_REGION=us-east-1
```

---

## 🔐 ADIM 5: IAM User Oluşturma (S3 Access)

### 5.1 IAM'e Git
1. AWS Console'da arama çubuğuna "IAM" yazın
2. **IAM** servisini seçin

### 5.2 User Oluştur
1. Sol menüden **Users** seçin
2. **Create user** butonuna tıklayın
3. **User name:** `strapi-s3-user`
4. **Next** butonuna tıklayın

### 5.3 Permissions (S3 Full Access)
1. **Attach policies directly** seçin
2. Arama kutusuna "S3" yazın
3. **AmazonS3FullAccess** policy'sini seçin (checkbox)
4. **Next** butonuna tıklayın
5. **Create user** butonuna tıklayın

### 5.4 Access Key Oluştur
1. Oluşturduğunuz user'a tıklayın (`strapi-s3-user`)
2. **Security credentials** tabına gidin
3. **Access keys** bölümünde **Create access key** butonuna tıklayın
4. **Use case:** **Application running outside AWS** seçin
5. En alttaki checkbox'ı işaretleyin (I understand...)
6. **Next** butonuna tıklayın
7. **Description tag:** `Strapi S3 Upload` (opsiyonel)
8. **Create access key** butonuna tıklayın

### 5.5 Credentials Kaydet
1. ⚠️ **ÖNEMLİ:** Bu ekrandan ayrıldıktan sonra Secret Key'i bir daha göremezsiniz!
2. **Access key** ve **Secret access key**'i kopyalayın
3. VEYA **Download .csv file** butonuna tıklayıp kaydedin

4. 📝 **Bu bilgileri bana iletin:**
```
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📤 ADIM 6: SSH Key Dosyasını Bana İletin

### 6.1 SSH Key'i Hazırla
1. ADIM 1.4'te indirdiğiniz `sipsy-lightsail-key.pem` dosyasını bulun
2. Bu dosyayı bana güvenli bir şekilde iletin

### 6.2 (Alternatif) SSH Key'i Metin Olarak Gönder
Eğer dosya olarak gönderemiyorsanız:
1. `.pem` dosyasını bir text editor ile açın
2. Tüm içeriği kopyalayın (-----BEGIN RSA PRIVATE KEY----- ile başlayan ve -----END RSA PRIVATE KEY----- ile biten kısım)
3. Bana gönderin

---

## ✅ TAMAMLANACAK KONTROL LİSTESİ

Tüm bu adımları tamamladıktan sonra, bana şu bilgileri iletmeniz gerekiyor:

```
# Lightsail Instance
LIGHTSAIL_IP=XXX.XXX.XXX.XXX

# Database Connection
DATABASE_HOST=ls-xxxxxxxxxxxxx.czowadgeezqi.us-east-1.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_USERNAME=strapiuser
DATABASE_PASSWORD=your-password-here
DATABASE_NAME=postgres

# AWS S3
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_BUCKET=sipsy-media-uploads

# SSH Key
[sipsy-lightsail-key.pem dosyasının içeriği veya dosyanın kendisi]
```

Bu bilgileri aldıktan sonra, Phase 2'ye geçip tüm kod değişikliklerini yapacağım! 🚀

---

## 💰 Maliyet Özeti

- ✅ Lightsail Instance ($10/ay)
- ✅ Lightsail Database ($15/ay - ilk ay free)
- ✅ Static IP (ücretsiz, instance ile birlikte)
- ✅ S3 Storage (~$0.023/GB = ilk 50 GB için ~$1-2/ay)
- ✅ IAM User (ücretsiz)

**İlk Ay Toplam:** ~$10-12
**2. Ay ve Sonrası:** ~$25-27/ay

---

## ❓ Sorun mu Yaşıyorsunuz?

Herhangi bir adımda takılırsanız, o adımın ekran görüntüsünü gönderin, size yardımcı olayım!
