import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import Card, { CardProps } from './Card';

export interface TestimonialCardProps extends Omit<CardProps, 'children'> {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  companyLogo?: string;
  rating?: number;
  getMediaURL?: (url: string) => string;
}

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    {
      quote,
      author,
      role,
      company,
      avatar,
      companyLogo,
      rating = 5,
      getMediaURL = (url) => url,
      variant = 'elevated',
      padding = 'lg',
      className = '',
      ...props
    },
    ref
  ) => {
    // Render star rating
    const renderStars = () => {
      return (
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      );
    };

    return (
      <Card
        ref={ref}
        variant={variant}
        padding={padding}
        className={`relative ${className}`.trim()}
        {...props}
      >
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <Quote className="w-16 h-16 text-cyan-500" />
        </div>

        {/* Rating */}
        {rating && renderStars()}

        {/* Quote */}
        <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {avatar && (
            <div className="flex-shrink-0">
              <Image
                src={getMediaURL(avatar)}
                alt={author}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-200"
              />
            </div>
          )}

          {/* Name and Company */}
          <div className="flex-grow">
            <div className="font-bold text-navy-900 text-base">
              {author}
            </div>
            {role && (
              <div className="text-sm text-gray-600">
                {role}
              </div>
            )}
            {company && (
              <div className="text-sm text-gray-600 font-medium">
                {company}
              </div>
            )}
          </div>

          {/* Company Logo */}
          {companyLogo && (
            <div className="flex-shrink-0">
              <Image
                src={getMediaURL(companyLogo)}
                alt={company || 'Company'}
                width={80}
                height={40}
                className="h-10 w-auto object-contain opacity-70"
              />
            </div>
          )}
        </div>
      </Card>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
