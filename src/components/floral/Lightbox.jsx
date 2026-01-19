import { useEffect } from 'react';

export function Lightbox({ item, onClose, onNext, onPrev, onRequest }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  const categoryLabels = {
    weddings: 'Weddings',
    events: 'Events & Corporate',
    sympathy: 'Sympathy',
    everyday: 'Everyday'
  };

  const handleRequestClick = () => {
    onClose();
    if (onRequest) {
      onRequest(item);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-ivory-200 transition-colors z-10"
        aria-label="Close"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 text-white hover:text-ivory-200 transition-colors"
        aria-label="Previous"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 text-white hover:text-ivory-200 transition-colors"
        aria-label="Next"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div
        className="max-w-5xl w-full bg-ivory-50 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video md:aspect-[4/3]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-sage-600 mb-2">
                {categoryLabels[item.category]}
              </p>
              <h2 className="text-2xl md:text-3xl font-display text-charcoal-800 mb-3">
                {item.title}
              </h2>
              <p className="text-charcoal-700 leading-relaxed">
                {item.description}
              </p>
            </div>

            {onRequest && (
              <button
                onClick={handleRequestClick}
                className="inline-flex items-center justify-center px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white font-medium rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Request This
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
