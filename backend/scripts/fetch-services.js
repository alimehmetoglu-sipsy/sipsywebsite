const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  // Fetch all services with their locale information
  const services = db.prepare(`
    SELECT id, document_id, title, description, locale, published_at
    FROM services
    ORDER BY locale, title
  `).all();

  console.log(JSON.stringify(services, null, 2));
} catch (error) {
  console.error('Error fetching services:', error.message);
} finally {
  db.close();
}
