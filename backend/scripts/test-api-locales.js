const http = require('http');

async function testLocale(locale) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: `/api/about-us?populate=deep&locale=${locale}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function main() {
  console.log('\n🌐 TESTING STRAPI API LOCALES\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Test English
  console.log('📍 Testing ENGLISH (en) locale:\n');
  try {
    const enData = await testLocale('en');
    console.log(`  ✅ Has data: ${!!enData.data}`);
    console.log(`  📊 Hero section: ${enData.data?.heroSection ? 'Yes' : 'No'}`);
    console.log(`  📋 Sections count: ${enData.data?.sections?.length || 0}`);

    if (enData.data?.sections?.length > 0) {
      console.log('\n  Sections:');
      enData.data.sections.forEach((section, index) => {
        console.log(`    ${index + 1}. ${section.sectionTitle} (${section.sectionType})`);
        if (section.cards) {
          console.log(`       - ${section.cards.length} cards`);
        }
      });
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }

  // Test Turkish
  console.log('\n\n📍 Testing TURKISH (tr) locale:\n');
  try {
    const trData = await testLocale('tr');
    console.log(`  ✅ Has data: ${!!trData.data}`);
    console.log(`  📊 Hero section: ${trData.data?.heroSection ? 'Yes' : 'No'}`);
    console.log(`  📋 Sections count: ${trData.data?.sections?.length || 0}`);

    if (trData.data?.sections?.length > 0) {
      console.log('\n  Sections:');
      trData.data.sections.forEach((section, index) => {
        console.log(`    ${index + 1}. ${section.sectionTitle} (${section.sectionType})`);
        if (section.cards) {
          console.log(`       - ${section.cards.length} cards`);
        }
      });
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }

  console.log('\n═══════════════════════════════════════════════════════════\n');
}

main();
