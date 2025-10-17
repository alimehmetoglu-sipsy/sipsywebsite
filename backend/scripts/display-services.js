const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  const services = db.prepare(`
    SELECT title, description, locale
    FROM services
    WHERE published_at IS NOT NULL
    ORDER BY locale DESC, title
  `).all();

  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('📝 UPDATED SERVICE DESCRIPTIONS\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  services.forEach((service, index) => {
    console.log(`${index + 1}. ${service.title} [${service.locale.toUpperCase()}]`);
    console.log('─'.repeat(70));
    console.log(service.description);
    console.log('\n');
  });

} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
