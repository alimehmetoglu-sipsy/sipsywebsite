const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = 'dc494f29668d49643edf591aec1f314c21757a278c69a108cd2925cd8067c9a3c69ea908c5b6837f1054a70055728cea361c468bd5bfc40f7fde7ea16db81f5f77c6aff3c9671cbbd69a83277fde18e6cd119944fb2558bed69568dc40e2d6e8429cacd0c6f542ea2f29db52c842533c5864bb47ff00325f6d7ebd292b1524b6';

// Service ID mapping (documentId from Strapi)
const SERVICE_IDS = {
  'mlivin69yi7pllrt3b5ri37n': 'RPA & Hyperautomation',
  'rrmdxw17w69t67wrkxgcwg9l': 'Machine Learning & AI Development'
};

async function importSolution(filePath) {
  console.log(`\nImporting ${path.basename(filePath)}...`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    const solutionData = jsonData.data;

    // Post to Strapi API
    const response = await fetch(`${STRAPI_URL}/api/solutions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({ data: solutionData })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to import ${path.basename(filePath)}: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
      return false;
    }

    const result = await response.json();
    console.log(`✓ Successfully imported: ${solutionData.title}`);
    console.log(`  - Slug: ${solutionData.slug}`);
    console.log(`  - Locale: ${solutionData.locale}`);
    console.log(`  - Document ID: ${result.data.documentId}`);
    return true;
  } catch (error) {
    console.error(`Error importing ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Starting solution import...');
  console.log('Strapi URL:', STRAPI_URL);

  const solutionFiles = [
    './rpa-solution-tr.json',
    './ai-solution-tr.json',
    './data-solution-tr.json'
  ];

  let successCount = 0;
  let failCount = 0;

  for (const file of solutionFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const success = await importSolution(filePath);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    } else {
      console.log(`File not found: ${filePath}`);
      failCount++;
    }
  }

  console.log('\n=== Import Summary ===');
  console.log(`✓ Successful: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`Total: ${successCount + failCount}`);
}

main().catch(console.error);
