import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconPosition = 'left' | 'right';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  children: ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Base styles - common to all buttons
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

    // Variant styles
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-navy-800 hover:bg-navy-dark text-white shadow-button hover:shadow-button-hover hover:scale-105 active:scale-100',
      secondary: 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-button hover:shadow-button-hover hover:scale-105 active:scale-100',
      outline: 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white active:bg-cyan-600',
      ghost: 'text-navy-800 hover:text-cyan-500 hover:bg-cyan-50 active:bg-cyan-100',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-button hover:shadow-button-hover hover:scale-105 active:scale-100',
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-3',
      xl: 'px-10 py-5 text-xl gap-3',
    };

    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';

    // Combine all styles - only add variant styles if variant is provided
    const combinedClassName = `${baseStyles} ${variant ? variantStyles[variant] : ''} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

    // Render loading spinner
    const renderLoadingSpinner = () => (
      <svg
        className="loading-spinner"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Render icon or loading spinner
    const renderLeftContent = () => {
      if (loading) return renderLoadingSpinner();
      if (icon && iconPosition === 'left') return <span className="inline-flex">{icon}</span>;
      return null;
    };

    const renderRightContent = () => {
      if (!loading && icon && iconPosition === 'right') return <span className="inline-flex">{icon}</span>;
      return null;
    };

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {renderLeftContent()}
        <span>{children}</span>
        {renderRightContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
