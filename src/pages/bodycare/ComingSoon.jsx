import { BodyCareLayout } from '../../layouts/BodyCareLayout';
import { ComingSoonHero } from '../../components/bodycare/ComingSoonHero';
import { NotifyForm } from '../../components/bodycare/NotifyForm';
import { SEO } from '../../components/common/SEO';
import { useAnimation } from '../../hooks/useAnimation';

function NotifySection() {
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const [descRef, , descClass] = useAnimation('fade-up', 0.1, 'delay-1');
  const [formRef, , formClass] = useAnimation('fade-up', 0.1, 'delay-2');

  return (
    <section className="py-16 bg-ivory-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 ref={titleRef} className={`text-2xl md:text-3xl font-display text-charcoal-800 mb-4 ${titleClass}`}>
            Be the First to Know
          </h2>
          <p ref={descRef} className={`text-charcoal-700 leading-relaxed ${descClass}`}>
            Sign up to receive updates about our Body Care launch and exclusive early access.
          </p>
        </div>
        <div ref={formRef} className={formClass}>
          <NotifyForm />
        </div>
      </div>
    </section>
  );
}

export default function ComingSoon() {
  return (
    <BodyCareLayout>
      <SEO
        title="Body Care | Good Nature — Coming Soon"
        description="Good Nature Body Care is coming soon. Natural, thoughtfully made body care products. Sign up to be notified."
        canonical="/body-care"
      />

      <ComingSoonHero />
      <NotifySection />
    </BodyCareLayout>
  );
}
