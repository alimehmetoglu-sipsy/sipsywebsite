const http = require('http');

async function fetchAPI(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('\n📋 VERIFYING STRAPI CONTENT\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  try {
    // Test Turkish locale
    console.log('🇹🇷 Testing TURKISH Content:\n');
    const trData = await fetchAPI('/api/about-us?populate[heroSection][populate]=stats&populate[sections][populate]=cards&locale=tr');

    if (trData.data) {
      console.log(`✅ Turkish About Us data exists`);
      console.log(`   Hero: ${trData.data.heroSection ? 'Yes ✅' : 'No ❌'}`);
      console.log(`   Sections: ${trData.data.sections?.length || 0}`);

      if (trData.data.sections && trData.data.sections.length > 0) {
        console.log('\n   Turkish Sections:');
        trData.data.sections.forEach((section, idx) => {
          console.log(`   ${idx + 1}. ${section.sectionTitle} (${section.sectionType})`);
          if (section.cards) {
            console.log(`      Cards: ${section.cards.length}`);
            section.cards.slice(0, 2).forEach(card => {
              console.log(`        - ${card.title}: "${card.description.substring(0, 50)}..."`);
            });
          }
        });
      }
    } else {
      console.log('❌ Turkish data not found');
    }

    // Test English locale
    console.log('\n\n🇬🇧 Testing ENGLISH Content:\n');
    const enData = await fetchAPI('/api/about-us?populate[heroSection][populate]=stats&populate[sections][populate]=cards&locale=en');

    if (enData.data) {
      console.log(`✅ English About Us data exists`);
      console.log(`   Hero: ${enData.data.heroSection ? 'Yes ✅' : 'No ❌'}`);
      console.log(`   Sections: ${enData.data.sections?.length || 0}`);

      if (enData.data.sections && enData.data.sections.length > 0) {
        console.log('\n   English Sections:');
        enData.data.sections.forEach((section, idx) => {
          console.log(`   ${idx + 1}. ${section.sectionTitle} (${section.sectionType})`);
          if (section.cards) {
            console.log(`      Cards: ${section.cards.length}`);
            section.cards.slice(0, 2).forEach(card => {
              console.log(`        - ${card.title}: "${card.description.substring(0, 50)}..."`);
            });
          }
        });
      }
    } else {
      console.log('❌ English data not found');
    }

    console.log('\n═══════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
