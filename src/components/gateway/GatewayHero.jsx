import { Logo } from '../common/Logo';
import { SITE_INFO } from '../../utils/constants';
import { useAnimation } from '../../hooks/useAnimation';

export function GatewayHero() {
  const [logoRef, , logoClass] = useAnimation('scale-up');
  const [taglineRef, , taglineClass] = useAnimation('fade-up', 0.1, 'delay-3');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-linen-100 to-ivory-200 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sage-300 rounded-full opacity-20 blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linen-400 rounded-full opacity-15 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235f6d4e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div ref={logoRef} className={logoClass}>
          <Logo variant="full" size="lg" color="dark" />
        </div>
        <p ref={taglineRef} className={`mt-6 text-xl md:text-2xl font-display italic text-charcoal-700 ${taglineClass}`}>
          {SITE_INFO.tagline}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <svg className="w-6 h-6 text-charcoal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
