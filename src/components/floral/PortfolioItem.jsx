import { useAnimation } from '../../hooks/useAnimation';

export function PortfolioItem({ item, onClick, onRequest, delay = '' }) {
  const [ref, , className] = useAnimation('scale-up', 0.05, delay);

  const categoryLabels = {
    weddings: 'Weddings',
    events: 'Events',
    sympathy: 'Sympathy',
    everyday: 'Everyday'
  };

  const handleRequestClick = (e) => {
    e.stopPropagation();
    onRequest(item);
  };

  return (
    <div
      ref={ref}
      className={`group relative aspect-square rounded-xl overflow-hidden image-zoom-container shadow-md hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {/* Clickable image area for lightbox */}
      <button
        onClick={() => onClick(item)}
        className="absolute inset-0 w-full h-full cursor-pointer"
        aria-label={`View ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover image-zoom"
        />
      </button>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white pointer-events-auto">
          <p className="text-xs uppercase tracking-wider text-ivory-200 mb-1">
            {categoryLabels[item.category]}
          </p>
          <h3 className="text-base md:text-lg font-display mb-3">{item.title}</h3>

          {/* Request Button */}
          <button
            onClick={handleRequestClick}
            className="inline-flex items-center px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Request This
          </button>
        </div>
      </div>
    </div>
  );
}
