'use client';

import { useEffect, useState } from 'react';
import { getMediaURL } from '../lib/strapi';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import {
  ChevronDown,
  Bot,
  Brain,
  Network,
  Database,
  Sparkles,
  TrendingUp,
  Search,
  Map,
  Code,
  Repeat,
  ArrowRight,
  Star,
  Linkedin,
  Twitter,
  Github,
} from 'lucide-react';
import DynamicIcon from '@/components/DynamicIcon';
import {
  getHeroSection,
  getValuePropositions,
  getServices,
  getMetrics,
  getFeaturedCaseStudies,
  getFeaturedTestimonials,
  getPartners,
  getProcessSteps,
  getBlogPosts,
  getCtaSection,
  getFooter,
} from '@/lib/strapi';
import {
  ValueProposition,
  Service,
  Metric,
  ProcessStep,
  BlogPost,
} from '@/lib/types';

interface ClientHomeProps {
  initialData: {
    heroData: any;
    valuePropositions: any[];
    services: any[];
    metrics: any[];
    caseStudies: any[];
    testimonials: any[];
    partners: any[];
    processSteps: any[];
    blogPosts: any[];
    ctaSectionData: any;
    footerData: any;
  };
}

export default function ClientHome({ initialData }: ClientHomeProps) {
  const { language } = useLanguage();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [
          heroData,
          valuePropositions,
          services,
          metrics,
          caseStudies,
          testimonials,
          partners,
          processSteps,
          blogPosts,
          ctaSectionData,
          footerData,
        ] = await Promise.all([
          getHeroSection(language),
          getValuePropositions(language),
          getServices(language),
          getMetrics(language),
          getFeaturedCaseStudies(language),
          getFeaturedTestimonials(language),
          getPartners(language),
          getProcessSteps(language),
          getBlogPosts(language),
          getCtaSection(language),
          getFooter(language),
        ]);

        setData({
          heroData,
          valuePropositions,
          services,
          metrics,
          caseStudies,
          testimonials,
          partners,
          processSteps,
          blogPosts,
          ctaSectionData,
          footerData,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [language]);

  const featuredCaseStudy = data.caseStudies?.[0];
  const featuredTestimonial = data.testimonials?.[0];
  const hero = data.heroData;
  const ctaSection = data.ctaSectionData;
  const footer = data.footerData;

  const safeValuePropositions = data.valuePropositions || [];
  const safeServices = data.services || [];
  const safeMetrics = data.metrics || [];
  const safeProcessSteps = data.processSteps || [];
  const safeBlogPosts = data.blogPosts || [];

  return (
    <main className={`min-h-screen ${isLoading ? 'opacity-50 transition-opacity' : ''}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/Gemini_Generated_Image_b0ikmsb0ikmsb0ik.png)',
          }}
        />

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800/90 via-navy-dark/90 to-navy-800/90" />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                {hero?.title}{' '}
                <span className="text-brand-secondary">{hero?.highlightedText}</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                {hero?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-brand-secondary hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 text-lg shadow-lg">
                  {hero?.primaryButtonText}
                </button>
                <button className="border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                  {hero?.secondaryButtonText}
                </button>
              </div>
              {hero?.certifiedPartners && hero.certifiedPartners.length > 0 && (
                <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start text-sm text-gray-300">
                  <span className="font-semibold">
                    {language === 'tr' ? 'Sertifikalı Ortaklar:' : 'Certified Partners:'}
                  </span>
                  {hero.certifiedPartners.map((partner: { name: string; logo?: string }, index: number) => (
                    <span key={index}>
                      {index > 0 && <span className="mr-4">•</span>}
                      {partner.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-navy-800/20 to-cyan-500/20 rounded-2xl backdrop-blur-sm border border-white/10 p-8">
                <div className="space-y-4">
                  {/* Animated nodes */}
                  <div className="flex items-center space-x-4 animate-pulse">
                    <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 h-2 bg-gradient-to-r from-navy-800 to-cyan-500 rounded"></div>
                    <div className="w-16 h-16 bg-navy-800 rounded-lg flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 animate-pulse delay-500">
                    <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 h-2 bg-gradient-to-r from-cyan-500 to-navy-800 rounded"></div>
                    <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <Network className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 animate-pulse delay-1000">
                    <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 h-2 bg-gradient-to-r from-navy-800 to-cyan-500 rounded"></div>
                    <div className="w-16 h-16 bg-navy-800 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* Value Proposition - Now positioned after hero */}
      <section className="section-padding bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4 text-brand-primary">
            {language === 'tr' ? 'Neden sipsy.ai?' : 'Why Choose sipsy.ai?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {safeValuePropositions.map((item: ValueProposition & {id: number}) => {
              return (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-cyan-500"
                >
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-cyan-light">
                    <DynamicIcon
                      icon={item.icon}
                      className="w-8 h-8 text-brand-primary"
                      size={32}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-neutral-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="section-padding bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              {language === 'tr' ? 'Uzmanlığımız' : 'Our Expertise'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'tr'
                ? 'İşletmenizin ihtiyaçlarına özel uçtan uca otomasyon ve yapay zeka çözümleri'
                : 'End-to-end automation and AI solutions tailored to your business needs'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeServices.map((service: Service & {id: number}) => {
              return (
                <div
                  key={service.id}
                  className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-transparent transition-all duration-300 hover:scale-105 shadow-lg hover:border-cyan-500"
                >
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-cyan-light">
                    <DynamicIcon
                      icon={service.icon}
                      className="w-7 h-7 text-brand-primary"
                      size={28}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-medium mb-4">
                    {service.description}
                  </p>
                  {service.keyTools && service.keyTools.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-neutral-medium mb-2">
                        {language === 'tr' ? 'Anahtar araçlar:' : 'Key tools:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.keyTools.map((tool, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-light rounded-full text-sm"
                          >
                            {tool.Logo && (
                              <Image
                                src={getMediaURL(tool.Logo.url)}
                                alt={tool.Logo.alternativeText || tool.Name}
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain"
                              />
                            )}
                            <span className="text-navy-900 font-medium">{tool.Name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <a
                    href={service.link || '#'}
                    className="inline-flex items-center font-semibold hover:underline text-brand-primary hover:text-cyan-500"
                  >
                    {service.linkText}{' '}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="contact"
        className="section-padding bg-gradient-to-r from-navy-800 via-brand-primary to-cyan-500"
      >
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
              <button className="bg-white text-brand-primary hover:bg-neutral-light font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg mb-6">
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
            <p className="text-sm text-neutral-light">
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
                  <Image
                    src="/images/logo.png"
                    alt="Sipsy Logo"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                )}
                <span className="text-2xl font-bold text-white">{footer?.siteName || 'sipsy.ai'}</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {footer?.companyDescription || (language === 'tr' ? 'Ölçülebilir ROI sağlayan kurumsal AI ve otomasyon çözümleri' : 'Enterprise AI and automation solutions that deliver measurable ROI')}
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
                      <a href={link.href} className="hover:text-cyan-500 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))
                ) : null}
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
                      <a href={link.href} className="hover:text-cyan-500 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))
                ) : null}
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
                      <a href={link.href} className="hover:text-cyan-500 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))
                ) : null}
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
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="hover:text-cyan-500 transition-colors">
                  {language === 'tr' ? 'Hizmet Şartları' : 'Terms of Service'}
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="hover:text-cyan-500 transition-colors">
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
  );
}
