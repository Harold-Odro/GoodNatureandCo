import { Link } from 'react-router-dom';
import { FloralLayout } from '../../layouts/FloralLayout';
import { FloralHero } from '../../components/floral/FloralHero';
import { ServicesPreview } from '../../components/floral/ServicesPreview';
import { FeaturedWork } from '../../components/floral/FeaturedWork';
import { SEO } from '../../components/common/SEO';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { ROUTES, FLORAL_INFO } from '../../utils/constants';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function IntroductionSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-16 md:py-24 bg-linen-100">
      <div className="container-custom">
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center reveal ${isVisible ? 'visible' : ''}`}>
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-display text-charcoal-800 mb-6">
              Rooted in Nature
            </h2>
            <div className="space-y-4 text-charcoal-700 leading-relaxed">
              <p>
                At Good Nature Floral Artistry, we believe flowers tell stories. Each arrangement
                is thoughtfully designed to capture the essence of your moment — whether it's a
                joyful celebration or a simple gesture of love.
              </p>
              <p>
                Based in Reston, Virginia, we bring an artisan's touch to every bloom.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&auto=format&fit=crop"
                alt="Natural floral arrangement"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-16 md:py-24 bg-linen-200">
      <div ref={ref} className={`container-custom text-center reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-display text-charcoal-800 mb-4">
          Let's Create Something Beautiful
        </h2>
        <p className="text-lg text-charcoal-700 mb-8 max-w-2xl mx-auto">
          Ready to bring your floral vision to life? We'd love to hear from you.
        </p>
        <Button href={ROUTES.floralContact} variant="primary" size="lg">
          Get in Touch
        </Button>
      </div>
    </section>
  );
}

function BrandTeaser() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-12 bg-sage-50">
      <div ref={ref} className={`container-custom text-center reveal ${isVisible ? 'visible' : ''}`}>
        <p className="text-charcoal-700 mb-3">
          Good Nature also offers <span className="font-display italic">Body Care</span>
        </p>
        <Link
          to={ROUTES.bodyCare}
          className="text-sage-700 hover:text-sage-800 font-medium transition-colors inline-flex items-center"
        >
          Coming Soon
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default function FloralHome() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Florist",
    "name": "Good Nature Floral Artistry",
    "description": FLORAL_INFO.description,
    "url": "https://goodnature.com/floral-artistry",
    "telephone": "(555) 123-4567",
    "email": "hello@goodnature.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Reston",
      "addressRegion": "VA",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": "Reston, Virginia"
    },
    "priceRange": "$",
    "image": "https://goodnature.com/og-image.jpg"
  };

  return (
    <FloralLayout showCart={true}>
      <SEO
        title="Floral Artistry | Good Nature"
        description="Thoughtfully crafted floral arrangements for weddings, events, and everyday moments. Serving Reston, Virginia."
        canonical="/floral-artistry"
        schema={localBusinessSchema}
      />

      <FloralHero />
      <IntroductionSection />
      <ServicesPreview />
      <FeaturedWork />
      <CTASection />
      <BrandTeaser />
    </FloralLayout>
  );
}
