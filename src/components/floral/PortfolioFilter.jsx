import { useAnimation } from '../../hooks/useAnimation';

export function PortfolioFilter({ activeFilter, onFilterChange }) {
  const [ref, , className] = useAnimation('fade-up', 0.1);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'events', label: 'Events & Corporate' },
    { id: 'sympathy', label: 'Sympathy' },
    { id: 'everyday', label: 'Everyday' }
  ];

  return (
    <div ref={ref} className={`flex flex-wrap justify-center gap-3 mb-12 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-sage-500 text-ivory-50 shadow-md'
              : 'bg-ivory-50 text-charcoal-700 border-2 border-linen-300 hover:border-sage-400 hover:bg-linen-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
