'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import SolutionCard from '@/components/SolutionCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSolutions, getServices, getCtaSection, getFooter } from '@/lib/strapi';
import { Solution, Service } from '@/lib/types';
import { Bot, Linkedin, Twitter, Github } from 'lucide-react';
import Image from 'next/image';

export default function SolutionsPage() {
  const { language } = useLanguage();
  const [solutions, setSolutions] = useState<(Solution & { id: number })[]>([]);
  const [services, setServices] = useState<(Service & { id: number })[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ctaSection, setCtaSection] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [solutionsData, servicesData, ctaData, footerData] = await Promise.all([
          getSolutions(language),
          getServices(language),
          getCtaSection(language),
          getFooter(language),
        ]);

        setSolutions(solutionsData || []);
        setServices(servicesData || []);
        setCtaSection(ctaData);
        setFooter(footerData);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [language]);

  // Filter solutions by selected service
  const filteredSolutions = selectedService
    ? solutions.filter(s => s.service?.id === selectedService)
    : solutions;

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-20">
        {/* Service Filters */}
        {services.length > 0 && (
          <section className="bg-white border-b sticky top-20 z-40 shadow-sm">
            <div className="container-custom py-6">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedService(null)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedService === null
                      ? 'bg-brand-secondary text-navy-900 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {language === 'tr' ? 'Tümü' : 'All'}
                </button>
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedService === service.id
                        ? service.color === 'accent'
                          ? 'bg-copper-500 text-white shadow-lg'
                          : 'bg-gold-500 text-navy-900 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Solutions Grid */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-accent"></div>
              </div>
            ) : filteredSolutions.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-navy-900 mb-4">
                    {selectedService
                      ? services.find(s => s.id === selectedService)?.title
                      : language === 'tr'
                      ? 'Tüm Çözümlerimiz'
                      : 'All Our Solutions'}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {filteredSolutions.length}{' '}
                    {language === 'tr'
                      ? filteredSolutions.length === 1
                        ? 'çözüm bulundu'
                        : 'çözüm bulundu'
                      : filteredSolutions.length === 1
                      ? 'solution found'
                      : 'solutions found'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredSolutions.map((solution) => (
                    <SolutionCard
                      key={solution.id}
                      solution={solution}
                      language={language}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  {language === 'tr' ? 'Henüz Çözüm Eklenmemiş' : 'No Solutions Yet'}
                </h3>
                <p className="text-gray-600">
                  {language === 'tr'
                    ? 'Strapi admin panelinden yeni çözümler ekleyebilirsiniz.'
                    : 'You can add new solutions from the Strapi admin panel.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-gold-500 via-gold-400 to-copper-500">
          <div className="container-custom text-center">
            {ctaSection?.title && (
              <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                {ctaSection.title}
              </h2>
            )}
            {ctaSection?.description && (
              <p className="text-xl text-navy-800 mb-8 max-w-2xl mx-auto">
                {ctaSection.description}
              </p>
            )}
            {ctaSection?.buttonText && (
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
            {ctaSection?.phoneText && (
              <p className="text-navy-800 mb-2">
                {ctaSection.phoneText}
              </p>
            )}
            {ctaSection?.confidentialityText && (
              <p className="text-sm text-navy-700">
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
                    services.slice(0, 5).map((service) => (
                      <li key={service.id}>
                        <a href={service.link || '#'} className="hover:text-brand-accent transition-colors">
                          {service.title}
                        </a>
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
                        <a href={link.href} className="hover:text-gold-400 transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <a href="/#about" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                        </a>
                      </li>
                      <li>
                        <a href="/#case-studies" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'Vaka Çalışmaları' : 'Case Studies'}
                        </a>
                      </li>
                      <li>
                        <a href="/#resources" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'Blog' : 'Blog'}
                        </a>
                      </li>
                      <li>
                        <a href="/#contact" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'İletişim' : 'Contact'}
                        </a>
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
                        <a href={link.href} className="hover:text-gold-400 transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <a href="#" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'ROI Hesaplayıcı' : 'ROI Calculator'}
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-brand-accent transition-colors">
                          {language === 'tr' ? 'Uygulama Kılavuzu' : 'Implementation Guide'}
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-brand-accent transition-colors">
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
                  <a href="#" className="hover:text-gold-400 transition-colors">
                    {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-gold-400 transition-colors">
                    {language === 'tr' ? 'Hizmet Şartları' : 'Terms of Service'}
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-gold-400 transition-colors">
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
