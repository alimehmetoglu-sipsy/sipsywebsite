'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Bot,
  CheckCircle,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  ChevronDown,
  ChevronUp,
  Shield,
  Award,
  MessageCircle,
} from 'lucide-react';
import { submitContactForm } from '@/lib/strapi';
import { ContactFormData } from '@/lib/types';

interface FormData extends ContactFormData {
  privacyAgreement: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    privacyAgreement: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'fullName':
        return !value ? 'Ad Soyad zorunludur' : '';
      case 'email':
        if (!value) return 'Email zorunludur';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value as string) ? 'Geçersiz email adresi' : '';
      case 'privacyAgreement':
        return !value ? 'Devam etmek için kabul etmelisiniz' : '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate on change if field has been touched
    if (touchedFields.has(name)) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => new Set(prev).add(name));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = new Set(Object.keys(formData));
    setTouchedFields(allFields);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Strapi API
      await submitContactForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      console.log('Form submitted successfully');
      setSubmitSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: '',
          privacyAgreement: false,
        });
        setSubmitSuccess(false);
        setTouchedFields(new Set());
        setErrors({});
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      // You can add error handling here (e.g., show error message to user)
      alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'Is the consultation really free?',
      answer:
        'Yes, completely free with no obligation. We believe in demonstrating value upfront and helping you understand your automation opportunities before any commitment.',
    },
    {
      question: 'How long is the consultation?',
      answer:
        '30 minutes, but we can extend if needed. We respect your time and focus on providing maximum value in our discussion.',
    },
    {
      question: 'Do I need to prepare anything?',
      answer:
        'No preparation required, but having examples of processes you\'d like to automate helps us give more specific insights and recommendations.',
    },
    {
      question: 'Will you try to sell me something?',
      answer:
        'We\'ll provide honest assessment and recommendations. If automation isn\'t right for you right now, we\'ll tell you. Our goal is long-term relationships, not quick sales.',
    },
    {
      question: 'What if I\'m not ready to start a project?',
      answer:
        'That\'s fine! Many of our best clients started with education and moved forward months later when the timing was right for their organization.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-navy-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <Bot className="w-10 h-10 text-brand-secondary" />
              <span className="text-2xl font-bold">sipsy.ai</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#solutions" className="hover:text-brand-accent transition">
                Solutions
              </Link>
              <Link href="/#services" className="hover:text-brand-accent transition">
                Services
              </Link>
              <Link href="/case-studies" className="hover:text-brand-accent transition">
                Case Studies
              </Link>
              <Link href="/#about" className="hover:text-brand-accent transition">
                About
              </Link>
              <Link
                href="/contact"
                className="bg-brand-secondary hover:bg-gold-500 text-navy-900 px-6 py-2 rounded-lg font-semibold transition shadow-md"
              >
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <Link href="/#solutions" className="block py-2 hover:text-brand-accent transition">
                Solutions
              </Link>
              <Link href="/#services" className="block py-2 hover:text-brand-accent transition">
                Services
              </Link>
              <Link href="/case-studies" className="block py-2 hover:text-brand-accent transition">
                Case Studies
              </Link>
              <Link href="/#about" className="block py-2 hover:text-brand-accent transition">
                About
              </Link>
              <Link
                href="/contact"
                className="block bg-brand-secondary hover:bg-gold-500 text-navy-900 px-6 py-2 rounded-lg font-semibold transition text-center shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Let&apos;s Discuss Your Automation Opportunities
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Schedule a free 30-minute consultation with our automation experts
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-gold-400" />
                <span className="text-sm md:text-base">100% Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-gold-400" />
                <span className="text-sm md:text-base">No Commitment Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-gold-400" />
                <span className="text-sm md:text-base">Response Within 4 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN - Booking Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                <h2 className="text-3xl font-bold text-navy-900 mb-2">
                  Schedule Your Free Consultation
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 4 business hours
                </p>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-gold-50 border border-gold-200 rounded-lg flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-gold-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gold-900">Başarılı!</p>
                      <p className="text-gold-800 text-sm">
                        Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız!
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">
                      İletişim Bilgileri
                    </h3>

                    <div className="mb-4">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Ad Soyad <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Adınız ve Soyadınız"
                        className={`w-full px-4 py-3 border rounded-lg text-navy-900 focus:outline-none focus:ring-2 transition ${
                          errors.fullName && touchedFields.has('fullName')
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-brand-secondary'
                        }`}
                      />
                      {errors.fullName && touchedFields.has('fullName') && (
                        <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ornek@sirket.com"
                        className={`w-full px-4 py-3 border rounded-lg text-navy-900 focus:outline-none focus:ring-2 transition ${
                          errors.email && touchedFields.has('email')
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-brand-secondary'
                        }`}
                      />
                      {errors.email && touchedFields.has('email') && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon <span className="text-gray-500 text-xs">(opsiyonel)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+90 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mesajınız <span className="text-gray-500 text-xs">(opsiyonel)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Bize iletmek istediğiniz mesajınızı yazabilirsiniz..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Privacy Agreement */}
                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacyAgreement"
                        checked={formData.privacyAgreement}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`mt-1 w-4 h-4 text-brand-secondary focus:ring-brand-secondary rounded ${
                          errors.privacyAgreement && touchedFields.has('privacyAgreement')
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      <span className="text-sm text-gray-700">
                        <Link href="/privacy" className="text-brand-secondary hover:underline">
                          Gizlilik Politikası
                        </Link>
                        &apos;nı ve{' '}
                        <Link href="/terms" className="text-brand-secondary hover:underline">
                          Kullanım Koşulları
                        </Link>
                        &apos;nı kabul ediyorum
                        <span className="text-red-500"> *</span>
                      </span>
                    </label>
                    {errors.privacyAgreement && touchedFields.has('privacyAgreement') && (
                      <p className="mt-1 text-sm text-red-500 ml-7">{errors.privacyAgreement}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2 ml-7">
                      Gizliliğinize saygı duyuyoruz. Bilgileriniz asla paylaşılmayacaktır.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition transform shadow-md ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-brand-secondary hover:bg-gold-500 hover:scale-105 text-navy-900'
                    }`}
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Formu Gönder'}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                      Ya da bizi doğrudan arayın:{' '}
                      <a href="tel:+905551234567" className="text-brand-secondary font-semibold hover:underline">
                        +90 (555) 123-4567
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN - Information */}
            <div className="lg:col-span-5 space-y-8">
              {/* What to Expect */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">What Happens Next?</h2>
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-secondary text-white rounded-full flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">We&apos;ll Review Your Submission</h3>
                      <p className="text-gray-600 text-sm">
                        Our team reviews your information within 4 hours during business hours
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-secondary text-white rounded-full flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">Confirmation & Preparation</h3>
                      <p className="text-gray-600 text-sm">
                        You&apos;ll receive calendar invite and brief questionnaire to maximize our time together
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-secondary text-white rounded-full flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">Expert Consultation</h3>
                      <p className="text-gray-600 text-sm">
                        30-minute video call with senior consultant to discuss your needs and opportunities
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center text-xl font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">Custom Proposal</h3>
                      <p className="text-gray-600 text-sm">
                        If it&apos;s a fit, we&apos;ll send detailed proposal within 2 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Topics */}
              <div className="bg-gradient-to-br from-brand-secondary to-blue-600 rounded-xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">We&apos;ll Cover:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Your current processes and pain points</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Automation opportunities and quick wins</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Estimated ROI and timeline</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Technology recommendations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Implementation approach</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Pricing and next steps</span>
                  </li>
                </ul>
              </div>

              {/* Meet Your Consultant */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Meet Your Consultant</h2>
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-secondary to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                    AR
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">Alex Rodriguez</h3>
                  <p className="text-brand-secondary font-semibold mb-2">Lead Automation Consultant</p>
                  <p className="text-sm text-gray-600 mb-3">10+ years experience, UiPath Certified</p>
                  <p className="text-gray-700 text-sm">
                    Alex specializes in enterprise automation and has helped over 50 companies achieve
                    significant cost savings through intelligent process automation.
                  </p>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4 pt-4 border-t">
                  You&apos;ll meet with one of our senior consultants based on your industry and needs
                </p>
              </div>

              {/* Testimonials */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white font-bold">
                        SC
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2">
                        &quot;The consultation was incredibly valuable. They identified $400K in potential
                        savings in just 30 minutes.&quot;
                      </p>
                      <p className="font-semibold text-navy-900">Sarah Chen</p>
                      <p className="text-sm text-gray-600">CFO, TechCorp</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center text-white font-bold">
                        MT
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2">
                        &quot;No pressure, just genuine expertise. They helped us understand our options
                        clearly.&quot;
                      </p>
                      <p className="font-semibold text-navy-900">Michael Torres</p>
                      <p className="text-sm text-gray-600">COO, RetailCo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-navy-900 pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges & Alternative Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Trust Badges */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-navy-900 mb-8">Trusted & Certified</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <Shield className="w-16 h-16 text-brand-secondary mb-2" />
                <p className="font-semibold text-navy-900">SOC 2 Certified</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-16 h-16 text-brand-accent mb-2" />
                <p className="font-semibold text-navy-900">ISO 27001</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-brand-secondary mb-2" />
                <p className="font-semibold text-navy-900">100% Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Alternative Contact Options */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 text-center mb-8">
              Prefer Another Method?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="mailto:hello@sipsy.ai"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center"
              >
                <Mail className="w-12 h-12 text-brand-secondary mx-auto mb-3" />
                <h3 className="font-semibold text-navy-900 mb-1">Email</h3>
                <p className="text-brand-secondary hover:underline">hello@sipsy.ai</p>
              </a>

              <a
                href="tel:+15551234567"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center"
              >
                <Phone className="w-12 h-12 text-brand-accent mx-auto mb-3" />
                <h3 className="font-semibold text-navy-900 mb-1">Phone</h3>
                <p className="text-brand-secondary hover:underline">+1 (555) 123-4567</p>
              </a>

              <a
                href="https://linkedin.com/company/sipsy-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center"
              >
                <Linkedin className="w-12 h-12 text-brand-secondary mx-auto mb-3" />
                <h3 className="font-semibold text-navy-900 mb-1">LinkedIn</h3>
                <p className="text-brand-secondary hover:underline">/company/sipsy-ai</p>
              </a>
            </div>
          </div>

          {/* Office Locations */}
          <div className="max-w-2xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-navy-900 text-center mb-6">Our Offices</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <MapPin className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
                  <p className="font-semibold text-navy-900">San Francisco, CA</p>
                  <p className="text-sm text-gray-600">USA Headquarters</p>
                </div>
                <div>
                  <MapPin className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
                  <p className="font-semibold text-navy-900">New York, NY</p>
                  <p className="text-sm text-gray-600">East Coast Office</p>
                </div>
                <div>
                  <MapPin className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
                  <p className="font-semibold text-navy-900">London, UK</p>
                  <p className="text-sm text-gray-600">Europe Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Still have questions? We&apos;re here to help.</h2>
          <button
            onClick={() => {
              // TODO: Integrate with chat widget
              console.log('Open chat widget');
            }}
            className="inline-flex items-center space-x-2 bg-brand-secondary hover:bg-gold-500 text-navy-900 px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat with us now</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="w-8 h-8 text-brand-accent" />
                <span className="text-xl font-bold">sipsy.ai</span>
              </div>
              <p className="text-gray-400 text-sm">
                Intelligent automation solutions for modern enterprises.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#solutions" className="text-gray-400 hover:text-brand-accent transition">
                    RPA & Hyperautomation
                  </Link>
                </li>
                <li>
                  <Link href="/#solutions" className="text-gray-400 hover:text-brand-accent transition">
                    AI/ML Integration
                  </Link>
                </li>
                <li>
                  <Link href="/#solutions" className="text-gray-400 hover:text-brand-accent transition">
                    System Integration
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#about" className="text-gray-400 hover:text-brand-accent transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-gray-400 hover:text-brand-accent transition">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-brand-accent transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-brand-accent transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-brand-accent transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 sipsy.ai. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
