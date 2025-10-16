// Script to create Privacy and Terms pages in Strapi

const API_URL = 'http://localhost:1337/api';
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
    console.error(`Failed to create ${title} (${locale}):`, error);
    return null;
  }

  const result = await response.json();
  console.log(`✅ Created: ${title} (${locale})`);
  return result;
}

async function main() {
  console.log('Creating Privacy Policy pages...');
  await createPage('Gizlilik Politikası', 'privacy', privacyTR, 'tr');
  await createPage('Privacy Policy', 'privacy', privacyEN, 'en');
  
  console.log('\nCreating Terms of Service pages...');
  await createPage('Kullanım Koşulları', 'terms', termsTR, 'tr');
  await createPage('Terms of Service', 'terms', termsEN, 'en');
  
  console.log('\n✨ All pages created successfully!');
}

main().catch(console.error);
