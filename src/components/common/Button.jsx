import { Link } from 'react-router-dom';

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  loading = false,
  disabled = false,
  children,
  className = '',
  type = 'button'
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 btn-hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variantClasses = {
    primary: 'bg-sage-400 text-charcoal-800 hover:bg-sage-500 shadow-md hover:shadow-lg',
    secondary: 'bg-linen-200 text-charcoal-800 hover:bg-linen-300 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-sage-400 text-sage-600 hover:bg-sage-50'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}
