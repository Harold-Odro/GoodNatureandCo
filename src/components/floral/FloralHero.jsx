import { useState, useEffect, useCallback } from 'react';
import { Button } from '../common/Button';
import { ROUTES } from '../../utils/constants';
import { useAnimation } from '../../hooks/useAnimation';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&auto=format&fit=crop',
    alt: 'Elegant floral arrangement'
  },
  {
    src: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1600&auto=format&fit=crop',
    alt: 'Beautiful wedding bouquet'
  },
  {
    src: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1600&auto=format&fit=crop',
    alt: 'Romantic rose arrangement'
  },
  {
    src: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1600&auto=format&fit=crop',
    alt: 'Colorful floral display'
  },
  {
    src: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?w=1600&auto=format&fit=crop',
    alt: 'Fresh spring flowers'
  }
];

export function FloralHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const [subtitleRef, , subtitleClass] = useAnimation('fade-up', 0.1, 'delay-2');
  const [buttonRef, , buttonClass] = useAnimation('fade-up', 0.1, 'delay-4');

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover scale-105"
              style={{
                animation: index === currentSlide ? 'kenburns 20s ease-in-out infinite alternate' : 'none'
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/30 via-charcoal-900/40 to-charcoal-900/60"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-ivory-100/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-ivory-100/10 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 ref={titleRef} className={`text-4xl md:text-5xl lg:text-6xl font-display text-ivory-50 mb-6 leading-tight ${titleClass}`}>
          Blooms for Life's Meaningful Moments
        </h1>
        <p ref={subtitleRef} className={`text-lg md:text-xl text-ivory-200 mb-8 max-w-2xl mx-auto leading-relaxed ${subtitleClass}`}>
          Thoughtfully crafted floral artistry for your most cherished occasions
        </p>
        <div ref={buttonRef} className={buttonClass}>
          <Button href={ROUTES.floralPortfolio} variant="primary" size="lg">
            View Our Work
          </Button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-ivory-50 w-6'
                : 'bg-ivory-50/40 hover:bg-ivory-50/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <svg className="w-6 h-6 text-ivory-50/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
