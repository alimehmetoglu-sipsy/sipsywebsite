'use client';

import { Solution } from '@/lib/types';
import { getMediaURL } from '../lib/strapi';
import DynamicIcon from '@/components/DynamicIcon';
import { ArrowRight, Clock, TrendingDown, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SolutionCardProps {
  solution: Solution & { id: number };
  language: string;
}

export default function SolutionCard({ solution, language }: SolutionCardProps) {
  // Use consistent navy/cyan palette for all cards
  const serviceColor = 'brand-primary';
  const serviceBgColor = 'bg-cyan-light';
  const serviceTextColor = 'text-brand-primary';
  const serviceBorderColor = 'border-cyan-500';

  // Extract key metrics from project
  const timeSaved = solution.project?.beforeMetrics?.find(m =>
    m.label.toLowerCase().includes('saat') || m.label.toLowerCase().includes('time') || m.label.toLowerCase().includes('süre')
  );

  const costSavings = solution.project?.savings;

  // Get first result metric for display
  const firstResult = solution.project?.results?.[0];

  return (
    <div
      className={`group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:${serviceBorderColor}`}
    >
      {/* Service Badge */}
      {solution.service && (
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 ${serviceBgColor} ${serviceTextColor} text-sm font-semibold rounded-full`}>
            {solution.service.title}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={`w-16 h-16 ${serviceBgColor} rounded-lg flex items-center justify-center mb-4`}>
        <DynamicIcon
          icon={solution.icon}
          className={`w-8 h-8 ${serviceTextColor}`}
          size={32}
        />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-navy-900 mb-3 line-clamp-2">
        {solution.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {solution.shortDescription || solution.project?.projectName || ''}
      </p>

      {/* Key Metrics */}
      {(timeSaved || costSavings || firstResult) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {timeSaved && (
            <div className="flex items-center space-x-1 bg-cyan-light px-3 py-1 rounded-full text-sm">
              <Clock className="w-4 h-4 text-brand-primary" />
              <span className="text-brand-primary font-medium">
                {timeSaved.value}
              </span>
            </div>
          )}
          {costSavings && (
            <div className="flex items-center space-x-1 bg-cyan-light px-3 py-1 rounded-full text-sm">
              <DollarSign className="w-4 h-4 text-brand-primary" />
              <span className="text-brand-primary font-medium">{costSavings}</span>
            </div>
          )}
          {firstResult && !costSavings && (
            <div className="flex items-center space-x-1 bg-cyan-light px-3 py-1 rounded-full text-sm">
              <TrendingDown className="w-4 h-4 text-brand-primary" />
              <span className="text-brand-primary font-medium">
                {firstResult.value}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Key Tools */}
      {solution.keyTools && solution.keyTools.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 mb-2">
            {language === 'tr' ? 'Anahtar araçlar:' : 'Key tools:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {solution.keyTools.map((tool, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-2 px-3 py-1 ${serviceBgColor} rounded-full text-sm`}
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
                <span className="text-gray-900 font-medium">{tool.Name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/solutions/${solution.slug}`}
        className={`inline-flex items-center ${serviceTextColor} font-semibold hover:underline group-hover:translate-x-1 transition-transform`}
      >
        {language === 'tr' ? 'Detayları Gör' : 'View Details'}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  );
}
