'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SolutionCard from '@/components/SolutionCard';
import DynamicIcon from '@/components/DynamicIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getServicesWithDetails, getCtaSection, getFooter, getMediaURL } from '@/lib/strapi';
import { Service, Solution } from '@/lib/types';
import { Bot, Linkedin, Twitter, Github, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const { language } = useLanguage();
  const [services, setServices] = useState<(Service & { id: number; solutions?: (Solution & { id: number })[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [ctaSection, setCtaSection] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [servicesData, ctaData, footerData] = await Promise.all([
          getServicesWithDetails(language),
          getCtaSection(language),
          getFooter(language),
        ]);

        setServices(servicesData || []);
        setCtaSection(ctaData);
        setFooter(footerData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [language]);

  // Scroll spy for active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = services.map(service => document.getElementById(`service-${service.id}`));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(services[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [services]);

  const scrollToService = (serviceId: number) => {
    const element = document.getElementById(`service-${serviceId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Navigation forceScrolled />

      <main className="min-h-screen pt-20">
        {/* Main Content with Sidebar */}
        <section className="section-padding bg-neutral-light">
          <div className="container-custom">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
              </div>
            ) : services.length > 0 ? (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sticky Sidebar Navigation */}
                <aside className="lg:w-64 flex-shrink-0">
                  <div className="lg:sticky lg:top-24">
                    {/* Mobile: Horizontal Scroll */}
                    <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6">
                      {services.map((service) => {
                        const isActive = activeSection === service.id;
                        const bgColor = service.color === 'accent' ? 'bg-cyan-500' : 'bg-cyan-500';
                        return (
                          <button
                            key={service.id}
                            onClick={() => scrollToService(service.id)}
                            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                              isActive
                                ? `${bgColor} text-white shadow-lg`
                                : 'bg-white text-gray-700 hover:bg-neutral-light'
                            }`}
                          >
                            {service.title}
                          </button>
                        );
                      })}
                    </div>

                    {/* Desktop: Vertical List */}
                    <div className="hidden lg:block bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-bold text-navy-900 mb-4">
                        {language === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
                      </h3>
                      <nav className="space-y-2">
                        {services.map((service) => {
                          const isActive = activeSection === service.id;
                          const borderColor = service.color === 'accent' ? 'border-cyan-500' : 'border-cyan-500';
                          const textColor = service.color === 'accent' ? 'text-brand-primary600' : 'text-brand-primary600';
                          return (
                            <button
                              key={service.id}
                              onClick={() => scrollToService(service.id)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? `bg-neutral-light border-l-4 ${borderColor} ${textColor} font-semibold`
                                  : 'text-gray-600 hover:bg-neutral-light border-l-4 border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {service.icon && (
                                  <DynamicIcon
                                    icon={service.icon}
                                    className="w-5 h-5"
                                    size={20}
                                  />
                                )}
                                <span className="line-clamp-2">{service.title}</span>
                              </div>
                            </button>
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 space-y-16">
                  {services.map((service) => {
                    const bgColor = service.color === 'accent' ? 'bg-cyan-500/10' : 'bg-cyan-400/10';
                    const iconBgColor = service.color === 'accent' ? 'bg-cyan-500' : 'bg-cyan-500';
                    const borderColor = service.color === 'accent' ? 'border-cyan-500' : 'border-cyan-400';

                    return (
                      <div
                        key={service.id}
                        id={`service-${service.id}`}
                        className="scroll-mt-24"
                      >
                        {/* Service Header */}
                        <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-8 ${borderColor}`}>
                          <div className="flex items-start gap-6 mb-6">
                            {/* Icon */}
                            {service.icon && (
                              <div className={`w-20 h-20 ${iconBgColor} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                <DynamicIcon
                                  icon={service.icon}
                                  className="w-10 h-10 text-white"
                                  size={40}
                                />
                              </div>
                            )}

                            {/* Title & Description */}
                            <div className="flex-1">
                              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                                {service.title}
                              </h2>
                              <p className="text-lg text-gray-700 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>

                          {/* Key Tools */}
                          {service.keyTools && service.keyTools.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-5 h-5 text-brand-primary" />
                                <h3 className="text-sm font-semibold text-gray-600 uppercase">
                                  {language === 'tr' ? 'Kullandığımız Teknolojiler' : 'Technologies We Use'}
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {service.keyTools.map((tool, index) => (
                                  <span
                                    key={index}
                                    className={`inline-flex items-center gap-2 px-4 py-2 ${bgColor} rounded-full text-sm`}
                                  >
                                    {tool.Logo && (
                                      <Image
                                        src={getMediaURL(tool.Logo.url)}
                                        alt={tool.Logo.alternativeText || tool.Name}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5 object-contain"
                                      />
                                    )}
                                    <span className="text-gray-900 font-medium">{tool.Name}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Related Solutions */}
                        {service.solutions && service.solutions.length > 0 && (
                          <div>
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-2xl font-bold text-navy-900">
                                {language === 'tr' ? 'İlgili Çözümlerimiz' : 'Related Solutions'}
                              </h3>
                              <span className="text-sm text-gray-600">
                                {service.solutions.length} {language === 'tr' ? 'çözüm' : 'solutions'}
                              </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              {service.solutions.map((solution) => (
                                <SolutionCard
                                  key={solution.id}
                                  solution={{ ...solution, service }}
                                  language={language}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  {language === 'tr' ? 'Henüz Hizmet Eklenmemiş' : 'No Services Yet'}
                </h3>
                <p className="text-gray-600">
                  {language === 'tr'
                    ? 'Strapi admin panelinden yeni hizmetler ekleyebilirsiniz.'
                    : 'You can add new services from the Strapi admin panel.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-navy-800 via-brand-primary to-cyan-500">
          <div className="container-custom text-center">
            {ctaSection?.title && (
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                {ctaSection.title}
              </h2>
            )}
            {ctaSection?.description && (
              <p className="text-xl text-neutral-light mb-8 max-w-2xl mx-auto">
                {ctaSection.description}
              </p>
            )}
            {ctaSection?.buttonText && (
              ctaSection.buttonUrl ? (
                <a
                  href={ctaSection.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-brand-primary hover:bg-neutral-light font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg mb-6"
                >
                  {ctaSection.buttonText}
                </a>
              ) : (
                <button className="inline-block bg-white text-brand-primary hover:bg-neutral-light font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg mb-6">
                  {ctaSection.buttonText}
                </button>
              )
            )}
            {ctaSection?.phoneText && (
              <p className="text-white mb-2">
                {ctaSection.phoneText}
              </p>
            )}
            {ctaSection?.confidentialityText && (
              <p className="text-sm text-white">
                {ctaSection.confidentialityText}
              </p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer id="about" className="bg-navy-900 text-gray-300 pt-16 pb-8">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  {footer?.logo ? (
                    <Image
                      src={getMediaURL(footer.logo.url)}
                      alt={footer.logo.alternativeText || 'Logo'}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-cyan-500 rounded-lg flex items-center justify-center">
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
                          className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {footer.socialLinks.twitter && (
                        <a
                          href={footer.socialLinks.twitter}
                          className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {footer.socialLinks.github && (
                        <a
                          href={footer.socialLinks.github}
                          className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors"
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
                        className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/10 hover:bg-cyan-500 rounded-lg flex items-center justify-center transition-colors"
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
                        <a href={link.href} className="hover:text-brand-primary400 transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    services.slice(0, 5).map((service) => (
                      <li key={service.id}>
                        <button
                          onClick={() => scrollToService(service.id)}
                          className="hover:text-brand-primary transition-colors text-left"
                        >
                          {service.title}
                        </button>
                      </li>
                    ))
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
                        <a href={link.href} className="hover:text-brand-primary400 transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <Link href="/#about" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                        </Link>
                      </li>
                      <li>
                        <Link href="/solutions" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Çözümler' : 'Solutions'}
                        </Link>
                      </li>
                      <li>
                        <Link href="/#contact" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'İletişim' : 'Contact'}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Kaynaklar' : 'Resources'}
                </h4>
                <ul className="space-y-2">
                  {footer?.links?.resources ? (
                    footer.links.resources.map((link: { label: string; href: string }, index: number) => (
                      <li key={index}>
                        <a href={link.href} className="hover:text-brand-primary400 transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <a href="#" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'ROI Hesaplayıcı' : 'ROI Calculator'}
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Uygulama Kılavuzu' : 'Implementation Guide'}
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Teknik Dökümanlar' : 'Whitepapers'}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">
                  {footer?.copyright || '© 2025 sipsy.ai. All rights reserved.'}
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <a href="#" className="hover:text-brand-primary400 transition-colors">
                    {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-brand-primary400 transition-colors">
                    {language === 'tr' ? 'Hizmet Şartları' : 'Terms of Service'}
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-brand-primary400 transition-colors">
                    {language === 'tr' ? 'Çerez Politikası' : 'Cookie Policy'}
                  </a>
                </div>
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
