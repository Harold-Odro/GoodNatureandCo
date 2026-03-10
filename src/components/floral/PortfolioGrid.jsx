import { useState, useEffect } from 'react';
import { PortfolioItem } from './PortfolioItem';
import { Button } from '../common/Button';
import { useAnimation } from '../../hooks/useAnimation';

const ITEMS_PER_PAGE = 6;

export function PortfolioGrid({ items, onItemClick, onItemRequest }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [emptyRef, , emptyClass] = useAnimation('fade-up', 0.1);
  const [buttonRef, , buttonClass] = useAnimation('fade-up', 0.1);
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6'];

  // Reset visible count when items change (e.g. filter change)
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [items]);

  if (items.length === 0) {
    return (
      <div ref={emptyRef} className={`text-center py-12 ${emptyClass}`}>
        <p className="text-charcoal-600 text-lg">
          No items found in this category.
        </p>
      </div>
    );
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, items.length));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((item, index) => (
          <PortfolioItem
            key={item.id}
            item={item}
            onClick={onItemClick}
            onRequest={onItemRequest}
            delay={delays[index % delays.length]}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={buttonRef} className={`text-center mt-10 ${buttonClass}`}>
          <Button onClick={handleLoadMore} variant="outline" size="md">
            Load More
            <span className="ml-2 text-sm text-charcoal-500">
              ({items.length - visibleCount} remaining)
            </span>
          </Button>
        </div>
      )}

      {!hasMore && items.length > ITEMS_PER_PAGE && (
        <p className="text-center mt-8 text-charcoal-500 text-sm">
          Showing all {items.length} items
        </p>
      )}
    </div>
  );
}
