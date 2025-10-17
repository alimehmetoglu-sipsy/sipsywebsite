const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  console.log('\n📋 ANALYZING ABOUT US CARDS\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Get all sections with their relationships
  const sections = db.prepare(`
    SELECT id, section_title, section_type
    FROM components_about_us_content_sections
    ORDER BY id
  `).all();

  console.log('Content Sections:');
  console.table(sections);

  // Get section-card relationships
  const sectionCards = db.prepare(`
    SELECT *
    FROM components_about_us_content_sections_cmps
    ORDER BY component_type, entity_id
  `).all();

  console.log('\nSection-Card Relationships:');
  console.table(sectionCards);

  // Get all cards
  const cards = db.prepare(`
    SELECT id, title, description, \`order\`
    FROM components_about_us_content_cards
    ORDER BY id
  `).all();

  console.log('\nAll Cards:');
  cards.forEach(card => {
    console.log(`\n${card.id}. ${card.title}`);
    console.log('─'.repeat(70));
    console.log(`Description: ${card.description}`);
  });

  // Map cards to sections
  console.log('\n\n📊 CARDS GROUPED BY SECTIONS:\n');
  sections.forEach(section => {
    const relatedCards = sectionCards
      .filter(sc => sc.entity_id === section.id)
      .map(sc => cards.find(c => c.id === sc.component_id))
      .filter(c => c);

    console.log(`\n${section.section_title} (${section.section_type})`);
    console.log('─'.repeat(70));
    if (relatedCards.length > 0) {
      relatedCards.forEach(card => {
        console.log(`  • ${card.title}`);
        console.log(`    "${card.description.substring(0, 80)}..."`);
      });
    } else {
      console.log('  (No cards)');
    }
  });

} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
