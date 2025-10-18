import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Card, { CardProps } from './Card';
import Badge from './Badge';
import DynamicIcon from './DynamicIcon';

export interface ServiceCardTool {
  Name: string;
  Logo?: {
    url: string;
    alternativeText?: string;
  };
}

export interface ServiceCardProps extends Omit<CardProps, 'children'> {
  icon?: string | null;
  title: string;
  description: string;
  linkText: string;
  link?: string;
  keyTools?: ServiceCardTool[];
  toolsLabel?: string;
  getMediaURL?: (url: string) => string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      icon,
      title,
      description,
      linkText,
      link = '#',
      keyTools,
      toolsLabel = 'Key tools:',
      getMediaURL = (url) => url,
      variant = 'default',
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
        padding={padding}
        className={`group hover:scale-105 ${className}`.trim()}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-cyan-100">
            <DynamicIcon
              icon={icon}
              className="w-7 h-7 text-navy-800"
              size={28}
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-navy-900 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          {description}
        </p>

        {/* Key Tools */}
        {keyTools && keyTools.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-600 mb-2">
              {toolsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {keyTools.map((tool, index) => (
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

        {/* CTA Link */}
        <a
          href={link}
          className="inline-flex items-center font-semibold hover:underline text-navy-800 hover:text-cyan-500 transition-colors duration-200"
        >
          {linkText}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </Card>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
