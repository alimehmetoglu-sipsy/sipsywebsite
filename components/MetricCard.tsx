import React, { ReactNode } from 'react';
import Card, { CardProps } from './Card';

export interface MetricCardProps extends Omit<CardProps, 'children'> {
  icon?: ReactNode;
  value: string | number;
  label: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  colorScheme?: 'default' | 'gradient' | 'success' | 'warning';
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      icon,
      value,
      label,
      description,
      trend,
      trendValue,
      colorScheme = 'default',
      variant = 'default',
      padding = 'lg',
      className = '',
      ...props
    },
    ref
  ) => {
    // Color scheme styles
    const colorSchemeStyles: Record<string, string> = {
      default: '',
      gradient: 'bg-gradient-metric text-white',
      success: 'bg-green-50 border-2 border-green-200',
      warning: 'bg-amber-50 border-2 border-amber-200',
    };

    // Trend icon and color
    const renderTrend = () => {
      if (!trend || !trendValue) return null;

      const trendColors = {
        up: 'text-green-600',
        down: 'text-red-600',
        neutral: 'text-gray-600',
      };

      const TrendIcon = () => {
        if (trend === 'up') {
          return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          );
        }
        if (trend === 'down') {
          return (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          );
        }
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
      };

      return (
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColors[trend]}`}>
          <TrendIcon />
          <span>{trendValue}</span>
        </div>
      );
    };

    // Text color based on color scheme
    const textColorClass = colorScheme === 'gradient' ? 'text-white' : 'text-gray-600';
    const labelColorClass = colorScheme === 'gradient' ? 'text-white' : 'text-navy-900';

    return (
      <Card
        ref={ref}
        variant={variant}
        padding={padding}
        className={`text-center ${colorSchemeStyles[colorScheme]} ${className}`.trim()}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${
            colorScheme === 'gradient' ? 'bg-white/20' : 'bg-cyan-100 text-cyan-600'
          }`}>
            {icon}
          </div>
        )}

        {/* Value */}
        <div className={`text-4xl font-bold mb-2 ${labelColorClass}`}>
          {value}
        </div>

        {/* Label */}
        <div className={`text-lg font-semibold mb-1 ${labelColorClass}`}>
          {label}
        </div>

        {/* Description */}
        {description && (
          <p className={`text-sm ${textColorClass} mb-2`}>
            {description}
          </p>
        )}

        {/* Trend */}
        {renderTrend()}
      </Card>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export default MetricCard;
