// Script to fix value propositions with proper i18n localizations

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'dc494f29668d49643edf591aec1f314c21757a278c69a108cd2925cd8067c9a3c69ea908c5b6837f1054a70055728cea361c468bd5bfc40f7fde7ea16db81f5f77c6aff3c9671cbbd69a83277fde18e6cd119944fb2558bed69568dc40e2d6e8429cacd0c6f542ea2f29db52c842533c5864bb47ff00325f6d7ebd292b1524b6';

// Document IDs to delete (duplicate entries with wrong locales - order 100+)
const documentIdsToDelete = [
  'a5typ8idvig0xq7l9ltzfwe4', // id 9: Rapid Implementation (order 100)
  'rch9x7gd2tfo641cygk8cx29', // id 11: Hızlı Uygulama (order 100)
  'brqifxszsitm5usrlsrzrp60', // id 13: Expert Team (order 101)
  'qmyq6bjflg4bs1tymqqg36ir', // id 15: Uzman Ekip (order 101)
  'tudmc3l24e98quogysu4xpsj', // id 17: Scalable Solutions (order 102)
  'vh3khn3mj3hzl8c4rmrjy7hx', // id 19: Ölçeklenebilir Çözümler (order 102)
];

// Turkish localizations to add to the original English entries
const localizations = [
  {
    englishId: 2, // Rapid Implementation
    documentId: 'nrzqh84xhftqa9mfyl9z0jzu',
    turkish: {
      title: 'Hızlı Uygulama',
      description: 'Kanıtlanmış uygulama metodolojimizle yapay zeka çözümlerini aylar değil, haftalar içinde hayata geçirin.',
      order: 0,
    }
  },
  {
    englishId: 7, // Expert Team
    documentId: 'ltunc58kyc2te5s0nuhegsls',
    turkish: {
      title: 'Uzman Ekip',
      description: 'Dönüştürücü çözümler sunma konusunda kanıtlanmış geçmişe sahip sertifikalı yapay zeka profesyonelleri ve sektör uzmanlarıyla çalışın.',
      order: 1,
    }
  },
  {
    englishId: 6, // Scalable Solutions
    documentId: 'vcfvl9r67pqauzit106vzx6n',
    turkish: {
      title: 'Ölçeklenebilir Çözümler',
      description: 'Startup\'tan kurumsal seviyeye büyümenizle birlikte ölçeklenmek üzere tasarlanmış yapay zeka çözümleriyle işinizi geleceğe hazırlayın.',
      order: 2,
    }
  }
];

async function deleteValueProposition(documentId) {
  try {
    const response = await fetch(`${API_URL}/value-propositions/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(`❌ Failed to delete documentId ${documentId}: ${response.statusText}`);
      return false;
    }

    console.log(`✅ Deleted value proposition: ${documentId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error deleting documentId ${documentId}:`, error.message);
    return false;
  }
}

async function createTurkishEntry(data, relatedDocumentId) {
  try {
    // Create a new Turkish entry with the same documentId relationship
    const response = await fetch(`${API_URL}/value-propositions?locale=tr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          title: data.title,
          description: data.description,
          order: data.order,
          locale: 'tr',
          publishedAt: new Date().toISOString(),
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Failed to create Turkish entry for ${data.title}:`, error);
      return null;
    }

    const result = await response.json();
    console.log(`✅ Created Turkish entry: ${data.title}`);
    return result;
  } catch (error) {
    console.error(`❌ Error creating Turkish entry:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Fixing value propositions with proper i18n...\n');

  // Step 1: Delete duplicate entries
  console.log('📝 Step 1: Deleting duplicate entries...\n');
  for (const documentId of documentIdsToDelete) {
    await deleteValueProposition(documentId);
  }

  console.log('\n📝 Step 2: Creating Turkish entries...\n');

  // Step 2: Create Turkish entries
  for (const loc of localizations) {
    await createTurkishEntry(loc.turkish, loc.documentId);
  }

  console.log('\n✨ All value propositions fixed successfully!');
  console.log('📋 View in admin: http://localhost:1337/admin/content-manager/collection-types/api::value-proposition.value-proposition');
}

main().catch(console.error);
