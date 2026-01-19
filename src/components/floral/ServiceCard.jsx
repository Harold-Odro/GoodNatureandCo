import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useAnimation } from '../../hooks/useAnimation';

export function ServiceCard({ service, delay = '' }) {
  const [ref, , className] = useAnimation('fade-up', 0.1, delay);

  return (
    <Link
      to={`${ROUTES.floralPortfolio}?filter=${service.filterParam}`}
      ref={ref}
      className={`group block bg-linen-50 rounded-2xl overflow-hidden shadow-lg card-hover ${className}`}
    >
      <div className="relative h-64 image-zoom-container overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover image-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent"></div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-sage-600/0 group-hover:bg-sage-600/20 transition-colors duration-500"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-display text-charcoal-800 mb-3 group-hover:text-sage-700 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-charcoal-700 leading-relaxed">
          {service.shortDescription}
        </p>

        <div className="mt-4 flex items-center text-sage-600 font-medium group-hover:text-sage-700 transition-colors">
          <span>View Examples</span>
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
