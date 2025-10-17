const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  console.log('\n🔍 CHECKING CARD-LOCALE MAPPINGS\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Get EN published sections
  console.log('📋 ENGLISH (ID: 23) Sections:\n');
  const enSections = db.prepare(`
    SELECT cmp_id, \`order\`
    FROM about_us_cmps
    WHERE entity_id = 23 AND field = 'sections' AND component_type = 'about-us.content-section'
    ORDER BY \`order\`
  `).all();

  enSections.forEach(sec => {
    const section = db.prepare(`
      SELECT id, section_title, section_type
      FROM components_about_us_content_sections
      WHERE id = ?
    `).get(sec.cmp_id);

    console.log(`\n${section.section_title} (${section.section_type})`);
    console.log('─'.repeat(70));

    if (section.section_type === 'cards') {
      // Get cards for this section
      const cards = db.prepare(`
        SELECT cmp_id
        FROM components_about_us_content_sections_cmps
        WHERE entity_id = ? AND component_type = 'about-us.content-card'
        ORDER BY \`order\`
      `).all(section.id);

      cards.forEach(c => {
        const card = db.prepare(`
          SELECT id, title, SUBSTR(description, 1, 80) as desc
          FROM components_about_us_content_cards
          WHERE id = ?
        `).get(c.cmp_id);
        console.log(`  Card ${card.id}: ${card.title}`);
        console.log(`    "${card.desc}..."`);
      });
    }
  });

  // Get TR published sections
  console.log('\n\n📋 TURKISH (ID: 24) Sections:\n');
  const trSections = db.prepare(`
    SELECT cmp_id, \`order\`
    FROM about_us_cmps
    WHERE entity_id = 24 AND field = 'sections' AND component_type = 'about-us.content-section'
    ORDER BY \`order\`
  `).all();

  trSections.forEach(sec => {
    const section = db.prepare(`
      SELECT id, section_title, section_type
      FROM components_about_us_content_sections
      WHERE id = ?
    `).get(sec.cmp_id);

    console.log(`\n${section.section_title} (${section.section_type})`);
    console.log('─'.repeat(70));

    if (section.section_type === 'cards') {
      // Get cards for this section
      const cards = db.prepare(`
        SELECT cmp_id
        FROM components_about_us_content_sections_cmps
        WHERE entity_id = ? AND component_type = 'about-us.content-card'
        ORDER BY \`order\`
      `).all(section.id);

      cards.forEach(c => {
        const card = db.prepare(`
          SELECT id, title, SUBSTR(description, 1, 80) as desc
          FROM components_about_us_content_cards
          WHERE id = ?
        `).get(c.cmp_id);
        console.log(`  Card ${card.id}: ${card.title}`);
        console.log(`    "${card.desc}..."`);
      });
    }
  });

  console.log('\n═══════════════════════════════════════════════════════════\n');

} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
