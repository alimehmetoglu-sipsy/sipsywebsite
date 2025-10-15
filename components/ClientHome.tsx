'use client';

import { useEffect, useState } from 'react';
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
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-800/80 to-navy-900/80" />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gold-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-copper-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                <button className="bg-brand-secondary hover:bg-gold-500 text-navy-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 text-lg shadow-lg">
                  {hero?.primaryButtonText}
                </button>
                <button className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300">
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
              <div className="relative w-full h-96 bg-gradient-to-br from-gold-400/20 to-copper-500/20 rounded-2xl backdrop-blur-sm border border-white/10 p-8">
                <div className="space-y-4">
                  {/* Animated nodes */}
                  <div className="flex items-center space-x-4 animate-pulse">
                    <div className="w-16 h-16 bg-gold-500 rounded-lg flex items-center justify-center">
                      <Bot className="w-8 h-8 text-navy-900" />
                    </div>
                    <div className="flex-1 h-2 bg-gradient-to-r from-gold-400 to-copper-500 rounded"></div>
                    <div className="w-16 h-16 bg-copper-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 animate-pulse delay-500">
                    <div className="w-16 h-16 bg-azure-500 rounded-lg flex items-center justify-center">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 h-2 bg-gradient-to-r from-azure-500 to-gold-400 rounded"></div>
                    <div className="w-16 h-16 bg-gold-500 rounded-lg flex items-center justify-center">
                      <Network className="w-8 h-8 text-navy-900" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 animate-pulse delay-1000">
                    <div className="w-16 h-16 bg-gold-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-navy-900" />
                    </div>
                    <div className="flex-1 h-2 bg-gradient-to-r from-gold-400 to-copper-500 rounded"></div>
                    <div className="w-16 h-16 bg-copper-500 rounded-lg flex items-center justify-center">
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
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2
            className="text-4xl font-bold text-center mb-4"
            style={{ color: 'rgba(204, 96, 47, 1)' }}
          >
            {language === 'tr' ? 'Neden sipsy.ai?' : 'Why Choose sipsy.ai?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {safeValuePropositions.map((item: ValueProposition & {id: number}) => {
              const isAccent = item.id % 2 === 0;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-[rgba(204,96,47,0.5)]"
                >
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: isAccent ? 'rgba(204, 96, 47, 0.1)' : 'rgba(204, 96, 47, 0.15)'
                    }}
                  >
                    <DynamicIcon
                      icon={item.icon}
                      style={{ color: 'rgba(204, 96, 47, 1)' }}
                      className="w-8 h-8"
                      size={32}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="section-padding bg-white">
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
              const isAccent = service.color === 'accent';
              return (
                <div
                  key={service.id}
                  className={`group relative bg-white rounded-xl p-6 border-2 border-transparent transition-all duration-300 hover:scale-105 shadow-lg ${
                    isAccent
                      ? 'hover:border-copper-500'
                      : 'hover:border-gold-400'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${
                      isAccent ? 'bg-copper-500/10' : 'bg-gold-400/10'
                    }`}
                  >
                    <DynamicIcon
                      icon={service.icon}
                      className={`w-7 h-7 ${
                        isAccent ? 'text-copper-500' : 'text-gold-500'
                      }`}
                      size={28}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  {service.keyTools && (
                    <p className="text-sm text-gray-500 mb-4">
                      <span className="font-semibold">
                        {language === 'tr' ? 'Anahtar araçlar:' : 'Key tools:'}
                      </span>{' '}
                      {service.keyTools}
                    </p>
                  )}
                  <a
                    href={service.link || '#'}
                    className={`inline-flex items-center font-semibold hover:underline ${
                      isAccent ? 'text-copper-500' : 'text-gold-600'
                    }`}
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

      {/* Methodology Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-16">
            {language === 'tr' ? 'Kanıtlanmış Sürecimiz' : 'Our Proven Process'}
          </h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-copper-500 to-gold-400 transform translate-y-1/2"></div>

            {safeProcessSteps.length > 0 ? (
              safeProcessSteps.map((step: ProcessStep & {id: number}, index: number) => {
                const isAccent = index % 2 !== 0;
                const stepNumber = step.stepNumber || index + 1;
                return (
                  <div key={step.id} className="relative text-center">
                    <div className={`w-24 h-24 bg-white border-4 ${isAccent ? 'border-copper-500' : 'border-gold-400'} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10`}>
                      <DynamicIcon
                        icon={step.icon || 'Search'}
                        className={`w-10 h-10 ${isAccent ? 'text-copper-500' : 'text-gold-500'}`}
                        size={40}
                      />
                    </div>
                    <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 ${isAccent ? 'bg-copper-500' : 'bg-gold-500'} text-white rounded-full flex items-center justify-center font-bold text-xl z-20`}>
                      {stepNumber}
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                );
              })
            ) : (
              <>
                {/* Default fallback steps */}
                <div className="relative text-center">
                  <div className="w-24 h-24 bg-white border-4 border-gold-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                    <Search className="w-10 h-10 text-gold-500" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-20">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {language === 'tr' ? 'Keşif & Değerlendirme' : 'Discovery & Assessment'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'tr'
                      ? 'Süreçleri analiz edin ve otomasyon fırsatlarını belirleyin'
                      : 'Analyze processes and identify automation opportunities'}
                  </p>
                </div>
                <div className="relative text-center">
                  <div className="w-24 h-24 bg-white border-4 border-copper-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                    <Map className="w-10 h-10 text-copper-500" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-copper-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-20">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {language === 'tr' ? 'Strateji & Yol Haritası' : 'Strategy & Roadmap'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'tr'
                      ? 'Ölçeklenebilir çözüm mimarisi ve uygulama planı tasarlayın'
                      : 'Design scalable solution architecture and implementation plan'}
                  </p>
                </div>
                <div className="relative text-center">
                  <div className="w-24 h-24 bg-white border-4 border-gold-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                    <Code className="w-10 h-10 text-gold-500" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-20">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {language === 'tr' ? 'Geliştirme & Dağıtım' : 'Build & Deploy'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'tr'
                      ? 'Minimum iş kesintisiyle geliştirme, test etme ve dağıtma'
                      : 'Develop, test, and deploy with minimal business disruption'}
                  </p>
                </div>
                <div className="relative text-center">
                  <div className="w-24 h-24 bg-white border-4 border-copper-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                    <Repeat className="w-10 h-10 text-copper-500" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-copper-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-20">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {language === 'tr' ? 'Optimize Etme & Ölçeklendirme' : 'Optimize & Scale'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'tr'
                      ? 'Sürekli izleme, optimizasyon ve genişleme'
                      : 'Continuous monitoring, optimization, and expansion'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Results Metrics */}
      <section className="section-padding bg-gradient-to-r from-navy-900 via-azure-700 to-navy-900">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            {language === 'tr' ? 'Gerçek İş Etkisi Sağlama' : 'Delivering Real Business Impact'}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {safeMetrics.map((metric: Metric & {id: number}) => (
              <div key={metric.id} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-white mb-4">
                  {metric.value}
                </div>
                <p className="text-xl text-gray-200">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section id="case-studies" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-12">
            {language === 'tr' ? 'Son Başarı Hikayesi' : 'Latest Success Story'}
          </h2>
          {featuredCaseStudy && (
            <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-64 lg:h-full bg-gradient-to-br from-gold-400 to-copper-500 flex items-center justify-center">
                <div className="text-center p-8">
                  <DynamicIcon
                    icon={featuredCaseStudy.icon}
                    className="w-20 h-20 text-white mx-auto mb-4"
                    size={80}
                  />
                  <h3 className="text-2xl font-bold text-white">
                    {featuredCaseStudy.subtitle ||
                      featuredCaseStudy.title}
                  </h3>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-navy-900 mb-6">
                  {featuredCaseStudy.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredCaseStudy.description}
                </p>
                <div className="space-y-4 mb-8">
                  {featuredCaseStudy.results.map((result: { metric: string; value: string }, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-navy-900 text-sm font-bold">✓</span>
                      </div>
                      <p className="text-gray-700">
                        <span className="font-bold">{result.value}</span>{' '}
                        {result.metric}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="bg-azure-500 hover:bg-azure-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
                  {featuredCaseStudy.buttonText}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {featuredTestimonial && (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(featuredTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl font-medium text-navy-900 mb-8 leading-relaxed">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-accent rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {featuredTestimonial.authorInitials ||
                    featuredTestimonial.authorName
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="font-bold text-navy-900 text-lg">
                    {featuredTestimonial.authorName}
                  </p>
                  <p className="text-gray-600">
                    {featuredTestimonial.authorTitle}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-12">
            {language === 'tr' ? 'Son Görüşler' : 'Latest Insights'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {safeBlogPosts.length > 0 ? (
              safeBlogPosts.slice(0, 3).map((post: BlogPost & {id: number}, index: number) => {
                const gradients = [
                  'from-gold-400 to-copper-500',
                  'from-copper-500 to-gold-400',
                  'from-navy-900 to-azure-700'
                ];
                const icons = [Brain, Bot, TrendingUp];
                const Icon = icons[index % icons.length];
                const gradient = gradients[index % gradients.length];
                const categoryColors = {
                  'AI/ML': 'bg-gold-400/10 text-gold-600',
                  'RPA': 'bg-copper-500/10 text-copper-600',
                  'Case Study': 'bg-navy-900/10 text-navy-900'
                };
                const categoryColor = categoryColors[post.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700';
                const linkColors = ['text-gold-600', 'text-copper-600', 'text-navy-900'];
                const linkColor = linkColors[index % linkColors.length];

                return (
                  <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <Icon className="w-16 h-16 text-white" />
                    </div>
                    <div className="p-6">
                      {post.category && (
                        <span className={`inline-block px-3 py-1 ${categoryColor} text-sm font-semibold rounded-full mb-3`}>
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-navy-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      {post.publishDate && (
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{language === 'tr' ? 'Oku' : 'Read'}</span>
                          <span>{new Date(post.publishDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      )}
                      <a
                        href="#"
                        className={`inline-flex items-center ${linkColor} font-semibold hover:underline`}
                      >
                        {language === 'tr' ? 'Devamını Oku' : 'Read More'} <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </article>
                );
              })
            ) : null}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="contact"
        className="section-padding bg-gradient-to-r from-gold-500 via-gold-400 to-copper-500"
      >
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
            {ctaSection?.title || (language === 'tr' ? 'Operasyonlarınızı Dönüştürmeye Hazır mısınız?' : 'Ready to Transform Your Operations?')}
          </h2>
          <p className="text-xl text-navy-800 mb-8 max-w-2xl mx-auto">
            {ctaSection?.description || (language === 'tr' ? 'Otomasyon fırsatlarınızı görüşmek için ücretsiz 30 dakikalık bir danışma planlayın' : 'Schedule a free 30-minute consultation to discuss your automation opportunities')}
          </p>
          <button className="bg-navy-900 text-gold-400 hover:bg-navy-800 font-bold px-10 py-5 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg mb-6">
            {ctaSection?.buttonText || (language === 'tr' ? 'Ücretsiz Danışmanlığınızı Ayırtın' : 'Book Your Free Consultation')}
          </button>
          <p className="text-navy-800 mb-2">
            {language === 'tr' ? 'Veya bizi arayın: +1 (555) 123-4567' : 'Or call us: +1 (555) 123-4567'}
          </p>
          <p className="text-sm text-navy-700">
            {language === 'tr' ? 'Taahhüt gerekli değil • %100 gizli' : 'No commitment required • 100% confidential'}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-navy-900 text-gray-300 pt-16 pb-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Sipsy Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-2xl font-bold text-white">sipsy.ai</span>
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
                      <a href={link.href} className="hover:text-gold-400 transition-colors">
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
                      <a href={link.href} className="hover:text-gold-400 transition-colors">
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
  );
}
