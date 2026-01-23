import { GatewayLayout } from '../layouts/GatewayLayout';
import { GatewayHero } from '../components/gateway/GatewayHero';
import { BrandCard } from '../components/gateway/BrandCard';
import { SEO } from '../components/common/SEO';
import { FLORAL_INFO, BODYCARE_INFO, ROUTES } from '../utils/constants';

export default function Gateway() {
  return (
    <GatewayLayout>
      <SEO
        title="Good Nature | Nature's Beauty, Thoughtfully Made"
        description="Good Nature offers artisanal floral arrangements and natural body care products. Serving Reston, Virginia and beyond."
        canonical="/"
      />

      <GatewayHero />

      {/* Brand Cards Section */}
      <section className="py-10 sm:py-16 md:py-20 bg-linen-100">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Section Header - Mobile Friendly */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-display text-charcoal-800 mb-2">
              Our Brands
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base">
              Explore what we offer
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <BrandCard
              title="Floral Artistry"
              tagline={FLORAL_INFO.tagline}
              description={FLORAL_INFO.description}
              services="Weddings • Events • Everyday"
              image="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop"
              linkTo={ROUTES.floralHome}
              buttonText="Explore Florals"
              delay="delay-1"
            />

            <BrandCard
              title="Body Care"
              tagline={BODYCARE_INFO.tagline}
              description={BODYCARE_INFO.description}
              image="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop"
              linkTo={ROUTES.bodyCare}
              buttonText="Get Notified"
              comingSoon={true}
              delay="delay-2"
            />
          </div>
        </div>
      </section>

      {/* Footer Tag */}
      <section className="py-8 sm:py-10 bg-ivory-50 text-center">
        <p className="text-charcoal-500 text-sm px-4">
          Serving Reston, Virginia & surrounding areas
        </p>
      </section>
    </GatewayLayout>
  );
}
