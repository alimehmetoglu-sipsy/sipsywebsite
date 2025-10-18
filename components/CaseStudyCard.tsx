import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Card, { CardProps } from './Card';
import Badge from './Badge';
import Button from './Button';

export interface CaseStudyCardProps extends Omit<CardProps, 'children'> {
  title: string;
  client?: string;
  industry?: string;
  image?: string;
  imageAlt?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  quote?: string;
  quoteAuthor?: string;
  link?: string;
  linkText?: string;
  getMediaURL?: (url: string) => string;
}

const CaseStudyCard = React.forwardRef<HTMLDivElement, CaseStudyCardProps>(
  (
    {
      title,
      client,
      industry,
      image,
      imageAlt = 'Case study',
      challenge,
      solution,
      results,
      quote,
      quoteAuthor,
      link,
      linkText = 'Read case study',
      getMediaURL = (url) => url,
      variant = 'elevated',
      padding = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        padding="sm"
        className={`overflow-hidden ${className}`.trim()}
        {...props}
      >
        {/* Image */}
        {image && (
          <div className="relative w-full h-48 mb-4 -mx-4 -mt-4 rounded-t-xl overflow-hidden">
            <Image
              src={getMediaURL(image)}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex gap-2">
              {client && (
                <Badge variant="primary" size="sm">
                  {client}
                </Badge>
              )}
              {industry && (
                <Badge variant="accent" size="sm">
                  {industry}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className={padding === 'md' ? 'p-6' : padding === 'lg' ? 'p-8' : 'p-4'}>
          {/* Title */}
          <h3 className="text-2xl font-bold text-navy-900 mb-4">
            {title}
          </h3>

          {/* Challenge */}
          {challenge && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Challenge
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {challenge}
              </p>
            </div>
          )}

          {/* Solution */}
          {solution && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Solution
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {solution}
              </p>
            </div>
          )}

          {/* Results */}
          {results && results.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Results
              </h4>
              <ul className="space-y-2">
                {results.map((result, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-cyan-500 font-bold mt-1">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quote */}
          {quote && (
            <div className="bg-gradient-card p-4 rounded-lg border-l-4 border-cyan-500 mb-4">
              <p className="text-gray-700 italic mb-2">
                &ldquo;{quote}&rdquo;
              </p>
              {quoteAuthor && (
                <p className="text-sm text-gray-600 font-semibold">
                  — {quoteAuthor}
                </p>
              )}
            </div>
          )}

          {/* CTA */}
          {link && (
            <div className="mt-6">
              <a
                href={link}
                className="inline-flex items-center font-semibold text-navy-800 hover:text-cyan-500 transition-colors duration-200 group"
              >
                {linkText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

CaseStudyCard.displayName = 'CaseStudyCard';

export default CaseStudyCard;
