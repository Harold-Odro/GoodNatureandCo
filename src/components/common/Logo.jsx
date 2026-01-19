import { Link } from 'react-router-dom';

export function Logo({ variant = 'full', size = 'md', linkTo = null, className = '' }) {
  // Size classes for the logo image
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
    xl: 'h-28'
  };

  // Use main logo for full variant, alt logo for icon variant
  const logoSrc = variant === 'full' ? '/images/logo-main.jpg' : '/images/logo-alt.jpg';

  const content = (
    <div className={`${sizeClasses[size]}`}>
      <img
        src={logoSrc}
        alt="Good Nature"
        className={`h-full w-auto object-contain ${className}`}
      />
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
