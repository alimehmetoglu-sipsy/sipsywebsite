const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'));

// Improved Turkish descriptions mapped by document_id
const turkishDescriptions = {
  // AI Stratejisi & Danışmanlığı
  'ybp3zy95i9niaznded6fy4v0': "İş hedeflerinizle uyumlu kapsamlı bir AI stratejisi geliştirmek için uzman danışmanlarımızla ortaklık kurun. Mevcut yeteneklerinizin kapsamlı değerlendirmesini yapar, yüksek etkili AI fırsatlarını belirler ve uygulama için eyleme geçirilebilir yol haritaları oluştururuz. Yaklaşımımız, AI girişimlerinizin ölçülebilir yatırım getirisi ve sürdürülebilir rekabet avantajı sağlamasını garanti etmek için teknik uzmanlığı iş anlayışıyla birleştirir.",

  // Makine Öğrenimi ve Yapay Zeka Geliştirme
  'f0wdmzf9icifmiuvlkugpqvz': "Özel makine öğrenimi ve AI geliştirme hizmetlerimizle verilerinizi akıllı iş çözümlerine dönüştürün. Ekibimiz, tahmine dayalı analitiklerden ve öneri sistemlerinden doğal dil işleme ve bilgisayarlı görü uygulamalarına kadar üretime hazır ML modelleri oluşturma konusunda uzmanlaşmıştır. Veri hazırlama ve model eğitiminden dağıtım ve izlemeye kadar tüm ML yaşam döngüsünü yönetiyor, AI çözümlerinizin ölçeklenebilir, güvenilir ve sürekli gelişen olmasını sağlıyoruz.",

  // RPA & Hyperautomation
  'hqyb5pe58nr7besot3j1qwcj': "Geleneksel RPA'nın ötesine geçen akıllı otomasyon çözümlerimizle operasyonlarınızda devrim yaratın. Robotik süreç otomasyonu, AI destekli karar verme ve iş akışı orkestrasyonunu birleştiren uçtan uca otomasyon stratejileri tasarlıyor ve uyguluyoruz. Hiperotomasyön yaklaşımımız manuel görevleri ortadan kaldırır, operasyonel maliyetleri %70'e kadar azaltır, hataları minimize eder ve iş gücünüzün büyüme ve yeniliği yönlendiren yüksek değerli stratejik faaliyetlere odaklanmasını sağlar."
};

try {
  console.log('Updating Turkish service descriptions...\n');

  let totalUpdated = 0;

  // Update each Turkish service
  Object.keys(turkishDescriptions).forEach(documentId => {
    const description = turkishDescriptions[documentId];

    const result = db.prepare(`
      UPDATE services
      SET description = ?,
          updated_at = datetime('now')
      WHERE document_id = ? AND locale = 'tr' AND published_at IS NOT NULL
    `).run(description, documentId);

    console.log(`Updated TR service ${documentId}: ${result.changes} row(s) affected`);
    totalUpdated += result.changes;
  });

  console.log(`\n✅ Total Turkish services updated: ${totalUpdated}`);

  // Display all updated services
  console.log('\n📋 All services (EN & TR):');
  const allServices = db.prepare(`
    SELECT id, title,
           SUBSTR(description, 1, 80) || '...' as description_preview,
           locale
    FROM services
    WHERE published_at IS NOT NULL
    ORDER BY locale, title
  `).all();

  console.table(allServices);

} catch (error) {
  console.error('❌ Error updating Turkish services:', error.message);
  process.exit(1);
} finally {
  db.close();
}
