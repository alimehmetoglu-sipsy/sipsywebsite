'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import DynamicIcon from '@/components/DynamicIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSolutionBySlug, getCtaSection, getFooter, getMediaURL } from '@/lib/strapi';
import { Solution } from '@/lib/types';
import {
  Bot,
  ChevronRight,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart,
  Shield,
  Users,
  Star,
  ChevronDown,
  Sparkles,
  Target,
  Award,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SolutionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useLanguage();
  const [solution, setSolution] = useState<(Solution & { id: number }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ctaSection, setCtaSection] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [solutionData, ctaData, footerData] = await Promise.all([
          getSolutionBySlug(slug, language),
          getCtaSection(language),
          getFooter(language),
        ]);

        setSolution(solutionData);
        setCtaSection(ctaData);
        setFooter(footerData);
      } catch (error) {
        console.error('Error fetching solution:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug, language]);

  // Sticky CTA scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex justify-center items-center bg-neutral-light pt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
        </div>
      </>
    );
  }

  if (!solution) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-light pt-20">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            {language === 'tr' ? 'Çözüm Bulunamadı' : 'Solution Not Found'}
          </h1>
          <Link href="/solutions" className="text-brand-primary hover:underline">
            {language === 'tr' ? '← Tüm Çözümler' : '← All Solutions'}
          </Link>
        </div>
      </>
    );
  }

  const serviceColor = solution.service?.color === 'accent' ? 'brand-primary' : 'brand-secondary';
  const serviceBgColor = solution.service?.color === 'accent' ? 'bg-brand-primary' : 'bg-brand-secondary';
  const serviceTextColor = solution.service?.color === 'accent' ? 'text-brand-primary' : 'text-brand-secondary';
  const serviceBorderColor = solution.service?.color === 'accent' ? 'border-brand-primary' : 'border-brand-secondary';

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('final-cta');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navigation />

      {/* Sticky Floating CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <button
            onClick={scrollToCTA}
            className={`${serviceBgColor} text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 group`}
          >
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            <span className="font-semibold">
              {language === 'tr' ? 'Ücretsiz Demo' : 'Get Free Demo'}
            </span>
          </button>
        </div>
      )}

      <main className="min-h-screen">
        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden pt-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-brand-secondary rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container-custom relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                {language === 'tr' ? 'Ana Sayfa' : 'Home'}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/solutions" className="hover:text-white transition-colors">
                {language === 'tr' ? 'Çözümler' : 'Solutions'}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{solution.project?.projectName || solution.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                {/* Service Badge */}
                {solution.service && (
                  <div className="mb-6">
                    <span className={`inline-block px-4 py-2 ${serviceBgColor} text-white text-sm font-semibold rounded-full shadow-lg`}>
                      {solution.service.title}
                    </span>
                  </div>
                )}

                {/* Title & Icon */}
                <div className="flex items-start gap-6 mb-6">
                  {solution.icon && (
                    <div className="flex-shrink-0">
                      <div className={`w-20 h-20 ${serviceBgColor} rounded-2xl flex items-center justify-center shadow-xl`}>
                        <DynamicIcon icon={solution.icon} className="w-12 h-12 text-white" size={48} />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                      {solution.title}
                    </h1>
                  </div>
                </div>

                {/* Value Proposition */}
                {solution.subtitle && (
                  <p className="text-2xl text-gray-200 mb-6 font-medium">{solution.subtitle}</p>
                )}

                {solution.shortDescription && (
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">{solution.shortDescription}</p>
                )}

                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={scrollToCTA}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>
                      {solution.heroCTA?.primaryButtonText || (language === 'tr' ? 'Ücretsiz Demo Talep Edin' : 'Request Free Demo')}
                    </span>
                  </button>
                  <button
                    onClick={scrollToCTA}
                    className="border-2 border-white text-white hover:bg-white hover:text-navy-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>
                      {solution.heroCTA?.secondaryButtonText || (language === 'tr' ? 'Uzmanla Görüş' : 'Talk to Expert')}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right - Key Metrics Highlight */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  {language === 'tr' ? 'Gerçek İş Sonuçları' : 'Real Business Results'}
                </h3>

                {/* All Results from API */}
                {solution.project?.results && solution.project.results.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {solution.project.results.map((result, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        {result.emoji && (
                          <div className="text-3xl mb-2">{result.emoji}</div>
                        )}
                        <p className="text-sm text-gray-300 mb-1">{result.metric}</p>
                        <p className="text-xl font-bold text-white">{result.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {solution.project?.clientInfo && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-gray-300 text-center">
                      <span className="font-semibold">{language === 'tr' ? 'İstemci:' : 'Client:'}</span> {solution.project.clientInfo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </section>

        {/* Problem Section - Enhanced with Empathy */}
        {solution.project?.problemPoints && solution.project.problemPoints.length > 0 && (
          <section className="section-padding bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                {/* Empathy Header */}
                <div className="text-center mb-12">
                  <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-4xl font-bold text-navy-900 mb-4">
                    {solution.project.problemTitle || (language === 'tr' ? 'Bu Tanıdık Geliyor mu?' : 'Does This Sound Familiar?')}
                  </h2>
                  {solution.project.problemDescription && (
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                      {solution.project.problemDescription}
                    </p>
                  )}
                </div>

                {/* Problem Points with Impact */}
                <div className="space-y-4">
                  {solution.project.problemPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        {point.emoji ? (
                          <span className="text-2xl">{point.emoji}</span>
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-gray-800 leading-relaxed font-medium">{point.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pain Point CTA */}
                <div className="mt-12 text-center bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {language === 'tr'
                      ? 'Bu Sorunlar Size Tanıdık Geliyor mu?'
                      : 'Do These Problems Sound Familiar?'}
                  </h3>
                  <p className="text-white/90 mb-6 text-lg">
                    {language === 'tr'
                      ? 'Siz de benzer zorluklarla mı karşılaşıyorsunuz? Çözümü birlikte bulalım.'
                      : 'Are you facing similar challenges? Let\'s find the solution together.'}
                  </p>
                  <button
                    onClick={scrollToCTA}
                    className="bg-white text-red-600 hover:bg-neutral-light font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {language === 'tr' ? 'Çözümü Keşfet' : 'Discover the Solution'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Solution Section - Benefit-Focused */}
        {solution.project?.solutionSteps && solution.project.solutionSteps.length > 0 && (
          <section className="section-padding bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-100">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                {/* Solution Header */}
                <div className="text-center mb-12">
                  <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-bold text-navy-900 mb-4">
                    {solution.project.solutionTitle || (language === 'tr' ? 'Akıllı Çözümümüz' : 'Our Smart Solution')}
                  </h2>
                  {solution.project.solutionDescription && (
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                      {solution.project.solutionDescription}
                    </p>
                  )}
                </div>

                {/* Solution Steps with Benefits */}
                <div className="space-y-6">
                  {solution.project.solutionSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`relative flex items-start space-x-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-lg border-l-4 ${serviceBorderColor} hover:shadow-2xl transition-all duration-300 group`}
                    >
                      {/* Step Number */}
                      <div className={`flex-shrink-0 w-12 h-12 ${serviceBgColor} text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg`}>
                        {index + 1}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          {step.emoji && (
                            <span className="text-3xl flex-shrink-0">{step.emoji}</span>
                          )}
                          <p className="text-lg text-gray-800 leading-relaxed font-medium">{step.text}</p>
                        </div>
                      </div>

                      {/* Success indicator */}
                      <CheckCircle2 className={`w-6 h-6 ${serviceTextColor} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Technologies Section */}
        {solution.keyTools && solution.keyTools.length > 0 && (
          <section className="section-padding bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-4">
                  {solution.technologiesSection?.title || (language === 'tr' ? 'Güçlü Teknoloji Altyapımız' : 'Powerful Technology Stack')}
                </h2>
                <p className="text-lg text-gray-600">
                  {solution.technologiesSection?.description || (language === 'tr'
                    ? 'Endüstri lideri araçlar ve platformlar kullanıyoruz'
                    : 'We use industry-leading tools and platforms')}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
                {solution.keyTools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-neutral-light to-neutral-light rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-primary group w-64"
                  >
                    {tool.Logo ? (
                      <div className="w-16 h-16 mb-4 flex items-center justify-center">
                        <Image
                          src={getMediaURL(tool.Logo.url)}
                          alt={tool.Logo.alternativeText || tool.Name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-brand-primary" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{tool.Name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Before/After - More Dramatic with Progress */}
        {solution.project?.beforeMetrics && solution.project?.afterMetrics && (
          <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {solution.beforeAfterSection?.title || (language === 'tr' ? 'Dönüşüm: Önce vs Sonra' : 'Transformation: Before vs After')}
                </h2>
                <p className="text-xl text-gray-300">
                  {solution.beforeAfterSection?.description || (language === 'tr'
                    ? 'Gerçek verilerle kanıtlanmış dramatik iyileştirmeler'
                    : 'Dramatic improvements proven with real data')}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Before */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {language === 'tr' ? 'ÖNCE' : 'BEFORE'}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="space-y-6">
                      {solution.project.beforeMetrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-semibold text-gray-600 uppercase">{metric.label}</p>
                            <p className="text-2xl font-bold text-red-600">{metric.value}</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-red-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {language === 'tr' ? 'SONRA' : 'AFTER'}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="space-y-6">
                      {solution.project.afterMetrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-semibold text-gray-600 uppercase">{metric.label}</p>
                            <p className="text-2xl font-bold text-green-600">{metric.value}</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation Arrow */}
              <div className="flex justify-center my-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-8 py-4">
                  <ArrowRight className="w-12 h-12 text-green-400 animate-pulse" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results Section - ROI Focused */}
        {solution.project?.results && solution.project.results.length > 0 && (
          <section className="section-padding bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50">
            <div className="container-custom">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-bold text-navy-900 mb-4">
                    {solution.project.resultsTitle || (language === 'tr' ? 'Ölçülebilir İş Sonuçları' : 'Measurable Business Results')}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {language === 'tr'
                      ? 'Sadece vaatler değil, gerçek sayılar ve kanıtlanmış ROI'
                      : 'Not just promises, real numbers and proven ROI'}
                  </p>
                </div>

                {/* Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {solution.project.results.map((result, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-500"
                    >
                      <div className="flex flex-col items-center text-center">
                        {result.emoji && (
                          <div className="text-5xl mb-4">{result.emoji}</div>
                        )}
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                          {result.metric}
                        </h3>
                        <p className="text-4xl font-bold text-brand-primary mb-2">
                          {result.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section id="final-cta" className="section-padding bg-gradient-to-r from-navy-800 via-brand-primary to-cyan-500">
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

        {/* Other Solutions Teaser */}
        <section className="section-padding bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-100">
          <div className="container-custom text-center">
            <h3 className="text-3xl font-bold text-navy-900 mb-4">
              {solution.relatedSolutionsSection?.title || (language === 'tr' ? 'Diğer Çözümlerimiz' : 'Our Other Solutions')}
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              {solution.relatedSolutionsSection?.description || (language === 'tr'
                ? 'İşletmeniz için başka çözümler de keşfedin'
                : 'Discover other solutions for your business')}
            </p>
            <Link
              href="/solutions"
              className={`inline-flex items-center ${serviceBgColor} text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg`}
            >
              {language === 'tr' ? 'Tüm Çözümleri Gör' : 'View All Solutions'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy-900 text-gray-300 pt-16 pb-8">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
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
                        <Link href="/solutions" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Çözümler' : 'Solutions'}
                        </Link>
                      </li>
                      <li>
                        <a href="/#services" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>

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
                        <a href="/#contact" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'İletişim' : 'Contact'}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Kaynaklar' : 'Resources'}
                </h4>
                <ul className="space-y-2">
                  {footer?.links?.resources ? (
                    footer.links.resources.map((link: { label: string; href: string }, index: number) => (
                      <li key={index}>
                        <a href={link.href} className="hover:text-brand-primary transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li>
                        <a href="#" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Blog' : 'Blog'}
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-brand-primary transition-colors">
                          {language === 'tr' ? 'Dökümanlar' : 'Documentation'}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">
                  {footer?.copyright || '© 2025 sipsy.ai. All rights reserved.'}
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    {language === 'tr' ? 'Hizmet Şartları' : 'Terms of Service'}
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="hover:text-brand-primary transition-colors">
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
