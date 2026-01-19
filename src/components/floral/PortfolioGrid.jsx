import { PortfolioItem } from './PortfolioItem';
import { useAnimation } from '../../hooks/useAnimation';

export function PortfolioGrid({ items, onItemClick, onItemRequest }) {
  const [emptyRef, , emptyClass] = useAnimation('fade-up', 0.1);
  const delays = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6'];

  if (items.length === 0) {
    return (
      <div ref={emptyRef} className={`text-center py-12 ${emptyClass}`}>
        <p className="text-charcoal-600 text-lg">
          No items found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <PortfolioItem
          key={item.id}
          item={item}
          onClick={onItemClick}
          onRequest={onItemRequest}
          delay={delays[index % delays.length]}
        />
      ))}
    </div>
  );
}
