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
      className={`group bg-ivory-50 rounded-3xl overflow-hidden shadow-xl active:scale-[0.98] transition-transform duration-200 ${className}`}
    >
      <Link to={comingSoon ? '#' : linkTo} className={comingSoon ? 'pointer-events-none' : ''}>
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />

          {/* Coming Soon Badge */}
          {comingSoon && (
            <div className="absolute top-4 right-4 bg-ivory-50/90 backdrop-blur-sm text-charcoal-700 text-xs font-medium px-3 py-1.5 rounded-full">
              Coming Soon
            </div>
          )}

          {/* Title overlay on image for mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-display text-ivory-50 drop-shadow-lg">
              {title}
            </h2>
            <p className="font-display italic text-ivory-200 text-base sm:text-lg mt-1 drop-shadow-md">
              {tagline}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed mb-4">
          {description}
        </p>

        {services && (
          <p className="text-xs sm:text-sm text-sage-600 font-medium mb-5">
            {services}
          </p>
        )}

        <Button
          href={linkTo}
          variant={comingSoon ? 'outline' : 'primary'}
          size="lg"
          className="w-full justify-center"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
