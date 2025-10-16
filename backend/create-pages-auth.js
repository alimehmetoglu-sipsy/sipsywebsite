// Script to create Privacy and Terms pages in Strapi with Authentication

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'dc494f29668d49643edf591aec1f314c21757a278c69a108cd2925cd8067c9a3c69ea908c5b6837f1054a70055728cea361c468bd5bfc40f7fde7ea16db81f5f77c6aff3c9671cbbd69a83277fde18e6cd119944fb2558bed69568dc40e2d6e8429cacd0c6f542ea2f29db52c842533c5864bb47ff00325f6d7ebd292b1524b6';
const fs = require('fs');
const path = require('path');

// Read HTML content files
const privacyTR = fs.readFileSync(path.join(__dirname, '..', 'PRIVACY_CONTENT_TR.html'), 'utf8');
const privacyEN = fs.readFileSync(path.join(__dirname, '..', 'PRIVACY_CONTENT_EN.html'), 'utf8');
const termsTR = fs.readFileSync(path.join(__dirname, '..', 'TERMS_CONTENT_TR.html'), 'utf8');
const termsEN = fs.readFileSync(path.join(__dirname, '..', 'TERMS_CONTENT_EN.html'), 'utf8');

async function createPage(title, slug, content, locale) {
  const response = await fetch(`${API_URL}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        title,
        slug,
        content,
        locale,
        publishedAt: new Date().toISOString(),
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`❌ Failed to create ${title} (${locale}):`, JSON.stringify(error, null, 2));
    return null;
  }

  const result = await response.json();
  console.log(`✅ Created: ${title} (${locale})`);
  return result;
}

async function main() {
  console.log('🚀 Creating Privacy Policy pages...\n');
  await createPage('Gizlilik Politikası', 'privacy', privacyTR, 'tr');
  await createPage('Privacy Policy', 'privacy', privacyEN, 'en');
  
  console.log('\n🚀 Creating Terms of Service pages...\n');
  await createPage('Kullanım Koşulları', 'terms', termsTR, 'tr');
  await createPage('Terms of Service', 'terms', termsEN, 'en');
  
  console.log('\n✨ All pages created successfully!');
}

main().catch(console.error);
