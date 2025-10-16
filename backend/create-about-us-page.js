// Script to create About Us page in Strapi with Authentication

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'dc494f29668d49643edf591aec1f314c21757a278c69a108cd2925cd8067c9a3c69ea908c5b6837f1054a70055728cea361c468bd5bfc40f7fde7ea16db81f5f77c6aff3c9671cbbd69a83277fde18e6cd119944fb2558bed69568dc40e2d6e8429cacd0c6f542ea2f29db52c842533c5864bb47ff00325f6d7ebd292b1524b6';

const englishContent = `
<h2>Who We Are</h2>
<p>We are digital transformation specialists with over 6 years of experience in revolutionizing business processes through intelligent automation, AI/ML integration, and enterprise system optimization.</p>

<h2>Our Expertise</h2>
<p>Our core competencies span across:</p>
<ul>
  <li><strong>Hyperautomation & RPA:</strong> Designing and implementing end-to-end automation workflows using cutting-edge tools like n8n, Selenium, and Playwright, processing 50,000+ transactions monthly</li>
  <li><strong>AI & Machine Learning:</strong> Building production-ready AI solutions including RAG pipelines, GenAI applications, and intelligent document processing systems with vector databases</li>
  <li><strong>Enterprise Integration:</strong> Seamlessly connecting ITSM platforms, databases, and third-party services through custom Python applications and REST APIs</li>
  <li><strong>Data Engineering:</strong> Creating robust data pipelines and ETL processes for data transformation, cleansing, and loading across PostgreSQL and SQL Server databases</li>
</ul>

<h2>Proven Track Record</h2>
<p>With 25+ successful AI/RPA projects delivered, we have achieved:</p>
<ul>
  <li>40% operational efficiency improvements through intelligent automation</li>
  <li>50,000+ monthly transactions processed via automated workflows</li>
  <li>75+ ITSM/ITOM integration projects completed</li>
  <li>2 million annual service requests optimized for a major insurance company</li>
  <li>International expansion across Turkey, Dubai, Netherlands, and Singapore</li>
</ul>

<h2>Our Approach</h2>
<p>We believe in a customer-centric approach to digital transformation. By collaborating closely with cross-functional teams, we identify automation opportunities, develop custom solutions, and drive measurable business impact. Our expertise in MLOps, CI/CD pipelines, and model monitoring ensures that AI-driven solutions are not just implemented, but continuously optimized for peak performance.</p>

<h2>Technology Stack</h2>
<p>We leverage modern technologies including Python, FastAPI, Docker, PostgreSQL, and leading AI frameworks (PyTorch, LangChain, Hugging Face) to build scalable, enterprise-grade solutions that transform how businesses operate.</p>

<h2>Let's Transform Together</h2>
<p>Whether you're looking to automate repetitive tasks, implement AI-powered decision-making, or optimize your entire digital infrastructure, we bring the expertise and proven methodologies to make it happen.</p>
`;

const turkishContent = `
<h2>Biz Kimiz</h2>
<p>6 yılı aşkın deneyimimizle, akıllı otomasyon, yapay zeka/makine öğrenimi entegrasyonu ve kurumsal sistem optimizasyonu alanlarında iş süreçlerini dönüştüren dijital transformasyon uzmanlarıyız.</p>

<h2>Uzmanlık Alanlarımız</h2>
<p>Temel yetkinliklerimiz şunları kapsar:</p>
<ul>
  <li><strong>Hiperotomasyon ve RPA:</strong> n8n, Selenium ve Playwright gibi son teknoloji araçları kullanarak aylık 50.000'den fazla işlemi gerçekleştiren uçtan uca otomasyon iş akışlarının tasarımı ve uygulanması</li>
  <li><strong>Yapay Zeka ve Makine Öğrenimi:</strong> RAG pipeline'ları, GenAI uygulamaları ve vektör veri tabanları ile akıllı doküman işleme sistemleri dahil olmak üzere üretime hazır yapay zeka çözümlerinin geliştirilmesi</li>
  <li><strong>Kurumsal Entegrasyon:</strong> Özel Python uygulamaları ve REST API'ler aracılığıyla ITSM platformları, veri tabanları ve üçüncü taraf servislerin sorunsuz bir şekilde bağlanması</li>
  <li><strong>Veri Mühendisliği:</strong> PostgreSQL ve SQL Server veri tabanlarında veri dönüştürme, temizleme ve yükleme için güçlü veri pipeline'ları ve ETL süreçlerinin oluşturulması</li>
</ul>

<h2>Kanıtlanmış Başarılar</h2>
<p>Teslim ettiğimiz 25'ten fazla başarılı AI/RPA projesiyle şunları başardık:</p>
<ul>
  <li>Akıllı otomasyon yoluyla operasyonel verimlilikte %40 iyileştirme</li>
  <li>Otomatik iş akışları ile aylık 50.000'den fazla işlem gerçekleştirme</li>
  <li>Tamamlanan 75'ten fazla ITSM/ITOM entegrasyon projesi</li>
  <li>Büyük bir sigorta şirketi için yıllık 2 milyon servis talebinin optimize edilmesi</li>
  <li>Türkiye, Dubai, Hollanda ve Singapur'da uluslararası genişleme</li>
</ul>

<h2>Yaklaşımımız</h2>
<p>Dijital dönüşümde müşteri odaklı bir yaklaşıma inanıyoruz. Çapraz fonksiyonel ekiplerle yakın iş birliği yaparak otomasyon fırsatlarını belirliyoruz, özel çözümler geliştiriyoruz ve ölçülebilir iş etkisi sağlıyoruz. MLOps, CI/CD pipeline'ları ve model izleme konusundaki uzmanlığımız, yapay zeka destekli çözümlerin sadece uygulanmasını değil, aynı zamanda en yüksek performans için sürekli optimize edilmesini sağlar.</p>

<h2>Teknoloji Yığınımız</h2>
<p>İşletmelerin nasıl çalıştığını dönüştüren ölçeklenebilir, kurumsal düzeyde çözümler oluşturmak için Python, FastAPI, Docker, PostgreSQL ve önde gelen yapay zeka framework'leri (PyTorch, LangChain, Hugging Face) gibi modern teknolojilerden yararlanıyoruz.</p>

<h2>Birlikte Dönüşelim</h2>
<p>İster tekrarlayan görevleri otomatikleştirmek, ister yapay zeka destekli karar verme sistemlerini uygulamak veya tüm dijital altyapınızı optimize etmek isteyin, bunu gerçekleştirmek için gereken uzmanlığı ve kanıtlanmış metodolojileri sunuyoruz.</p>
`;

async function createPage(title, slug, content, locale, metaTitle, metaDescription, keywords) {
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
        metaTitle,
        metaDescription,
        keywords,
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
  console.log(`✅ Created: ${title} (${locale}) - ID: ${result.data.id}`);
  return result;
}

async function main() {
  console.log('🚀 Creating About Us pages...\n');

  // Create English version
  await createPage(
    'About Us',
    'about-us',
    englishContent,
    'en',
    'About Us - Digital Transformation & AI Automation Experts',
    'Learn about our expertise in hyperautomation, AI/ML integration, RPA, and enterprise system optimization. 6+ years of experience delivering measurable business impact.',
    'digital transformation, RPA, AI automation, machine learning, enterprise integration, hyperautomation'
  );

  // Create Turkish version
  await createPage(
    'Hakkımızda',
    'hakkimizda',
    turkishContent,
    'tr',
    'Hakkımızda - Dijital Dönüşüm ve Yapay Zeka Otomasyon Uzmanları',
    'Hiperotomasyon, yapay zeka/makine öğrenimi entegrasyonu, RPA ve kurumsal sistem optimizasyonu konusundaki uzmanlığımız hakkında bilgi edinin. 6+ yıllık tecrübe ile ölçülebilir iş etkisi sağlıyoruz.',
    'dijital dönüşüm, RPA, yapay zeka otomasyonu, makine öğrenimi, kurumsal entegrasyon, hiperotomasyon'
  );

  console.log('\n✨ All About Us pages created successfully!');
  console.log('📋 View in admin: http://localhost:1337/admin/content-manager/collection-types/api::page.page');
}

main().catch(console.error);
