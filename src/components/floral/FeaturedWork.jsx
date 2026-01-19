import { Link } from 'react-router-dom';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ROUTES } from '../../utils/constants';
import { portfolioItems } from '../../data/portfolio';
import { useAnimation } from '../../hooks/useAnimation';

export function FeaturedWork() {
  const featuredItems = portfolioItems.slice(0, 4);
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];
  const [buttonRef, , buttonClass] = useAnimation('fade-up', 0.1, 'delay-5');

  return (
    <section className="py-16 md:py-24 bg-ivory-50">
      <div className="container-custom">
        <SectionHeading title="Recent Creations" animated />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredItems.map((item, index) => (
            <FeaturedItem key={item.id} item={item} delay={delays[index]} />
          ))}
        </div>

        <div ref={buttonRef} className={`text-center ${buttonClass}`}>
          <Button href={ROUTES.floralPortfolio} variant="primary" size="lg">
            See Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedItem({ item, delay = '' }) {
  const [ref, , className] = useAnimation('scale-up', 0.1, delay);

  return (
    <Link
      ref={ref}
      to={ROUTES.floralPortfolio}
      className={`group relative h-80 rounded-2xl overflow-hidden image-zoom-container shadow-lg ${className}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover image-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-display mb-2">{item.title}</h3>
          <p className="text-ivory-200 text-sm">{item.description}</p>
        </div>
      </div>
    </Link>
  );
}
