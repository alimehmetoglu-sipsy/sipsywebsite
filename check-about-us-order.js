const STRAPI_URL = 'http://localhost:1337';

async function fetchAboutUs(locale) {
  const populateQuery = 'populate[heroSection][populate]=stats&populate[sections][populate]=cards';
  const url = `${STRAPI_URL}/api/about-us?${populateQuery}&locale=${locale}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${locale}: ${response.statusText}`);
  }

  return await response.json();
}

async function main() {
  try {
    console.log('Fetching Turkish about-us data...\n');
    const trData = await fetchAboutUs('tr');

    console.log('Fetching English about-us data...\n');
    const enData = await fetchAboutUs('en');

    console.log('='.repeat(80));
    console.log('TURKISH (tr) SECTIONS:');
    console.log('='.repeat(80));

    if (trData.data && trData.data.sections) {
      trData.data.sections
        .sort((a, b) => a.order - b.order)
        .forEach((section, idx) => {
          console.log(`\n${idx + 1}. [Order: ${section.order}] ${section.sectionTitle}`);
          console.log(`   Type: ${section.sectionType}`);
          if (section.cards && section.cards.length > 0) {
            console.log(`   Cards: ${section.cards.length}`);
          }
        });
    } else {
      console.log('No sections found');
    }

    console.log('\n' + '='.repeat(80));
    console.log('ENGLISH (en) SECTIONS:');
    console.log('='.repeat(80));

    if (enData.data && enData.data.sections) {
      enData.data.sections
        .sort((a, b) => a.order - b.order)
        .forEach((section, idx) => {
          console.log(`\n${idx + 1}. [Order: ${section.order}] ${section.sectionTitle}`);
          console.log(`   Type: ${section.sectionType}`);
          if (section.cards && section.cards.length > 0) {
            console.log(`   Cards: ${section.cards.length}`);
          }
        });
    } else {
      console.log('No sections found');
    }

    console.log('\n' + '='.repeat(80));
    console.log('COMPARISON:');
    console.log('='.repeat(80));

    if (trData.data?.sections && enData.data?.sections) {
      const trSections = trData.data.sections.sort((a, b) => a.order - b.order);
      const enSections = enData.data.sections.sort((a, b) => a.order - b.order);

      console.log(`\nTurkish sections count: ${trSections.length}`);
      console.log(`English sections count: ${enSections.length}`);

      console.log('\nOrder values comparison:');
      const maxLength = Math.max(trSections.length, enSections.length);

      for (let i = 0; i < maxLength; i++) {
        const trSection = trSections[i];
        const enSection = enSections[i];

        const trOrder = trSection ? trSection.order : 'N/A';
        const enOrder = enSection ? enSection.order : 'N/A';
        const trTitle = trSection ? trSection.sectionTitle.substring(0, 30) : 'N/A';
        const enTitle = enSection ? enSection.sectionTitle.substring(0, 30) : 'N/A';

        const match = trOrder === enOrder ? '✓' : '✗ MISMATCH';

        console.log(`\nPosition ${i + 1}: ${match}`);
        console.log(`  TR: [${trOrder}] ${trTitle}`);
        console.log(`  EN: [${enOrder}] ${enTitle}`);
      }
    }

    console.log('\n' + '='.repeat(80));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
