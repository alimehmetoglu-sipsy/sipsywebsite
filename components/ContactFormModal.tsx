'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { submitContactForm } from '@/lib/strapi';
import Link from 'next/link';
import Button from './Button';

interface ContactFormContent {
  title: string;
  description?: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButtonText: string;
  privacyPolicyText?: string;
  privacyPolicyUrl?: string;
  termsText?: string;
  termsUrl?: string;
  privacyAgreementText?: string;
  successMessage: string;
}

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContactFormContent;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  privacyAgreement: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactFormModal({ isOpen, onClose, content }: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    privacyAgreement: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        privacyAgreement: false,
      });
      setErrors({});
      setTouchedFields(new Set());
      setSubmitSuccess(false);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'fullName':
        return !value ? 'Bu alan zorunludur' : '';
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touchedFields.has(name)) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const allFields = new Set(Object.keys(formData));
    setTouchedFields(allFields);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setSubmitSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">
              {content.title}
            </h2>
            {content.description && (
              <p className="text-gray-600 mb-6">
                {content.description}
              </p>
            )}

            {submitSuccess && (
              <div className="mb-6 p-4 bg-cyan-light border border-cyan-500 rounded-lg flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-navy-900">Başarılı!</p>
                  <p className="text-neutral-dark text-sm">
                    {content.successMessage}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.fullNameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={content.fullNamePlaceholder}
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

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={content.emailPlaceholder}
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

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={content.phonePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {content.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={content.messagePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition resize-none"
                />
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
                    <Link href={content.privacyPolicyUrl || '/privacy'} className="text-brand-secondary hover:underline" target="_blank">
                      {content.privacyPolicyText || 'Gizlilik Politikası'}
                    </Link>
                    {content.privacyAgreementText?.split('...')[0] || "'nı ve "}
                    <Link href={content.termsUrl || '/terms'} className="text-brand-secondary hover:underline" target="_blank">
                      {content.termsText || 'Kullanım Koşulları'}
                    </Link>
                    {content.privacyAgreementText?.split('...')[1] || "'nı kabul ediyorum"}
                    <span className="text-red-500"> *</span>
                  </span>
                </label>
                {errors.privacyAgreement && touchedFields.has('privacyAgreement') && (
                  <p className="mt-1 text-sm text-red-500 ml-7">{errors.privacyAgreement}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                fullWidth
                loading={isSubmitting}
              >
                {content.submitButtonText}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
