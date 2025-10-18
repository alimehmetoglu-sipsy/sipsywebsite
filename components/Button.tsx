import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconPosition = 'left' | 'right';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  children: ReactNode;
};

export type ButtonProps = BaseButtonProps &
  (
    | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      as: Component = 'button',
      variant,
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Base styles - common to all buttons
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group';

    // Variant styles with enhanced animations
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-gradient-to-r from-navy-800 to-navy-900 hover:from-navy-900 hover:to-navy-800 text-white shadow-button hover:shadow-2xl hover:shadow-navy-800/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
      secondary:
        'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-500 text-white shadow-button hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
      outline:
        'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/30 active:bg-cyan-600 hover:scale-105 active:scale-95 transition-all duration-300',
      ghost:
        'text-navy-800 hover:text-cyan-500 hover:bg-cyan-50 active:bg-cyan-100 hover:scale-105 active:scale-95',
      danger:
        'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-600 text-white shadow-button hover:shadow-2xl hover:shadow-red-600/40 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
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
        className="loading-spinner relative z-10 animate-spin"
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
      if (icon && iconPosition === 'left')
        return <span className="inline-flex relative z-10">{icon}</span>;
      return null;
    };

    const renderRightContent = () => {
      if (!loading && icon && iconPosition === 'right')
        return <span className="inline-flex relative z-10">{icon}</span>;
      return null;
    };

    const content = (
      <>
        {renderLeftContent()}
        <span className="relative z-10">{children}</span>
        {renderRightContent()}
      </>
    );

    if (Component === 'a') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClassName}
          aria-busy={loading}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={(props as ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'}
        className={combinedClassName}
        disabled={isDisabled}
        aria-busy={loading}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
