const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'));

try {
  console.log('\n🔧 FIXING TURKISH ABOUT US PAGE\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Turkish About Us published record
  const TR_ABOUT_US_ID = 24;

  // Get current Turkish sections
  const currentSections = db.prepare(`
    SELECT cmp_id, field, \`order\`
    FROM about_us_cmps
    WHERE entity_id = ? AND field = 'sections'
    ORDER BY \`order\`
  `).all(TR_ABOUT_US_ID);

  console.log('Current Turkish sections:', currentSections.length);
  console.table(currentSections);

  // We need to add 3 new Turkish sections:
  // 1. Our Approach (text) - already exists as section 124 in EN
  // 2. Our Areas of Expertise (cards) - section 125 in EN
  // 3. Proven Track Record (cards) - section 126 in EN

  // Create Turkish versions of these sections
  console.log('\n📝 Creating Turkish content sections...\n');

  // 1. Our Approach (text)
  const approachSection = db.prepare(`
    INSERT INTO components_about_us_content_sections (section_title, section_type, description, \`order\`)
    VALUES (?, ?, ?, ?)
  `).run(
    'Yaklaşımımız',
    'text',
    'Teknik mükemmelliği iş anlayışıyla birleştiriyoruz. Her proje kapsamlı bir analiz ile başlar, çevik geliştirme ile devam eder ve ölçülebilir başarı metrikleri ve sürekli destek ile tamamlanır.',
    0
  );
  console.log(`✅ Created "Yaklaşımımız" section (ID: ${approachSection.lastInsertRowid})`);

  // 2. Our Areas of Expertise (cards)
  const expertiseSection = db.prepare(`
    INSERT INTO components_about_us_content_sections (section_title, section_type, description, \`order\`)
    VALUES (?, ?, ?, ?)
  `).run(
    'Uzmanlık Alanlarımız',
    'cards',
    null,
    0
  );
  console.log(`✅ Created "Uzmanlık Alanlarımız" section (ID: ${expertiseSection.lastInsertRowid})`);

  // Link Turkish expertise cards (212-215) to this section
  const expertiseCards = [212, 213, 214, 215];
  expertiseCards.forEach((cardId, index) => {
    db.prepare(`
      INSERT INTO components_about_us_content_sections_cmps (entity_id, cmp_id, component_type, field, \`order\`)
      VALUES (?, ?, ?, ?, ?)
    `).run(expertiseSection.lastInsertRowid, cardId, 'about-us.content-card', 'cards', index + 1);
  });
  console.log(`   Linked ${expertiseCards.length} cards`);

  // 3. Proven Track Record (cards)
  const trackRecordSection = db.prepare(`
    INSERT INTO components_about_us_content_sections (section_title, section_type, description, \`order\`)
    VALUES (?, ?, ?, ?)
  `).run(
    'Kanıtlanmış Başarı Geçmişi',
    'cards',
    null,
    0
  );
  console.log(`✅ Created "Kanıtlanmış Başarı Geçmişi" section (ID: ${trackRecordSection.lastInsertRowid})`);

  // Link Turkish track record cards (216-220) to this section
  const trackRecordCards = [216, 217, 218, 219, 220];
  trackRecordCards.forEach((cardId, index) => {
    db.prepare(`
      INSERT INTO components_about_us_content_sections_cmps (entity_id, cmp_id, component_type, field, \`order\`)
      VALUES (?, ?, ?, ?, ?)
    `).run(trackRecordSection.lastInsertRowid, cardId, 'about-us.content-card', 'cards', index + 1);
  });
  console.log(`   Linked ${trackRecordCards.length} cards`);

  // Now link these sections to Turkish About Us
  console.log('\n🔗 Linking sections to Turkish About Us...\n');

  // Get the highest order number
  const maxOrder = db.prepare(`
    SELECT MAX(\`order\`) as max_order
    FROM about_us_cmps
    WHERE entity_id = ? AND field = 'sections'
  `).get(TR_ABOUT_US_ID);

  const startOrder = (maxOrder.max_order || 0) + 1;

  // Link sections in order
  const sectionsToLink = [
    { id: expertiseSection.lastInsertRowid, title: 'Uzmanlık Alanlarımız' },
    { id: trackRecordSection.lastInsertRowid, title: 'Kanıtlanmış Başarı Geçmişi' },
    { id: approachSection.lastInsertRowid, title: 'Yaklaşımımız' },
  ];

  sectionsToLink.forEach((section, index) => {
    db.prepare(`
      INSERT INTO about_us_cmps (entity_id, cmp_id, component_type, field, \`order\`)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      TR_ABOUT_US_ID,
      section.id,
      'about-us.content-section',
      'sections',
      startOrder + index
    );
    console.log(`✅ Linked "${section.title}" (order: ${startOrder + index})`);
  });

  // Verify the result
  console.log('\n📊 Updated Turkish About Us sections:\n');
  const updatedSections = db.prepare(`
    SELECT
      c.cmp_id as component_id,
      s.section_title,
      s.section_type,
      c.\`order\`
    FROM about_us_cmps c
    LEFT JOIN components_about_us_content_sections s ON c.cmp_id = s.id
    WHERE c.entity_id = ? AND c.field = 'sections'
    ORDER BY c.\`order\`
  `).all(TR_ABOUT_US_ID);

  console.table(updatedSections);

  console.log('\n✨ Turkish About Us page has been fixed!\n');
  console.log('Now both EN and TR have all sections:\n');
  console.log('  1. Our Areas of Expertise / Uzmanlık Alanlarımız');
  console.log('  2. Proven Track Record / Kanıtlanmış Başarı Geçmişi');
  console.log('  3. Our Approach / Yaklaşımımız');
  console.log('  4. Technologies We Use / Kullandığımız Teknolojiler\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
} finally {
  db.close();
}
