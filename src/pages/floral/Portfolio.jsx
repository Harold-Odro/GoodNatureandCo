import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FloralLayout } from '../../layouts/FloralLayout';
import { SEO } from '../../components/common/SEO';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { PortfolioFilter } from '../../components/floral/PortfolioFilter';
import { PortfolioGrid } from '../../components/floral/PortfolioGrid';
import { Lightbox } from '../../components/floral/Lightbox';
import { RequestModal } from '../../components/floral/RequestModal';
import { ROUTES } from '../../utils/constants';
import { portfolioItems } from '../../data/portfolio';
import { useAnimation } from '../../hooks/useAnimation';

function PortfolioHero() {
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const [subtitleRef, , subtitleClass] = useAnimation('fade-up', 0.1, 'delay-2');

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-charcoal-900/20" />
      </div>

      <div className="container-custom text-center relative z-10">
        <h1 ref={titleRef} className={`text-4xl md:text-5xl lg:text-6xl font-display text-ivory-50 mb-4 drop-shadow-lg ${titleClass}`}>
          Our Work
        </h1>
        <p ref={subtitleRef} className={`text-lg md:text-xl text-ivory-100 max-w-2xl mx-auto drop-shadow-md ${subtitleClass}`}>
          A collection of our favorite creations
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  const [titleRef, , titleClass] = useAnimation('fade-up');
  const [descRef, , descClass] = useAnimation('fade-up', 0.1, 'delay-1');
  const [buttonRef, , buttonClass] = useAnimation('fade-up', 0.1, 'delay-2');

  return (
    <section className="py-16 md:py-24 bg-linen-200">
      <div className="container-custom text-center">
        <h2 ref={titleRef} className={`text-3xl md:text-4xl font-display text-charcoal-800 mb-4 ${titleClass}`}>
          Let's Create Something Beautiful
        </h2>
        <p ref={descRef} className={`text-lg text-charcoal-700 mb-8 max-w-2xl mx-auto ${descClass}`}>
          Ready to bring your floral vision to life? We'd love to hear from you.
        </p>
        <div ref={buttonRef} className={buttonClass}>
          <Button href={ROUTES.floralContact} variant="primary" size="lg">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [requestItem, setRequestItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam && ['weddings', 'events', 'sympathy', 'everyday'].includes(filterParam)) {
      setActiveFilter(filterParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === activeFilter));
    }
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter });
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  const handleRequestClick = (item) => {
    setRequestItem(item);
  };

  const handleCloseRequest = () => {
    setRequestItem(null);
  };

  return (
    <FloralLayout showCart={true}>
      <SEO
        title="Portfolio | Good Nature Floral Artistry"
        description="Browse our collection of wedding flowers, event arrangements, sympathy florals, and everyday bouquets. Good Nature Floral Artistry, Reston, Virginia."
        canonical="/floral-artistry/portfolio"
      />

      <PortfolioHero />

      <section className="py-16 bg-ivory-50">
        <div className="container-custom">
          <PortfolioFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          <PortfolioGrid
            items={filteredItems}
            onItemClick={handleItemClick}
            onItemRequest={handleRequestClick}
          />
        </div>
      </section>

      <CTASection />

      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
          onRequest={handleRequestClick}
        />
      )}

      {requestItem && (
        <RequestModal
          item={requestItem}
          onClose={handleCloseRequest}
        />
      )}
    </FloralLayout>
  );
}
