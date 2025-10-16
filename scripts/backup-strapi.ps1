# Strapi Database Backup Script (Windows PowerShell)
# Bu script düzenli olarak Strapi verilerini yedekler

# Değişkenler
$BACKUP_DIR = "./backups"
$DATE = Get-Date -Format "yyyyMMdd-HHmmss"
$BACKUP_FILE = "$BACKUP_DIR/backup-$DATE.tar.gz"

# Backup dizini oluştur
New-Item -ItemType Directory -Force -Path $BACKUP_DIR | Out-Null

# Strapi export komutu
Write-Host "Starting Strapi backup..." -ForegroundColor Yellow
Set-Location backend
npm run strapi export -- --no-encrypt --file "../$BACKUP_FILE"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backup successful: $BACKUP_FILE" -ForegroundColor Green

    # Eski backup'ları temizle (30 günden eski)
    $cutoffDate = (Get-Date).AddDays(-30)
    Get-ChildItem -Path $BACKUP_DIR -Filter "backup-*.tar.gz" |
        Where-Object { $_.LastWriteTime -lt $cutoffDate } |
        Remove-Item -Force
    Write-Host "✓ Old backups cleaned" -ForegroundColor Green
} else {
    Write-Host "✗ Backup failed!" -ForegroundColor Red
    exit 1
}

Set-Location ..
