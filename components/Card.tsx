import React, { HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'ghost';
export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  href?: string;
  children: ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      interactive = false,
      href,
      children,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    // Base styles - common to all cards
    const baseStyles = 'rounded-xl transition-all duration-300';

    // Variant styles
    const variantStyles: Record<CardVariant, string> = {
      default: 'bg-gradient-card shadow-card border-2 border-transparent hover:shadow-card-hover hover:-translate-y-1 hover:border-cyan-500',
      elevated: 'bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2',
      bordered: 'bg-white border-2 border-gray-200 hover:border-cyan-500 hover:shadow-lg',
      ghost: 'bg-transparent hover:bg-gradient-card',
    };

    // Padding styles
    const paddingStyles: Record<CardPadding, string> = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    // Interactive styles (clickable/link cards)
    const interactiveStyles = (interactive || href)
      ? 'cursor-pointer group'
      : '';

    // Focus styles for keyboard navigation
    const focusStyles = (interactive || href)
      ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2'
      : '';

    // Combine all styles
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${interactiveStyles} ${focusStyles} ${className}`.trim();

    // If href is provided, render as a Link
    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
        >
          {children}
        </Link>
      );
    }

    // If interactive but no href, render as a clickable div
    if (interactive) {
      return (
        <div
          ref={ref}
          className={combinedClassName}
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && onClick) {
              e.preventDefault();
              onClick(e as any);
            }
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Default: render as a regular div
    return (
      <div
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
