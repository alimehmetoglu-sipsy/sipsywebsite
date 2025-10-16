// Script to create "Why sipsy.ai" value propositions

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'dc494f29668d49643edf591aec1f314c21757a278c69a108cd2925cd8067c9a3c69ea908c5b6837f1054a70055728cea361c468bd5bfc40f7fde7ea16db81f5f77c6aff3c9671cbbd69a83277fde18e6cd119944fb2558bed69568dc40e2d6e8429cacd0c6f542ea2f29db52c842533c5864bb47ff00325f6d7ebd292b1524b6';

const valuePropositions = [
  {
    en: {
      title: 'Rapid Implementation',
      description: 'Get AI solutions deployed in weeks, not months, with our proven implementation methodology.',
      order: 100,
    },
    tr: {
      title: 'Hızlı Uygulama',
      description: 'Kanıtlanmış uygulama metodolojimizle yapay zeka çözümlerini aylar değil, haftalar içinde hayata geçirin.',
      order: 100,
    },
  },
  {
    en: {
      title: 'Expert Team',
      description: 'Work with certified AI professionals and industry experts with proven track records in delivering transformative solutions.',
      order: 101,
    },
    tr: {
      title: 'Uzman Ekip',
      description: 'Dönüştürücü çözümler sunma konusunda kanıtlanmış geçmişe sahip sertifikalı yapay zeka profesyonelleri ve sektör uzmanlarıyla çalışın.',
      order: 101,
    },
  },
  {
    en: {
      title: 'Scalable Solutions',
      description: 'Future-proof your business with AI solutions designed to scale with your growth, from startup to enterprise.',
      order: 102,
    },
    tr: {
      title: 'Ölçeklenebilir Çözümler',
      description: 'Startup\'tan kurumsal seviyeye büyümenizle birlikte ölçeklenmek üzere tasarlanmış yapay zeka çözümleriyle işinizi geleceğe hazırlayın.',
      order: 102,
    },
  },
];

async function createValueProposition(data, locale) {
  const response = await fetch(`${API_URL}/value-propositions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        ...data,
        locale,
        publishedAt: new Date().toISOString(),
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`❌ Failed to create ${data.title} (${locale}):`, JSON.stringify(error, null, 2));
    return null;
  }

  const result = await response.json();
  console.log(`✅ Created: ${data.title} (${locale}) - ID: ${result.data.id}`);
  return result;
}

async function main() {
  console.log('🚀 Creating "Why sipsy.ai" value propositions...\n');

  for (const vp of valuePropositions) {
    // Create English version
    await createValueProposition(vp.en, 'en');

    // Create Turkish version
    await createValueProposition(vp.tr, 'tr');

    console.log(''); // Empty line for readability
  }

  console.log('✨ All value propositions created successfully!');
  console.log('📋 View in admin: http://localhost:1337/admin/content-manager/collection-types/api::value-proposition.value-proposition');
}

main().catch(console.error);
