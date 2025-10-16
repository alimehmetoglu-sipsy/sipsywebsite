#!/bin/bash

# Strapi Database Backup Script
# Bu script düzenli olarak Strapi verilerini yedekler

# Değişkenler
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup-$DATE.tar.gz"

# Backup dizini oluştur
mkdir -p "$BACKUP_DIR"

# Strapi export komutu
echo "Starting Strapi backup..."
cd backend
npm run strapi export -- --no-encrypt --file "../$BACKUP_FILE"

# Sonuç
if [ $? -eq 0 ]; then
    echo "✓ Backup successful: $BACKUP_FILE"

    # Eski backup'ları temizle (30 günden eski)
    find "$BACKUP_DIR" -name "backup-*.tar.gz" -mtime +30 -delete
    echo "✓ Old backups cleaned"
else
    echo "✗ Backup failed!"
    exit 1
fi
