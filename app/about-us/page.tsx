'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { getAboutUs, getCtaSection, getFooter } from '@/lib/strapi';
import { AboutUs, AboutUsContentCard, AboutUsContentSection } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Bot, Linkedin, Twitter, Github, Sparkles,
  Code, Target, Users, Zap, Award, TrendingUp, Users2, Rocket, TrendingUpIcon
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Image from 'next/image';

// Dynamic icon component
const DynamicIcon = ({ iconName, className = 'w-8 h-8' }: { iconName?: string; className?: string }) => {
  if (!iconName) return null;

  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};

export default function AboutUsPage() {
  const { language } = useLanguage();
  const [aboutUsData, setAboutUsData] = useState<AboutUs | null>(null);
  const [ctaSection, setCtaSection] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [aboutUs, ctaData, footerData] = await Promise.all([
          getAboutUs(language),
          getCtaSection(language),
          getFooter(language),
        ]);

        setAboutUsData(aboutUs);
        setCtaSection(ctaData);
        setFooter(footerData);
      } catch (error) {
        console.error('Error fetching about us page:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [language]);

  // Gradient colors for cards
  const cardGradients = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-teal-500 to-teal-600',
    'from-indigo-500 to-indigo-600',
    'from-pink-500 to-pink-600',
    'from-yellow-500 to-yellow-600',
  ];

  const renderContentSection = (section: AboutUsContentSection, index: number) => {
    if (section.sectionType === 'text') {
      // Special handling for Technology Stack
      if (section.sectionTitle.toLowerCase().includes('technology') || section.sectionTitle.toLowerCase().includes('teknoloji')) {
        const technologies = section.description?.split('•').map(tech => tech.trim()).filter(tech => tech.length > 0) || [];

        return (
          <section key={index} className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
            <div className="container-custom">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
                  {section.sectionTitle}
                </h2>
                <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                  {language === 'tr' ? 'Uzman ekibimizin kullandığı modern teknolojiler' : 'Modern technologies our expert team uses'}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-gold-400/50
                                 px-5 py-3 rounded-xl text-sm font-medium text-gray-200 hover:text-white
                                 transition-all duration-300 hover:scale-105 hover:bg-white/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      }

      // Regular text section with enhanced styling
      return (
        <section key={index} className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-gold-500 to-copper-500 rounded-full"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-8">
                  {section.sectionTitle}
                </h2>
              </div>
              {section.description && (
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                  <div
                    className="prose prose-lg max-w-none
                               prose-headings:font-bold prose-headings:text-navy-900
                               prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                               prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                               prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                               prose-ul:my-8 prose-ul:space-y-3
                               prose-li:text-gray-700 prose-li:leading-relaxed prose-li:pl-2
                               prose-li:marker:text-gold-500 prose-li:marker:text-xl
                               prose-strong:text-navy-900 prose-strong:font-bold
                               prose-a:text-gold-600 prose-a:font-semibold prose-a:no-underline
                               hover:prose-a:text-gold-700 hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      );
    } else if (section.sectionType === 'badges' && section.cards && section.cards.length > 0) {
      // Badges section - displaying technology badges
      const sortedCards = [...section.cards].sort((a, b) => a.order - b.order);

      return (
        <section key={index} className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
                {section.sectionTitle}
              </h2>
              <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                {language === 'tr' ? 'Uzman ekibimizin kullandığı modern teknolojiler' : 'Modern technologies our expert team uses'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {sortedCards.map((card, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-gold-400/50
                               px-5 py-3 rounded-xl text-sm font-medium text-gray-200 hover:text-white
                               transition-all duration-300 hover:scale-105 hover:bg-white/15"
                  >
                    {card.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    } else if (section.sectionType === 'cards' && section.cards && section.cards.length > 0) {
      // Cards section
      const sortedCards = [...section.cards].sort((a, b) => a.order - b.order);

      return (
        <section key={index} className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container-custom">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-12 text-center">
              {section.sectionTitle}
            </h2>
            <div className={`grid ${sortedCards.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 max-w-6xl mx-auto`}>
              {sortedCards.map((card, cardIndex) => {
                const gradient = cardGradients[cardIndex % cardGradients.length];

                return (
                  <div
                    key={cardIndex}
                    className={`bg-gradient-to-br ${gradient} text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                  >
                    {card.icon && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 w-fit mb-6">
                        <DynamicIcon iconName={card.icon} className="w-10 h-10" />
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                    <p className="text-white/90 leading-relaxed">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <>
      <Navigation forceScrolled={true} />

      <main className="min-h-screen pt-20">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold-500"></div>
          </div>
        ) : aboutUsData ? (
          <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-24 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

              <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  {aboutUsData.heroSection.badgeText && (
                    <div className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur-sm border border-gold-400/30 rounded-full px-6 py-2 mb-6">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      <span className="text-sm font-semibold text-gold-300">
                        {aboutUsData.heroSection.badgeText}
                      </span>
                    </div>
                  )}

                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
                    {aboutUsData.heroSection.title}
                  </h1>

                  <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                    {aboutUsData.heroSection.subtitle}
                  </p>

                  {/* Stats */}
                  {aboutUsData.heroSection.stats && aboutUsData.heroSection.stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {aboutUsData.heroSection.stats
                        .sort((a, b) => a.order - b.order)
                        .map((stat, index) => (
                          <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                            {stat.icon && <DynamicIcon iconName={stat.icon} className="w-8 h-8 text-gold-400 mx-auto mb-3" />}
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-300">{stat.label}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Content Sections */}
            {aboutUsData.sections && aboutUsData.sections.length > 0 && (
              <>
                {aboutUsData.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => renderContentSection(section, index))}
              </>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
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
          </div>
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
                        <a href="/#services" className="hover:text-gold-400 transition-colors">
                          {language === 'tr' ? 'RPA & Hiperotomasyon' : 'RPA & Hyperautomation'}
                        </a>
                      </li>
                      <li>
                        <a href="/#services" className="hover:text-gold-400 transition-colors">
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
                        <a href="/about-us" className="hover:text-gold-400 transition-colors">
                          {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="hover:text-gold-400 transition-colors">
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
