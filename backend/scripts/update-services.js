const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'));

// Improved descriptions for each service
const improvedDescriptions = {
  // AI Strategy & Consulting
  'njpzs6mzi1n1e5aukhaxbrva': {
    en: "Partner with our expert consultants to develop a comprehensive AI strategy that aligns with your business objectives. We conduct thorough assessments of your current capabilities, identify high-impact AI opportunities, and create actionable roadmaps for implementation. Our approach combines technical expertise with business acumen to ensure your AI initiatives deliver measurable ROI and sustainable competitive advantage.",
    tr: "İş hedeflerinizle uyumlu kapsamlı bir AI stratejisi geliştirmek için uzman danışmanlarımızla ortaklık kurun. Mevcut yeteneklerinizin kapsamlı değerlendirmesini yapar, yüksek etkili AI fırsatlarını belirler ve uygulama için eyleme geçirilebilir yol haritaları oluştururuz. Yaklaşımımız, AI girişimlerinizin ölçülebilir yatırım getirisi ve sürdürülebilir rekabet avantajı sağlamasını garanti etmek için teknik uzmanlığı iş anlayışıyla birleştirir."
  },

  // Machine Learning & AI Development
  'rrmdxw17w69t67wrkxgcwg9l': {
    en: "Transform your data into intelligent business solutions with our custom machine learning and AI development services. Our team specializes in building production-ready ML models, from predictive analytics and recommendation systems to natural language processing and computer vision applications. We handle the entire ML lifecycle—from data preparation and model training to deployment and monitoring—ensuring your AI solutions are scalable, reliable, and continuously improving.",
    tr: "Özel makine öğrenimi ve AI geliştirme hizmetlerimizle verilerinizi akıllı iş çözümlerine dönüştürün. Ekibimiz, tahmine dayalı analitiklerden ve öneri sistemlerinden doğal dil işleme ve bilgisayarlı görü uygulamalarına kadar üretime hazır ML modelleri oluşturma konusunda uzmanlaşmıştır. Veri hazırlama ve model eğitiminden dağıtım ve izlemeye kadar tüm ML yaşam döngüsünü yönetiyor, AI çözümlerinizin ölçeklenebilir, güvenilir ve sürekli gelişen olmasını sağlıyoruz."
  },

  // RPA & Hyperautomation
  'mlivin69yi7pllrt3b5ri37n': {
    en: "Revolutionize your operations with our intelligent automation solutions that go beyond traditional RPA. We design and implement end-to-end automation strategies that combine robotic process automation, AI-powered decision making, and workflow orchestration. Our hyperautomation approach eliminates manual tasks, reduces operational costs by up to 70%, minimizes errors, and enables your workforce to focus on high-value strategic activities that drive growth and innovation.",
    tr: "Geleneksel RPA'nın ötesine geçen akıllı otomasyon çözümlerimizle operasyonlarınızda devrim yaratın. Robotik süreç otomasyonu, AI destekli karar verme ve iş akışı orkestrasyonunu birleştiren uçtan uca otomasyon stratejileri tasarlıyor ve uyguluyoruz. Hiperotomasyön yaklaşımımız manuel görevleri ortadan kaldırır, operasyonel maliyetleri %70'e kadar azaltır, hataları minimize eder ve iş gücünüzün büyüme ve yeniliği yönlendiren yüksek değerli stratejik faaliyetlere odaklanmasını sağlar."
  }
};

try {
  console.log('Starting service description updates...\n');

  // For each service document
  Object.keys(improvedDescriptions).forEach(documentId => {
    const descriptions = improvedDescriptions[documentId];

    // Update English version
    const enResult = db.prepare(`
      UPDATE services
      SET description = ?,
          updated_at = datetime('now')
      WHERE document_id = ? AND locale = 'en' AND published_at IS NOT NULL
    `).run(descriptions.en, documentId);

    console.log(`Updated EN for ${documentId}: ${enResult.changes} row(s) affected`);

    // Update Turkish version
    const trResult = db.prepare(`
      UPDATE services
      SET description = ?,
          updated_at = datetime('now')
      WHERE document_id = ? AND locale = 'tr' AND published_at IS NOT NULL
    `).run(descriptions.tr, documentId);

    console.log(`Updated TR for ${documentId}: ${trResult.changes} row(s) affected\n`);
  });

  console.log('✅ All service descriptions updated successfully!');

  // Display updated services
  console.log('\nUpdated services:');
  const updatedServices = db.prepare(`
    SELECT id, document_id, title,
           SUBSTR(description, 1, 100) || '...' as description_preview,
           locale, published_at
    FROM services
    WHERE published_at IS NOT NULL
    ORDER BY locale, title
  `).all();

  console.table(updatedServices);

} catch (error) {
  console.error('❌ Error updating services:', error.message);
  process.exit(1);
} finally {
  db.close();
}
