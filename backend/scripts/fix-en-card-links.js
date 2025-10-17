const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'));

try {
  console.log('\n🔧 FIXING ENGLISH CARD LINKS\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // English sections are 125 (Expertise) and 126 (Track Record)
  const EN_EXPERTISE_SECTION = 125;
  const EN_TRACK_RECORD_SECTION = 126;

  // English cards should be 131-134 (Expertise) and 135-139 (Track Record)
  const EN_EXPERTISE_CARDS = [131, 132, 133, 134];
  const EN_TRACK_RECORD_CARDS = [135, 136, 137, 138, 139];

  console.log('📝 Step 1: Remove incorrect Turkish card links from English sections\n');

  // Delete existing card links for Expertise section
  const deleteExpertise = db.prepare(`
    DELETE FROM components_about_us_content_sections_cmps
    WHERE entity_id = ? AND field = 'cards'
  `).run(EN_EXPERTISE_SECTION);
  console.log(`✅ Removed ${deleteExpertise.changes} links from "Our Areas of Expertise"`);

  // Delete existing card links for Track Record section
  const deleteTrackRecord = db.prepare(`
    DELETE FROM components_about_us_content_sections_cmps
    WHERE entity_id = ? AND field = 'cards'
  `).run(EN_TRACK_RECORD_SECTION);
  console.log(`✅ Removed ${deleteTrackRecord.changes} links from "Proven Track Record"`);

  console.log('\n📝 Step 2: Link correct English cards\n');

  // Link Expertise cards (131-134)
  console.log('Linking "Our Areas of Expertise" cards:');
  EN_EXPERTISE_CARDS.forEach((cardId, index) => {
    const card = db.prepare(`
      SELECT title FROM components_about_us_content_cards WHERE id = ?
    `).get(cardId);

    db.prepare(`
      INSERT INTO components_about_us_content_sections_cmps
      (entity_id, cmp_id, component_type, field, \`order\`)
      VALUES (?, ?, ?, ?, ?)
    `).run(EN_EXPERTISE_SECTION, cardId, 'about-us.content-card', 'cards', index + 1);

    console.log(`  ✅ Card ${cardId}: ${card.title}`);
  });

  // Link Track Record cards (135-139)
  console.log('\nLinking "Proven Track Record" cards:');
  EN_TRACK_RECORD_CARDS.forEach((cardId, index) => {
    const card = db.prepare(`
      SELECT title FROM components_about_us_content_cards WHERE id = ?
    `).get(cardId);

    db.prepare(`
      INSERT INTO components_about_us_content_sections_cmps
      (entity_id, cmp_id, component_type, field, \`order\`)
      VALUES (?, ?, ?, ?, ?)
    `).run(EN_TRACK_RECORD_SECTION, cardId, 'about-us.content-card', 'cards', index + 1);

    console.log(`  ✅ Card ${cardId}: ${card.title}`);
  });

  console.log('\n📊 Verification:\n');

  // Verify English sections now use English cards
  console.log('English "Our Areas of Expertise" cards:');
  const enExpertiseCards = db.prepare(`
    SELECT c.id, c.title, SUBSTR(c.description, 1, 60) as desc
    FROM components_about_us_content_sections_cmps sc
    JOIN components_about_us_content_cards c ON sc.cmp_id = c.id
    WHERE sc.entity_id = ? AND sc.field = 'cards'
    ORDER BY sc.\`order\`
  `).all(EN_EXPERTISE_SECTION);

  enExpertiseCards.forEach(card => {
    console.log(`  ${card.id}. ${card.title}`);
    console.log(`     "${card.desc}..."`);
  });

  console.log('\nEnglish "Proven Track Record" cards:');
  const enTrackRecordCards = db.prepare(`
    SELECT c.id, c.title, SUBSTR(c.description, 1, 60) as desc
    FROM components_about_us_content_sections_cmps sc
    JOIN components_about_us_content_cards c ON sc.cmp_id = c.id
    WHERE sc.entity_id = ? AND sc.field = 'cards'
    ORDER BY sc.\`order\`
  `).all(EN_TRACK_RECORD_SECTION);

  enTrackRecordCards.forEach(card => {
    console.log(`  ${card.id}. ${card.title}`);
    console.log(`     "${card.desc}..."`);
  });

  console.log('\n✨ English sections now use correct English cards!\n');
  console.log('Summary:');
  console.log('  EN: Cards 131-139 (English descriptions) ✅');
  console.log('  TR: Cards 212-220 (Turkish descriptions) ✅\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
} finally {
  db.close();
}
