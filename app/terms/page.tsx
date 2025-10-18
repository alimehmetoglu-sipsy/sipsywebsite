'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { getPageBySlug, getFooter, getMediaURL } from '@/lib/strapi';
import { Page } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bot, Linkedin, Twitter, Github } from 'lucide-react';
import Image from 'next/image';

export default function TermsPage() {
  const { language } = useLanguage();
  const [pageData, setPageData] = useState<Page | null>(null);
  const [footer, setFooter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [page, footerData] = await Promise.all([
          getPageBySlug('terms', language),
          getFooter(language),
        ]);

        setPageData(page);
        setFooter(footerData);
      } catch (error) {
        console.error('Error fetching terms page:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [language]);

  return (
    <>
      <Navigation forceScrolled={true} />

      <main className="min-h-screen pt-20 bg-neutral-light">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {pageData?.title || (language === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service')}
              </h1>
              <p className="text-xl text-gray-300">
                {language === 'tr'
                  ? 'Hizmetlerimizi kullanırken geçerli olan şartlar ve koşullar'
                  : 'Terms and conditions for using our services'}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
                </div>
              ) : pageData?.content ? (
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                  <div
                    className="prose prose-lg max-w-none
                               prose-headings:font-bold prose-headings:text-navy-900
                               prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:first:mt-0
                               prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-cyan-500/30
                               prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-navy-800
                               prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                               prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                               prose-li:text-gray-700 prose-li:leading-relaxed prose-li:mb-2
                               prose-strong:text-navy-900 prose-strong:font-semibold
                               prose-a:text-brand-primary prose-a:font-medium prose-a:no-underline
                               hover:prose-a:text-cyan-600 hover:prose-a:underline
                               prose-hr:my-12 prose-hr:border-gray-300
                               prose-em:text-gray-600 prose-em:italic"
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                      {language === 'tr'
                        ? 'Kullanım koşulları içeriği henüz yüklenmedi. Lütfen daha sonra tekrar deneyin.'
                        : 'Terms of service content is not yet available. Please try again later.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

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
                        className="w-10 h-10 bg-white/10 hover:bg-brand-primary rounded-lg flex items-center justify-center transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {footer.socialLinks.twitter && (
                      <a
                        href={footer.socialLinks.twitter}
                        className="w-10 h-10 bg-white/10 hover:bg-brand-primary rounded-lg flex items-center justify-center transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {footer.socialLinks.github && (
                      <a
                        href={footer.socialLinks.github}
                        className="w-10 h-10 bg-white/10 hover:bg-brand-primary rounded-lg flex items-center justify-center transition-colors"
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
                      className="w-10 h-10 bg-white/10 hover:bg-brand-primary rounded-lg flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-white/10 hover:bg-brand-primary rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-white/10 hover:bg-brand-primary rounded-lg flex items-center justify-center transition-colors"
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
                      <a href={link.href} className="hover:text-brand-primary transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <a href="/#services" className="hover:text-brand-primary transition-colors">
                        {language === 'tr' ? 'RPA & Hiperotomasyon' : 'RPA & Hyperautomation'}
                      </a>
                    </li>
                    <li>
                      <a href="/#services" className="hover:text-brand-primary transition-colors">
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
                      <a href={link.href} className="hover:text-brand-primary transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <a href="/#about" className="hover:text-brand-primary transition-colors">
                        {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                      </a>
                    </li>
                    <li>
                      <a href="/contact" className="hover:text-brand-primary transition-colors">
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
                  <a href="/privacy" className="hover:text-brand-primary transition-colors">
                    {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-brand-primary transition-colors">
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
    </>
  );
}
