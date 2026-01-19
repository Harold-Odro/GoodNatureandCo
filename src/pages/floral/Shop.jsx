import { FloralLayout } from '../../layouts/FloralLayout';
import { SEO } from '../../components/common/SEO';
import { ProductCard } from '../../components/floral/ProductCard';
import { CustomProductCard } from '../../components/floral/CustomProductCard';
import { Button } from '../../components/common/Button';
import { products } from '../../data/products';
import { ROUTES } from '../../utils/constants';
import { useAnimation } from '../../hooks/useAnimation';

function ShopHero() {
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const [subtitleRef, , subtitleClass] = useAnimation('fade-up', 0.1, 'delay-2');

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-charcoal-900/20" />
      </div>

      <div className="container-custom text-center relative z-10">
        <h1 ref={titleRef} className={`text-4xl md:text-5xl lg:text-6xl font-display text-ivory-50 mb-4 drop-shadow-lg ${titleClass}`}>
          Shop Flowers
        </h1>
        <p ref={subtitleRef} className={`text-lg md:text-xl text-ivory-100 max-w-2xl mx-auto drop-shadow-md ${subtitleClass}`}>
          Hand-crafted arrangements ready for delivery
        </p>
      </div>
    </section>
  );
}

function ProductGrid() {
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];

  return (
    <section className="py-16 md:py-24 bg-ivory-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            product.type === 'semi-custom' ? (
              <CustomProductCard
                key={product.id}
                product={product}
                delay={delays[index % delays.length]}
              />
            ) : (
              <ProductCard
                key={product.id}
                product={product}
                delay={delays[index % delays.length]}
              />
            )
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-charcoal-600 text-lg">
              New products coming soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function CustomOrderCTA() {
  const [ref, , className] = useAnimation('fade-up');

  return (
    <section className="py-16 md:py-24 bg-linen-200">
      <div ref={ref} className={`container-custom text-center ${className}`}>
        <h2 className="text-3xl md:text-4xl font-display text-charcoal-800 mb-4">
          Looking for Something Custom?
        </h2>
        <p className="text-lg text-charcoal-700 mb-8 max-w-2xl mx-auto">
          Whether it's a wedding, special event, or a unique arrangement, we'd love to bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={ROUTES.floralContact} variant="primary" size="lg">
            Request Custom Order
          </Button>
          <Button href={ROUTES.floralPortfolio} variant="outline" size="lg">
            View Our Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}

function DeliveryInfo() {
  const [ref, , className] = useAnimation('fade-up');

  const infoItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Local Delivery',
      description: 'Free delivery in Reston, VA for orders over $100'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Same-Day Available',
      description: 'Order by 12pm for same-day delivery'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Freshness Guaranteed',
      description: 'Every bouquet arrives fresh and beautiful'
    }
  ];

  return (
    <section ref={ref} className={`py-12 bg-sage-50 ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-ivory-50 text-sage-600 rounded-full mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-display text-lg text-charcoal-800 mb-2">
                {item.title}
              </h3>
              <p className="text-charcoal-600 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Shop() {
  return (
    <FloralLayout showCart={true}>
      <SEO
        title="Shop Flowers | Good Nature Floral Artistry"
        description="Shop our collection of hand-crafted floral arrangements. Premium roses, seasonal bouquets, and more. Local delivery in Reston, Virginia."
        canonical="/floral-artistry/shop"
      />

      <ShopHero />
      <DeliveryInfo />
      <ProductGrid />
      <CustomOrderCTA />
    </FloralLayout>
  );
}
