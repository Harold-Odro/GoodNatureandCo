import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { BODYCARE_INFO, ROUTES } from '../../utils/constants';
import { useAnimation } from '../../hooks/useAnimation';

export function ComingSoonHero() {
  const [logoRef, , logoClass] = useAnimation('scale-up');
  const [titleRef, , titleClass] = useAnimation('fade-up', 0.1, 'delay-1');
  const [taglineRef, , taglineClass] = useAnimation('fade-up', 0.1, 'delay-2');
  const [descRef, , descClass] = useAnimation('fade-up', 0.1, 'delay-3');
  const [linkRef, , linkClass] = useAnimation('fade-in', 0.1, 'delay-4');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-terracotta-50 via-linen-100 to-blush-100 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a1432f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-40 h-40 border border-terracotta-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 border border-terracotta-200/20 rounded-full"></div>
      <div className="absolute top-1/3 left-10 w-24 h-24 border border-blush-200/30 rounded-full"></div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div ref={logoRef} className={logoClass}>
          <Logo variant="full" size="lg" color="dark" linkTo={ROUTES.home} />
        </div>

        <div className="mt-12 space-y-6">
          <h1 ref={titleRef} className={`text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-800 ${titleClass}`}>
            Body Care
          </h1>

          <p ref={taglineRef} className={`text-2xl md:text-3xl font-display italic text-terracotta-600 ${taglineClass}`}>
            {BODYCARE_INFO.tagline}
          </p>

          <p ref={descRef} className={`text-lg md:text-xl text-charcoal-700 max-w-2xl mx-auto leading-relaxed ${descClass}`}>
            {BODYCARE_INFO.description}
          </p>
        </div>

        <div ref={linkRef} className={`mt-12 ${linkClass}`}>
          <Link
            to={ROUTES.home}
            className="inline-flex items-center text-sage-700 hover:text-sage-800 font-medium transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Good Nature
          </Link>
        </div>
      </div>
    </section>
  );
}
