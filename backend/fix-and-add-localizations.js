// Script to fix locale and add English localizations in Strapi

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'dc494f29668d49643edf591aec1f314c21757a278c69a108cd2925cd8067c9a3c69ea908c5b6837f1054a70055728cea361c468bd5bfc40f7fde7ea16db81f5f77c6aff3c9671cbbd69a83277fde18e6cd119944fb2558bed69568dc40e2d6e8429cacd0c6f542ea2f29db52c842533c5864bb47ff00325f6d7ebd292b1524b6';
const fs = require('fs');
const path = require('path');

// Read English HTML content files
const privacyEN = fs.readFileSync(path.join(__dirname, '..', 'PRIVACY_CONTENT_EN.html'), 'utf8');
const termsEN = fs.readFileSync(path.join(__dirname, '..', 'TERMS_CONTENT_EN.html'), 'utf8');

// Document IDs from the API response
const PRIVACY_DOC_ID = 'syuwkypulzjyff9gfekl8q5l';
const TERMS_DOC_ID = 'mpi8xd4oynvej81ji1k7c4ka';

async function updatePageLocale(documentId, locale) {
  const response = await fetch(`${API_URL}/pages/${documentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        locale
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`Failed to update locale for ${documentId}:`, JSON.stringify(error, null, 2));
    return null;
  }

  const result = await response.json();
  console.log(`✅ Updated locale to "${locale}" for document ${documentId}`);
  return result;
}

async function createLocalization(documentId, title, content, locale) {
  // Use PUT with locale query parameter to create localization
  const response = await fetch(`${API_URL}/pages/${documentId}?locale=${locale}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        title,
        content,
        publishedAt: new Date().toISOString()
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`Failed to create localization for ${documentId}:`, JSON.stringify(error, null, 2));
    return null;
  }

  const result = await response.json();
  console.log(`✅ Created ${locale} localization: ${title}`);
  return result;
}

async function main() {
  console.log('🔧 Step 1: Updating locales to "tr" for Turkish content...\n');

  await updatePageLocale(PRIVACY_DOC_ID, 'tr');
  await updatePageLocale(TERMS_DOC_ID, 'tr');

  console.log('\n🌍 Step 2: Creating English localizations...\n');

  await createLocalization(PRIVACY_DOC_ID, 'Privacy Policy', privacyEN, 'en');
  await createLocalization(TERMS_DOC_ID, 'Terms of Service', termsEN, 'en');

  console.log('\n✨ All pages updated successfully!');
}

main().catch(console.error);
