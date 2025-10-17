const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  console.log('\n📋 ABOUT US DATA BY LOCALE\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Get about_us records
  const aboutUsRecords = db.prepare(`
    SELECT id, document_id, locale, published_at, created_at, updated_at
    FROM about_us
    ORDER BY locale, id
  `).all();

  console.log('Main About Us Records:');
  console.table(aboutUsRecords);

  // Check which ones are published
  const published = aboutUsRecords.filter(r => r.published_at);
  const drafts = aboutUsRecords.filter(r => !r.published_at);

  console.log('\n📊 Summary:');
  console.log(`  ✅ Published: ${published.length} (${published.map(r => r.locale).join(', ')})`);
  console.log(`  📝 Drafts: ${drafts.length} (${drafts.map(r => r.locale).join(', ')})`);

  // Get component relationships for each locale
  console.log('\n\n🔗 COMPONENT RELATIONSHIPS:\n');

  aboutUsRecords.forEach(record => {
    console.log(`\n${record.locale.toUpperCase()} (ID: ${record.id}, ${record.published_at ? 'Published' : 'Draft'})`);
    console.log('─'.repeat(70));

    // Get components for this about_us record
    const components = db.prepare(`
      SELECT
        cmp_id as component_id,
        component_type,
        field,
        \`order\`
      FROM about_us_cmps
      WHERE entity_id = ?
      ORDER BY field, \`order\`
    `).all(record.id);

    if (components.length > 0) {
      // Group by field
      const byField = {};
      components.forEach(c => {
        if (!byField[c.field]) byField[c.field] = [];
        byField[c.field].push(c);
      });

      Object.keys(byField).forEach(field => {
        console.log(`\n  ${field}:`);
        byField[field].forEach(c => {
          console.log(`    - ${c.component_type} (ID: ${c.component_id})`);

          // Get component details
          if (c.component_type === 'about-us.hero-section') {
            const hero = db.prepare(`
              SELECT title, subtitle, badge_text
              FROM components_about_us_hero_sections
              WHERE id = ?
            `).get(c.component_id);
            if (hero) {
              console.log(`      Title: "${hero.title?.substring(0, 50)}..."`);
            }
          } else if (c.component_type === 'about-us.content-section') {
            const section = db.prepare(`
              SELECT section_title, section_type
              FROM components_about_us_content_sections
              WHERE id = ?
            `).get(c.component_id);
            if (section) {
              console.log(`      Section: "${section.section_title}" (${section.section_type})`);
            }
          }
        });
      });
    } else {
      console.log('  ⚠️  No components attached');
    }
  });

} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
