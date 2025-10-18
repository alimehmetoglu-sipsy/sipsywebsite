import React, { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
  className?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      icon,
      removable = false,
      onRemove,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles - common to all badges
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200';

    // Variant styles
    const variantStyles: Record<BadgeVariant, string> = {
      primary: 'bg-navy-800 text-white',
      secondary: 'bg-cyan-100 text-cyan-600 border border-cyan-300',
      accent: 'bg-cyan-500 text-white',
      neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
      success: 'bg-green-100 text-green-700 border border-green-300',
      warning: 'bg-amber-100 text-amber-700 border border-amber-300',
      error: 'bg-red-100 text-red-700 border border-red-300',
      outline: 'bg-transparent border border-current',
    };

    // Size styles
    const sizeStyles: Record<BadgeSize, string> = {
      sm: 'text-xs px-2 py-1 gap-1',
      md: 'text-sm px-3 py-1.5 gap-1.5',
      lg: 'text-base px-4 py-2 gap-2',
    };

    // Icon size based on badge size
    const iconSizeStyles: Record<BadgeSize, string> = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    // Combine all styles
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    // Render close button for removable badges
    const renderCloseButton = () => {
      if (!removable || !onRemove) return null;

      return (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 inline-flex items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current transition-colors"
          aria-label="Remove"
        >
          <svg
            className={iconSizeStyles[size]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      );
    };

    return (
      <span
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {icon && <span className={`inline-flex ${iconSizeStyles[size]}`}>{icon}</span>}
        <span>{children}</span>
        {renderCloseButton()}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
