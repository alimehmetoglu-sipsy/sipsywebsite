'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { getPageBySlug, getCtaSection, getFooter, getValuePropositions } from '@/lib/strapi';
import { Page, ValueProposition } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Bot, Linkedin, Twitter, Github, Target, Zap, Award,
  TrendingUp, Users, Code, Sparkles, Rocket, Users2, TrendingUpIcon
} from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  const { language } = useLanguage();
  const [pageData, setPageData] = useState<Page | null>(null);
  const [ctaSection, setCtaSection] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [valuePropositions, setValuePropositions] = useState<ValueProposition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const slug = language === 'tr' ? 'hakkimizda' : 'about-us';
        const [page, ctaData, footerData, valueProps] = await Promise.all([
          getPageBySlug(slug, language),
          getCtaSection(language),
          getFooter(language),
          getValuePropositions(language),
        ]);

        setPageData(page);
        setCtaSection(ctaData);
        setFooter(footerData);
        setValuePropositions(valueProps);
      } catch (error) {
        console.error('Error fetching about us page:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [language]);

  const highlights = [
    {
      icon: Zap,
      value: '6+',
      label: language === 'tr' ? 'Yıl Deneyim' : 'Years Experience',
    },
    {
      icon: Award,
      value: '25+',
      label: language === 'tr' ? 'Başarılı Proje' : 'Successful Projects',
    },
    {
      icon: TrendingUp,
      value: '%40',
      label: language === 'tr' ? 'Verimlilik Artışı' : 'Efficiency Boost',
    },
    {
      icon: Users,
      value: '50K+',
      label: language === 'tr' ? 'Aylık İşlem' : 'Monthly Transactions',
    },
  ];

  return (
    <>
      <Navigation forceScrolled={true} />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur-sm border border-gold-400/30 rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-sm font-semibold text-gold-300">
                  {language === 'tr' ? 'Dijital Dönüşüm Lideri' : 'Digital Transformation Leader'}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
                {pageData?.title || (language === 'tr' ? 'Hakkımızda' : 'About Us')}
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                {language === 'tr'
                  ? 'Yapay zeka ve otomasyon ile işletmeleri dönüştürüyoruz'
                  : 'Transforming businesses through AI and automation'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {highlights.map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <item.icon className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-sm text-gray-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-accent"></div>
              </div>
            ) : pageData?.content ? (
              <div className="max-w-5xl mx-auto">
                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8 md:p-12">
                    <div
                      className="prose prose-lg max-w-none
                                 prose-headings:font-bold prose-headings:text-navy-900
                                 prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:first:mt-0
                                 prose-h2:pb-4 prose-h2:border-b-4 prose-h2:border-gradient-to-r prose-h2:from-gold-400 prose-h2:to-copper-500
                                 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-navy-800
                                 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                                 prose-ul:my-8 prose-ul:space-y-3
                                 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:pl-2
                                 prose-li:marker:text-gold-500 prose-li:marker:text-xl
                                 prose-strong:text-navy-900 prose-strong:font-bold prose-strong:text-lg
                                 prose-a:text-gold-600 prose-a:font-semibold prose-a:no-underline
                                 hover:prose-a:text-gold-700 hover:prose-a:underline
                                 prose-hr:my-16 prose-hr:border-gray-300
                                 prose-em:text-gray-600 prose-em:italic"
                      dangerouslySetInnerHTML={{ __html: pageData.content }}
                    />
                  </div>
                </div>

                {/* Technology Showcase */}
                <div className="mt-16 grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                    <Code className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-3">
                      {language === 'tr' ? 'Modern Teknolojiler' : 'Modern Technologies'}
                    </h3>
                    <p className="text-blue-100">
                      {language === 'tr'
                        ? 'Python, FastAPI, Docker ve yapay zeka framework\'leri'
                        : 'Python, FastAPI, Docker and AI frameworks'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                    <Target className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-3">
                      {language === 'tr' ? 'Sonuç Odaklı' : 'Result-Driven'}
                    </h3>
                    <p className="text-purple-100">
                      {language === 'tr'
                        ? 'Ölçülebilir ROI ve iş etkisi sağlıyoruz'
                        : 'Delivering measurable ROI and business impact'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                    <Users className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-3">
                      {language === 'tr' ? 'Global Erişim' : 'Global Reach'}
                    </h3>
                    <p className="text-green-100">
                      {language === 'tr'
                        ? '4 ülkede başarılı projeler'
                        : 'Successful projects in 4 countries'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto">
                <div className="text-center py-12">
                  <Bot className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                  <p className="text-gray-600 text-lg">
                    {language === 'tr'
                      ? 'Hakkımızda içeriği henüz yüklenmedi. Lütfen daha sonra tekrar deneyin.'
                      : 'About us content is not yet available. Please try again later.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why sipsy.ai Section */}
        {valuePropositions.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
                  {language === 'tr' ? 'Neden sipsy.ai?' : 'Why sipsy.ai?'}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {language === 'tr'
                    ? 'Yapay zeka ve otomasyon projeleriniz için bizi tercih etmeniz gereken sebepler'
                    : 'Reasons to choose us for your AI and automation projects'}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {valuePropositions.map((vp, index) => {
                  // Define gradient colors for each card
                  const gradients = [
                    'from-orange-500 to-orange-600',
                    'from-teal-500 to-teal-600',
                    'from-indigo-500 to-indigo-600',
                  ];
                  const gradient = gradients[index % gradients.length];

                  // Define default icons for each card
                  const icons = [Rocket, Users2, TrendingUpIcon];
                  const IconComponent = icons[index % icons.length];

                  return (
                    <div
                      key={vp.id}
                      className={`bg-gradient-to-br ${gradient} text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 w-fit mb-6">
                        <IconComponent className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{vp.title}</h3>
                      <p className="text-white/90 leading-relaxed">{vp.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {ctaSection && (
          <section className="section-padding bg-gradient-to-r from-gold-500 via-gold-400 to-copper-500">
            <div className="container-custom text-center">
              {ctaSection.title && (
                <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                  {ctaSection.title}
                </h2>
              )}
              {ctaSection.description && (
                <p className="text-xl text-navy-800 mb-8 max-w-2xl mx-auto">
                  {ctaSection.description}
                </p>
              )}
              {ctaSection.buttonText && (
                ctaSection.buttonUrl ? (
                  <a
                    href={ctaSection.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-navy-900 text-gold-400 hover:bg-navy-800 font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg mb-6"
                  >
                    {ctaSection.buttonText}
                  </a>
                ) : (
                  <button className="bg-navy-900 text-gold-400 hover:bg-navy-800 font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg mb-6">
                    {ctaSection.buttonText}
                  </button>
                )
              )}
              {ctaSection.phoneText && (
                <p className="text-navy-800 mb-2">
                  {ctaSection.phoneText}
                </p>
              )}
              {ctaSection.confidentialityText && (
                <p className="text-sm text-navy-700">
                  {ctaSection.confidentialityText}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-navy-900 text-gray-300 pt-16 pb-8">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  {footer?.logo ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${footer.logo.url}`}
                      alt={footer.logo.alternativeText || 'Logo'}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-copper-500 rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-navy-900" />
                    </div>
                  )}
                  <span className="text-2xl font-bold text-white">{footer?.siteName || 'sipsy.ai'}</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {footer?.companyDescription ||
                    (language === 'tr'
                      ? 'Ölçülebilir ROI sağlayan kurumsal AI ve otomasyon çözümleri'
                      : 'Enterprise AI and automation solutions that deliver measurable ROI')}
                </p>
                <div className="flex space-x-4">
                  {footer?.socialLinks ? (
                    <>
                      {footer.socialLinks.linkedin && (
                        <a
                          href={footer.socialLinks.linkedin}
                          className="w-10 h-10 bg-white/10 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {footer.socialLinks.twitter && (
                        <a
                          href={footer.socialLinks.twitter}
                          className="w-10 h-10 bg-white/10 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {footer.socialLinks.github && (
                        <a
                          href={footer.socialLinks.github}
                          className="w-10 h-10 bg-white/10 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Hizmetler' : 'Services'}
                </h4>
                <ul className="space-y-2">
                  {footer?.links?.services ? (
                    footer.links.services.map((link: { label: string; href: string }, index: number) => (
                      <li key={index}>
                        <a href={link.href} className="hover:text-gold-400 transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <a href="/#services" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'RPA & Hiperotomasyon' : 'RPA & Hyperautomation'}
                        </a>
                      </li>
                      <li>
                        <a href="/#services" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'AI/ML Entegrasyonu' : 'AI/ML Integration'}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Şirket' : 'Company'}
                </h4>
                <ul className="space-y-2">
                  {footer?.links?.company ? (
                    footer.links.company.map((link: { label: string; href: string }, index: number) => (
                      <li key={index}>
                        <a href={link.href} className="hover:text-gold-400 transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <a href="/about-us" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'İletişim' : 'Contact'}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Yasal' : 'Legal'}
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy" className="hover:text-gold-400 transition-colors">
                      {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:text-gold-400 transition-colors">
                      {language === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">
                  {footer?.copyright || '© 2025 sipsy.ai. All rights reserved.'}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">SOC 2 Compliant</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400">GDPR Ready</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
