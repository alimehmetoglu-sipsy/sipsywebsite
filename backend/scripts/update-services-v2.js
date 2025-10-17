const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'));

// New service-focused descriptions
const serviceDescriptions = {
  // AI Strategy & Consulting - English
  'njpzs6mzi1n1e5aukhaxbrva_en': {
    document_id: 'njpzs6mzi1n1e5aukhaxbrva',
    locale: 'en',
    description: "We help businesses unlock the potential of AI through strategic consulting. Our experts work closely with you to understand your challenges, identify where AI can make the biggest impact, and build a clear roadmap for success. Whether you're just starting your AI journey or looking to scale existing initiatives, we provide the guidance and expertise you need to make smart decisions and achieve real results."
  },

  // AI Strategy & Consulting - Turkish
  'ybp3zy95i9niaznded6fy4v0_tr': {
    document_id: 'ybp3zy95i9niaznded6fy4v0',
    locale: 'tr',
    description: "İşletmenizin AI potansiyelini ortaya çıkarmak için stratejik danışmanlık hizmeti sunuyoruz. Uzmanlarımız, zorluklarınızı anlamak, AI'ın en büyük etkiyi yapabileceği alanları belirlemek ve başarı için net bir yol haritası oluşturmak üzere sizinle yakın çalışır. AI yolculuğunuza yeni başlıyor olun ya da mevcut girişimlerinizi ölçeklendirmek istiyor olun, akıllı kararlar almanız ve gerçek sonuçlar elde etmeniz için ihtiyaç duyduğunuz rehberlik ve uzmanlığı sağlıyoruz."
  },

  // Machine Learning & AI Development - English
  'rrmdxw17w69t67wrkxgcwg9l_en': {
    document_id: 'rrmdxw17w69t67wrkxgcwg9l',
    locale: 'en',
    description: "We design and build intelligent AI systems tailored to your specific business needs. From analyzing data patterns to understanding customer behavior, our custom solutions help you automate decisions, predict outcomes, and deliver personalized experiences. Our team handles everything from concept to deployment, ensuring your AI solutions are practical, reliable, and ready to grow with your business."
  },

  // Machine Learning & AI Development - Turkish
  'f0wdmzf9icifmiuvlkugpqvz_tr': {
    document_id: 'f0wdmzf9icifmiuvlkugpqvz',
    locale: 'tr',
    description: "İşletmenizin özel ihtiyaçlarına göre tasarlanmış akıllı AI sistemleri geliştiriyoruz. Veri kalıplarını analiz etmekten müşteri davranışlarını anlamaya kadar, özel çözümlerimiz kararları otomatikleştirmenize, sonuçları tahmin etmenize ve kişiselleştirilmiş deneyimler sunmanıza yardımcı olur. Ekibimiz konsepten dağıtıma kadar her şeyi yönetir, AI çözümlerinizin pratik, güvenilir ve işletmenizle birlikte büyümeye hazır olmasını sağlar."
  },

  // RPA & Hyperautomation - English
  'mlivin69yi7pllrt3b5ri37n_en': {
    document_id: 'mlivin69yi7pllrt3b5ri37n',
    locale: 'en',
    description: "We automate your repetitive business processes so your team can focus on what matters most. Our intelligent automation solutions combine software robots with AI to handle everything from data entry and document processing to complex workflows and decision-making. The result? Faster operations, fewer errors, and significant cost savings that free up your resources for strategic growth."
  },

  // RPA & Hyperautomation - Turkish
  'hqyb5pe58nr7besot3j1qwcj_tr': {
    document_id: 'hqyb5pe58nr7besot3j1qwcj',
    locale: 'tr',
    description: "Ekibinizin en önemli işlere odaklanabilmesi için tekrarlayan iş süreçlerinizi otomatikleştiriyoruz. Akıllı otomasyon çözümlerimiz, veri girişi ve doküman işlemeden karmaşık iş akışları ve karar vermeye kadar her şeyi yönetmek için yazılım robotlarını AI ile birleştirir. Sonuç? Daha hızlı operasyonlar, daha az hata ve kaynaklarınızı stratejik büyüme için serbest bırakan önemli maliyet tasarrufları."
  }
};

try {
  console.log('Starting service updates with new user-friendly descriptions...\n');

  let successCount = 0;
  let failCount = 0;

  // Update each service
  Object.keys(serviceDescriptions).forEach(key => {
    const service = serviceDescriptions[key];

    const result = db.prepare(`
      UPDATE services
      SET description = ?,
          updated_at = datetime('now')
      WHERE document_id = ? AND locale = ? AND published_at IS NOT NULL
    `).run(service.description, service.document_id, service.locale);

    if (result.changes > 0) {
      console.log(`✅ Updated ${service.locale.toUpperCase()}: ${service.document_id.substring(0, 10)}...`);
      successCount++;
    } else {
      console.log(`❌ Failed to update ${service.locale.toUpperCase()}: ${service.document_id.substring(0, 10)}...`);
      failCount++;
    }
  });

  console.log(`\n📊 Summary: ${successCount} successful, ${failCount} failed`);

  // Display updated services
  console.log('\n═══════════════════════════════════════════════════════════\n');
  const updatedServices = db.prepare(`
    SELECT title, description, locale
    FROM services
    WHERE published_at IS NOT NULL
    ORDER BY locale DESC, title
  `).all();

  updatedServices.forEach((service, index) => {
    console.log(`${index + 1}. ${service.title} [${service.locale.toUpperCase()}]`);
    console.log('─'.repeat(65));
    console.log(service.description);
    console.log('\n');
  });

  console.log('✨ All services updated successfully!\n');

} catch (error) {
  console.error('❌ Error updating services:', error.message);
  process.exit(1);
} finally {
  db.close();
}
