const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  console.log('\n📋 WHAT YOU SHOULD SEE IN STRAPI ADMIN\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Turkish About Us (published, ID: 24)
  console.log('🇹🇷 TURKISH LOCALE:\n');
  console.log('URL: http://localhost:1337/admin/content-manager/single-types/api::about-us.about-us?plugins[i18n][locale]=tr\n');

  // Get hero section
  const trAboutUs = db.prepare(`
    SELECT cmp_id
    FROM about_us_cmps
    WHERE entity_id = 24 AND field = 'heroSection'
  `).get();

  if (trAboutUs) {
    const hero = db.prepare(`
      SELECT title, subtitle, badge_text
      FROM components_about_us_hero_sections
      WHERE id = ?
    `).get(trAboutUs.cmp_id);

    console.log('Hero Section:');
    console.log(`  Title: "${hero.title}"`);
    console.log(`  Subtitle: "${hero.subtitle?.substring(0, 60)}..."`);
  }

  // Get sections
  const sections = db.prepare(`
    SELECT cmp_id, \`order\`
    FROM about_us_cmps
    WHERE entity_id = 24 AND field = 'sections'
    ORDER BY \`order\`
  `).all();

  console.log(`\nSections (${sections.length} total):\n`);

  sections.forEach((sec, index) => {
    const section = db.prepare(`
      SELECT section_title, section_type
      FROM components_about_us_content_sections
      WHERE id = ?
    `).get(sec.cmp_id);

    console.log(`${index + 1}. "${section.section_title}" (${section.section_type})`);

    if (section.section_type === 'cards') {
      // Get cards
      const cards = db.prepare(`
        SELECT cmp_id
        FROM components_about_us_content_sections_cmps
        WHERE entity_id = ? AND field = 'cards'
        ORDER BY \`order\`
      `).all(sec.cmp_id);

      console.log(`   Cards (${cards.length}):`);
      cards.forEach(c => {
        const card = db.prepare(`
          SELECT title, SUBSTR(description, 1, 50) as desc
          FROM components_about_us_content_cards
          WHERE id = ?
        `).get(c.cmp_id);
        console.log(`     • ${card.title}`);
        console.log(`       "${card.desc}..."`);
      });
    }
    console.log();
  });

  console.log('\n───────────────────────────────────────────────────────────\n');

  // English About Us (published, ID: 23)
  console.log('🇬🇧 ENGLISH LOCALE:\n');
  console.log('URL: http://localhost:1337/admin/content-manager/single-types/api::about-us.about-us?plugins[i18n][locale]=en\n');

  const enSections = db.prepare(`
    SELECT cmp_id, \`order\`
    FROM about_us_cmps
    WHERE entity_id = 23 AND field = 'sections'
    ORDER BY \`order\`
  `).all();

  console.log(`Sections (${enSections.length} total):\n`);

  enSections.forEach((sec, index) => {
    const section = db.prepare(`
      SELECT section_title, section_type
      FROM components_about_us_content_sections
      WHERE id = ?
    `).get(sec.cmp_id);

    console.log(`${index + 1}. "${section.section_title}" (${section.section_type})`);

    if (section.section_type === 'cards') {
      const cards = db.prepare(`
        SELECT cmp_id
        FROM components_about_us_content_sections_cmps
        WHERE entity_id = ? AND field = 'cards'
        ORDER BY \`order\`
      `).all(sec.cmp_id);

      console.log(`   Cards (${cards.length}):`);
      cards.slice(0, 2).forEach(c => {
        const card = db.prepare(`
          SELECT title, SUBSTR(description, 1, 50) as desc
          FROM components_about_us_content_cards
          WHERE id = ?
        `).get(c.cmp_id);
        console.log(`     • ${card.title}`);
        console.log(`       "${card.desc}..."`);
      });
      if (cards.length > 2) {
        console.log(`     ... and ${cards.length - 2} more`);
      }
    }
    console.log();
  });

  console.log('\n═══════════════════════════════════════════════════════════\n');
  console.log('✅ If you see these sections in Strapi admin, everything is working!\n');

} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
