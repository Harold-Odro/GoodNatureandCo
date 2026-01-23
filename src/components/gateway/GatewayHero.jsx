import { Logo } from '../common/Logo';
import { SITE_INFO } from '../../utils/constants';
import { useAnimation } from '../../hooks/useAnimation';

export function GatewayHero() {
  const [logoRef, , logoClass] = useAnimation('scale-up');
  const [taglineRef, , taglineClass] = useAnimation('fade-up', 0.1, 'delay-3');

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background - Soft earthy gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-amber-50 to-stone-300" />

      {/* Decorative botanical border frame */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 border border-stone-300/50 rounded-sm pointer-events-none" />

      {/* Corner botanical accents */}
      <svg className="absolute top-8 left-8 sm:top-12 sm:left-12 w-16 h-16 sm:w-24 sm:h-24 text-stone-400/40" viewBox="0 0 100 100" fill="none">
        <path d="M10 90 Q10 50, 50 50 Q50 10, 90 10" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="30" cy="70" r="4" fill="currentColor" opacity="0.5"/>
        <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="70" cy="30" r="4" fill="currentColor" opacity="0.5"/>
        <path d="M25 75 Q30 65, 35 70" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <path d="M65 35 Q70 25, 75 30" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      </svg>
      <svg className="absolute top-8 right-8 sm:top-12 sm:right-12 w-16 h-16 sm:w-24 sm:h-24 text-stone-400/40 -scale-x-100" viewBox="0 0 100 100" fill="none">
        <path d="M10 90 Q10 50, 50 50 Q50 10, 90 10" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="30" cy="70" r="4" fill="currentColor" opacity="0.5"/>
        <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="70" cy="30" r="4" fill="currentColor" opacity="0.5"/>
        <path d="M25 75 Q30 65, 35 70" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <path d="M65 35 Q70 25, 75 30" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      </svg>
      <svg className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 w-16 h-16 sm:w-24 sm:h-24 text-stone-400/40 -scale-y-100" viewBox="0 0 100 100" fill="none">
        <path d="M10 90 Q10 50, 50 50 Q50 10, 90 10" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="30" cy="70" r="4" fill="currentColor" opacity="0.5"/>
        <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="70" cy="30" r="4" fill="currentColor" opacity="0.5"/>
        <path d="M25 75 Q30 65, 35 70" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <path d="M65 35 Q70 25, 75 30" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      </svg>
      <svg className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 w-16 h-16 sm:w-24 sm:h-24 text-stone-400/40 scale-x-[-1] scale-y-[-1]" viewBox="0 0 100 100" fill="none">
        <path d="M10 90 Q10 50, 50 50 Q50 10, 90 10" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="30" cy="70" r="4" fill="currentColor" opacity="0.5"/>
        <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="70" cy="30" r="4" fill="currentColor" opacity="0.5"/>
        <path d="M25 75 Q30 65, 35 70" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <path d="M65 35 Q70 25, 75 30" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      </svg>

      {/* Subtle floating botanical shapes */}
      <div className="absolute top-1/4 left-[15%] w-2 h-2 bg-sage-400/20 rounded-full animate-pulse-soft" />
      <div className="absolute top-1/3 right-[20%] w-3 h-3 bg-terracotta-300/15 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-[25%] w-2.5 h-2.5 bg-sage-300/20 rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 right-[15%] w-2 h-2 bg-linen-400/30 rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-12">
        <div ref={logoRef} className={`${logoClass}`}>
          <Logo variant="full" size="xl" />
        </div>
        <p ref={taglineRef} className={`mt-6 text-lg sm:text-xl md:text-2xl font-display italic text-stone-600 ${taglineClass}`}>
          {SITE_INFO.tagline}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-stone-500 text-xs uppercase tracking-widest">Explore</span>
          <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
