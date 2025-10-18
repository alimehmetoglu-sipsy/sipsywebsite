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
import Button from '@/components/Button';
import Card from '@/components/Card';
import ServiceCard from '@/components/ServiceCard';
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
                <Button variant="secondary" size="lg">
                  {hero?.primaryButtonText}
                </Button>
                <Button variant="outline" size="lg">
                  {hero?.secondaryButtonText}
                </Button>
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
                <Card
                  key={item.id}
                  variant="default"
                  padding="lg"
                >
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-cyan-100">
                    <DynamicIcon
                      icon={item.icon}
                      className="w-8 h-8 text-navy-800"
                      size={32}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
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
                <ServiceCard
                  key={service.id}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  linkText={service.linkText}
                  link={service.link}
                  keyTools={service.keyTools}
                  toolsLabel={language === 'tr' ? 'Anahtar araçlar:' : 'Key tools:'}
                  getMediaURL={getMediaURL}
                />
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
                className="inline-block mb-6"
              >
                <Button size="xl" className="bg-white text-navy-900 hover:bg-neutral-light font-bold shadow-lg transition-all duration-300 hover:scale-105">
                  {ctaSection.buttonText}
                </Button>
              </a>
            ) : (
              <div className="mb-6">
                <Button size="xl" className="bg-white text-navy-900 hover:bg-neutral-light font-bold shadow-lg transition-all duration-300 hover:scale-105">
                  {ctaSection.buttonText}
                </Button>
              </div>
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
