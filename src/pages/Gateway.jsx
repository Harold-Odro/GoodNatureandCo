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

      <section className="py-16 md:py-24 bg-ivory-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            <BrandCard
              title="Floral Artistry"
              tagline={FLORAL_INFO.tagline}
              description={FLORAL_INFO.description}
              services="Weddings • Events • Sympathy • Everyday"
              image="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop"
              linkTo={ROUTES.floralHome}
              buttonText="Explore →"
              delay="delay-1"
            />

            <BrandCard
              title="Body Care"
              tagline={BODYCARE_INFO.tagline}
              description={BODYCARE_INFO.description}
              image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop"
              linkTo={ROUTES.bodyCare}
              buttonText="Notify Me"
              comingSoon={true}
              delay="delay-3"
            />
          </div>
        </div>
      </section>
    </GatewayLayout>
  );
}
