const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  console.log('📋 ABOUT US PAGE CONTENT\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Fetch about_us data
  const aboutUs = db.prepare(`
    SELECT * FROM about_us WHERE published_at IS NOT NULL
  `).all();

  console.log('Main About Us records:');
  console.table(aboutUs);

  // Fetch content sections
  const sections = db.prepare(`
    SELECT * FROM components_about_us_content_sections
  `).all();

  console.log('\nContent Sections:');
  console.table(sections);

  // Fetch content cards
  const cards = db.prepare(`
    SELECT * FROM components_about_us_content_cards
  `).all();

  console.log('\nContent Cards:');
  console.table(cards);

} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
