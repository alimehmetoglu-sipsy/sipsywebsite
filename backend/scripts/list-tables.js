const Database = require('better-sqlite3');
const path = require('path');

// Open the database
const db = new Database(path.join(__dirname, '..', '.tmp', 'data.db'), { readonly: true });

try {
  const tables = db.prepare(`
    SELECT name FROM sqlite_master
    WHERE type='table' AND name LIKE '%about%'
    ORDER BY name
  `).all();

  console.log('\nTables related to About Us:');
  tables.forEach(t => console.log(`  - ${t.name}`));

} catch (error) {
  console.error('Error:', error.message);
} finally {
  db.close();
}
