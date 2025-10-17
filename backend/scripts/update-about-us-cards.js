const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'));

// NEW SHORT DESCRIPTIONS - Services style
const cardDescriptions = {
  // ENGLISH - Our Areas of Expertise (Cards 131-134)
  131: {
    en: "We specialize in building intelligent automation solutions that transform manual processes into efficient, error-free workflows.",
    tr: "Manuel süreçleri verimli ve hatasız iş akışlarına dönüştüren akıllı otomasyon çözümleri konusunda uzmanız."
  },
  132: {
    en: "We develop production-ready AI systems that solve real business problems and deliver measurable results.",
    tr: "Gerçek iş sorunlarını çözen ve ölçülebilir sonuçlar sağlayan üretime hazır AI sistemleri geliştiriyoruz."
  },
  133: {
    en: "We connect your systems seamlessly, creating unified data flows that power better decision-making.",
    tr: "Sistemlerinizi sorunsuz bir şekilde bağlıyor, daha iyi karar vermeyi destekleyen birleşik veri akışları oluşturuyoruz."
  },
  134: {
    en: "We build robust data infrastructure that turns raw information into actionable business insights.",
    tr: "Ham bilgiyi işlenebilir iş içgörülerine dönüştüren sağlam veri altyapısı kuruyoruz."
  },

  // ENGLISH - Proven Track Record (Cards 135-139)
  135: {
    en: "Industry leaders trust us to guide their AI and automation journey with innovative, proven solutions.",
    tr: "Sektör liderleri, AI ve otomasyon yolculuklarında yenilikçi ve kanıtlanmış çözümlerimizle bize güveniyor."
  },
  136: {
    en: "We consistently deliver projects on time and on budget, maintaining our commitment to quality and excellence.",
    tr: "Kalite ve mükemmelliğe olan bağlılığımızı koruyarak projeleri sürekli olarak zamanında ve bütçe dahilinde teslim ediyoruz."
  },
  137: {
    en: "Our clients stay with us because we deliver results that matter and partnerships built on trust.",
    tr: "Müşterilerimiz bizimle kalıyor çünkü önemli sonuçlar sunuyor ve güvene dayalı ortaklıklar kuruyoruz."
  },
  138: {
    en: "We meet deadlines through careful planning, clear communication, and a dedicated team that gets things done.",
    tr: "Dikkatli planlama, net iletişim ve işleri halleden özverili bir ekiple son tarihleri tutturuyoruz."
  },
  139: {
    en: "Every solution we build is designed to deliver tangible business value and measurable return on investment.",
    tr: "Oluşturduğumuz her çözüm, somut iş değeri ve ölçülebilir yatırım getirisi sağlamak için tasarlanmıştır."
  },

  // TURKISH DUPLICATES (Cards 212-220)
  212: {
    en: "We specialize in building intelligent automation solutions that transform manual processes into efficient, error-free workflows.",
    tr: "Manuel süreçleri verimli ve hatasız iş akışlarına dönüştüren akıllı otomasyon çözümleri konusunda uzmanız."
  },
  213: {
    en: "We develop production-ready AI systems that solve real business problems and deliver measurable results.",
    tr: "Gerçek iş sorunlarını çözen ve ölçülebilir sonuçlar sağlayan üretime hazır AI sistemleri geliştiriyoruz."
  },
  214: {
    en: "We connect your systems seamlessly, creating unified data flows that power better decision-making.",
    tr: "Sistemlerinizi sorunsuz bir şekilde bağlıyor, daha iyi karar vermeyi destekleyen birleşik veri akışları oluşturuyoruz."
  },
  215: {
    en: "We build robust data infrastructure that turns raw information into actionable business insights.",
    tr: "Ham bilgiyi işlenebilir iş içgörülerine dönüştüren sağlam veri altyapısı kuruyoruz."
  },
  216: {
    en: "Industry leaders trust us to guide their AI and automation journey with innovative, proven solutions.",
    tr: "Sektör liderleri, AI ve otomasyon yolculuklarında yenilikçi ve kanıtlanmış çözümlerimizle bize güveniyor."
  },
  217: {
    en: "We consistently deliver projects on time and on budget, maintaining our commitment to quality and excellence.",
    tr: "Kalite ve mükemmelliğe olan bağlılığımızı koruyarak projeleri sürekli olarak zamanında ve bütçe dahilinde teslim ediyoruz."
  },
  218: {
    en: "Our clients stay with us because we deliver results that matter and partnerships built on trust.",
    tr: "Müşterilerimiz bizimle kalıyor çünkü önemli sonuçlar sunuyor ve güvene dayalı ortaklıklar kuruyoruz."
  },
  219: {
    en: "We meet deadlines through careful planning, clear communication, and a dedicated team that gets things done.",
    tr: "Dikkatli planlama, net iletişim ve işleri halleden özverili bir ekiple son tarihleri tutturuyoruz."
  },
  220: {
    en: "Every solution we build is designed to deliver tangible business value and measurable return on investment.",
    tr: "Oluşturduğumuz her çözüm, somut iş değeri ve ölçülebilir yatırım getirisi sağlamak için tasarlanmıştır."
  }
};

try {
  console.log('\n🔄 UPDATING ABOUT US CARDS\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Determine locale based on section
  const getLocaleForCard = (cardId) => {
    // English cards: 131-139
    // Turkish cards: 212-220
    return cardId >= 212 ? 'tr' : 'en';
  };

  let updatedCount = 0;

  Object.keys(cardDescriptions).forEach(cardId => {
    const id = parseInt(cardId);
    const locale = getLocaleForCard(id);
    const description = cardDescriptions[id][locale];

    // Get card title before update
    const card = db.prepare(`
      SELECT title FROM components_about_us_content_cards WHERE id = ?
    `).get(id);

    if (card) {
      const result = db.prepare(`
        UPDATE components_about_us_content_cards
        SET description = ?
        WHERE id = ?
      `).run(description, id);

      if (result.changes > 0) {
        console.log(`✅ [${locale.toUpperCase()}] ${card.title}`);
        console.log(`   "${description.substring(0, 80)}..."\n`);
        updatedCount++;
      }
    }
  });

  console.log(`\n📊 Summary: ${updatedCount} cards updated successfully!\n`);

  // Display updated cards
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('📋 UPDATED CARDS:\n');

  const updatedCards = db.prepare(`
    SELECT id, title, description
    FROM components_about_us_content_cards
    WHERE id IN (131, 132, 133, 134, 135, 136, 137, 138, 139, 212, 213, 214, 215, 216, 217, 218, 219, 220)
    ORDER BY id
  `).all();

  updatedCards.forEach(card => {
    const locale = card.id >= 212 ? 'TR' : 'EN';
    console.log(`${card.id}. [${locale}] ${card.title}`);
    console.log(`   ${card.description}\n`);
  });

  console.log('✨ All About Us cards have been updated with short, service-style descriptions!\n');

} catch (error) {
  console.error('❌ Error updating cards:', error.message);
  process.exit(1);
} finally {
  db.close();
}
