'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import DynamicIcon from '@/components/DynamicIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSolutionBySlug, getCtaSection, getFooter } from '@/lib/strapi';
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
        <div className="min-h-screen flex justify-center items-center bg-gray-50 pt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-accent"></div>
        </div>
      </>
    );
  }

  if (!solution) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 pt-20">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            {language === 'tr' ? 'Çözüm Bulunamadı' : 'Solution Not Found'}
          </h1>
          <Link href="/solutions" className="text-brand-accent hover:underline">
            {language === 'tr' ? '← Tüm Çözümler' : '← All Solutions'}
          </Link>
        </div>
      </>
    );
  }

  const serviceColor = solution.service?.color === 'accent' ? 'brand-accent' : 'brand-secondary';
  const serviceBgColor = solution.service?.color === 'accent' ? 'bg-brand-accent' : 'bg-brand-secondary';
  const serviceTextColor = solution.service?.color === 'accent' ? 'text-brand-accent' : 'text-brand-secondary';
  const serviceBorderColor = solution.service?.color === 'accent' ? 'border-brand-accent' : 'border-brand-secondary';

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
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
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
          <section className="section-padding bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
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
                      className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1"
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
                    className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
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
          <section className="section-padding bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
                      className={`relative flex items-start space-x-4 bg-white rounded-xl p-6 shadow-lg border-l-4 ${serviceBorderColor} hover:shadow-2xl transition-all duration-300 group`}
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
        {solution.tools && solution.tools.length > 0 && (
          <section className="section-padding bg-white">
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
                {solution.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-accent group w-64"
                  >
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{tool.name}</h3>
                    {tool.description && (
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    )}
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
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
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
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
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
          <section className="section-padding bg-white">
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
                        <p className="text-4xl font-bold text-brand-accent mb-2">
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

        {/* Final CTA Section - Multi-Option */}
        <section id="final-cta" className="section-padding bg-gradient-to-br from-green-600 via-green-500 to-blue-600">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold text-white mb-6">
                {solution.finalCTA?.title || (language === 'tr'
                  ? 'Benzer Sonuçları Sizin İçin de Gerçekleştirelim'
                  : 'Let\'s Achieve Similar Results for You')}
              </h2>
              <p className="text-2xl text-white/90 mb-12">
                {solution.finalCTA?.description || (language === 'tr'
                  ? 'Ücretsiz demo ve danışmanlık için hemen iletişime geçin'
                  : 'Contact us now for a free demo and consultation')}
              </p>

              {/* Multi-CTA Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {solution.finalCTA?.options && solution.finalCTA.options.length > 0 ? (
                  solution.finalCTA.options.map((option, index) => {
                    const IconComponent = option.icon === 'Calendar' ? Calendar : option.icon === 'MessageCircle' ? MessageCircle : Mail;
                    return (
                      <button
                        key={index}
                        onClick={scrollToCTA}
                        className="bg-white text-brand-accent hover:bg-gray-100 font-bold px-6 py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl group"
                      >
                        <IconComponent className="w-8 h-8 mx-auto mb-3 text-brand-accent group-hover:scale-110 transition-transform" />
                        <div className="text-lg font-bold mb-1">{option.title}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </button>
                    );
                  })
                ) : (
                  <>
                    <button
                      onClick={scrollToCTA}
                      className="bg-white text-brand-accent hover:bg-gray-100 font-bold px-6 py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl group"
                    >
                      <Calendar className="w-8 h-8 mx-auto mb-3 text-brand-accent group-hover:scale-110 transition-transform" />
                      <div className="text-lg font-bold mb-1">
                        {language === 'tr' ? 'Demo Rezervasyonu' : 'Book a Demo'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === 'tr' ? '30 dakikalık ücretsiz demo' : '30-min free demo'}
                      </div>
                    </button>

                    <button
                      onClick={scrollToCTA}
                      className="bg-white text-brand-accent hover:bg-gray-100 font-bold px-6 py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl group"
                    >
                      <MessageCircle className="w-8 h-8 mx-auto mb-3 text-brand-accent group-hover:scale-110 transition-transform" />
                      <div className="text-lg font-bold mb-1">
                        {language === 'tr' ? 'Uzmanla Görüş' : 'Talk to Expert'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === 'tr' ? 'Özel çözüm danışmanlığı' : 'Custom solution consulting'}
                      </div>
                    </button>

                    <button
                      onClick={scrollToCTA}
                      className="bg-white text-brand-accent hover:bg-gray-100 font-bold px-6 py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl group"
                    >
                      <Mail className="w-8 h-8 mx-auto mb-3 text-brand-accent group-hover:scale-110 transition-transform" />
                      <div className="text-lg font-bold mb-1">
                        {language === 'tr' ? 'Teklif Al' : 'Get a Quote'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === 'tr' ? 'Ücretsiz ROI analizi' : 'Free ROI analysis'}
                      </div>
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`tel:${solution.finalCTA?.contactPhone || '+905551234567'}`}
                  className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">{solution.finalCTA?.contactPhone || '+90 555 123 45 67'}</span>
                </a>
                <span className="text-white/60 hidden sm:block">•</span>
                <a
                  href={`mailto:${solution.finalCTA?.contactEmail || 'info@sipsy.ai'}`}
                  className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">{solution.finalCTA?.contactEmail || 'info@sipsy.ai'}</span>
                </a>
              </div>

              <p className="text-white/80 mt-6 text-sm">
                {solution.finalCTA?.guarantees || (language === 'tr'
                  ? '✓ Taahhüt gerektirmez  •  ✓ %100 gizlilik  •  ✓ Hızlı yanıt garantisi'
                  : '✓ No commitment  •  ✓ 100% confidential  •  ✓ Fast response guarantee')}
              </p>
            </div>
          </div>
        </section>

        {/* Other Solutions Teaser */}
        <section className="section-padding bg-gray-50">
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
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">sipsy.ai</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {footer?.companyDescription ||
                    (language === 'tr'
                      ? 'Ölçülebilir ROI sağlayan kurumsal AI ve otomasyon çözümleri'
                      : 'Enterprise AI and automation solutions that deliver measurable ROI')}
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-brand-accent rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-brand-accent rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-brand-accent rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Hizmetler' : 'Services'}
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/solutions" className="hover:text-brand-accent transition-colors">
                      {language === 'tr' ? 'Çözümler' : 'Solutions'}
                    </Link>
                  </li>
                  <li>
                    <a href="/#services" className="hover:text-brand-accent transition-colors">
                      {language === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Şirket' : 'Company'}
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/#about" className="hover:text-brand-accent transition-colors">
                      {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                    </a>
                  </li>
                  <li>
                    <a href="/#contact" className="hover:text-brand-accent transition-colors">
                      {language === 'tr' ? 'İletişim' : 'Contact'}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  {language === 'tr' ? 'Kaynaklar' : 'Resources'}
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      {language === 'tr' ? 'Blog' : 'Blog'}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-accent transition-colors">
                      {language === 'tr' ? 'Dökümanlar' : 'Documentation'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

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
