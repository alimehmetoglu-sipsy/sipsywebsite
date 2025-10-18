'use client';

import { Solution } from '@/lib/types';
import { getMediaURL } from '../lib/strapi';
import DynamicIcon from '@/components/DynamicIcon';
import { ArrowRight, Clock, TrendingDown, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Card from './Card';
import Badge from './Badge';

interface SolutionCardProps {
  solution: Solution & { id: number };
  language: string;
}

export default function SolutionCard({ solution, language }: SolutionCardProps) {
  // Extract key metrics from project
  const timeSaved = solution.project?.beforeMetrics?.find(m =>
    m.label.toLowerCase().includes('saat') || m.label.toLowerCase().includes('time') || m.label.toLowerCase().includes('süre')
  );

  const costSavings = solution.project?.savings;

  // Get first result metric for display
  const firstResult = solution.project?.results?.[0];

  return (
    <Card
      variant="default"
      padding="md"
      className="group hover:scale-105"
    >
      {/* Service Badge */}
      {solution.service && (
        <div className="mb-4">
          <Badge variant="secondary" size="sm">
            {solution.service.title}
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div className="w-16 h-16 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
        <DynamicIcon
          icon={solution.icon}
          className="w-8 h-8 text-navy-800"
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
            <Badge
              variant="secondary"
              size="sm"
              icon={<Clock className="w-4 h-4" />}
            >
              {timeSaved.value}
            </Badge>
          )}
          {costSavings && (
            <Badge
              variant="secondary"
              size="sm"
              icon={<DollarSign className="w-4 h-4" />}
            >
              {costSavings}
            </Badge>
          )}
          {firstResult && !costSavings && (
            <Badge
              variant="secondary"
              size="sm"
              icon={<TrendingDown className="w-4 h-4" />}
            >
              {firstResult.value}
            </Badge>
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
              <Badge
                key={index}
                variant="secondary"
                size="sm"
                icon={
                  tool.Logo ? (
                    <Image
                      src={getMediaURL(tool.Logo.url)}
                      alt={tool.Logo.alternativeText || tool.Name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                  ) : undefined
                }
              >
                {tool.Name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/solutions/${solution.slug}`}
        className="inline-flex items-center text-navy-800 font-semibold hover:underline hover:text-cyan-500 transition-colors duration-200"
      >
        {language === 'tr' ? 'Detayları Gör' : 'View Details'}
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </Card>
  );
}
