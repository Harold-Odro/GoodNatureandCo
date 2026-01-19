import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { useAnimation } from '../../hooks/useAnimation';

export function BrandCard({
  title,
  tagline,
  description,
  services,
  image,
  linkTo,
  buttonText,
  comingSoon = false,
  delay = ''
}) {
  const [ref, , className] = useAnimation('fade-up', 0.1, delay);

  return (
    <div
      ref={ref}
      className={`group bg-linen-100 rounded-2xl overflow-hidden shadow-lg card-hover border border-linen-300 ${className}`}
    >
      <Link to={comingSoon ? '#' : linkTo} className={comingSoon ? 'pointer-events-none' : ''}>
        <div className="relative h-64 md:h-80 image-zoom-container overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover image-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent"></div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-sage-400/0 group-hover:bg-sage-400/20 transition-colors duration-500"></div>
        </div>
      </Link>

      <div className="p-8">
        <h2 className="text-2xl md:text-3xl font-display text-charcoal-800 mb-2 group-hover:text-sage-600 transition-colors duration-300">
          {title}
        </h2>
        <p className="font-display italic text-sage-500 text-lg mb-4">
          {tagline}
        </p>
        <p className="text-charcoal-600 mb-4 leading-relaxed">
          {description}
        </p>

        {services && (
          <p className="text-sm text-charcoal-500 mb-6">
            {services}
          </p>
        )}

        <Button
          href={linkTo}
          variant={comingSoon ? 'outline' : 'primary'}
          className="w-full md:w-auto"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
