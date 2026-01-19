import { Button } from '../common/Button';
import { useAnimation } from '../../hooks/useAnimation';
import { ROUTES } from '../../utils/constants';

export function InquiryServiceCard({ service, delay = '' }) {
  const [ref, , className] = useAnimation('fade-up', 0.1, delay);

  return (
    <div
      ref={ref}
      className={`bg-ivory-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}
    >
      {/* Service Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/20 to-transparent" />
        <span className="absolute top-4 left-4 bg-sage-600 text-ivory-50 text-xs font-medium px-3 py-1.5 rounded-full">
          Inquiry Only
        </span>
      </div>

      {/* Service Details */}
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-display text-charcoal-800 mb-3">
          {service.name}
        </h3>

        <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Includes List */}
        {service.includes && service.includes.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wide mb-2">
              Includes
            </p>
            <div className="flex flex-wrap gap-2">
              {service.includes.map((item, index) => (
                <span
                  key={index}
                  className="text-xs bg-linen-100 text-charcoal-700 px-3 py-1.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {service.cta && (
          <p className="text-sm text-sage-700 italic mb-6">
            {service.cta}
          </p>
        )}

        {/* Inquiry Button */}
        <Button
          href={ROUTES.floralContact}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Inquire Now
          </span>
        </Button>
      </div>
    </div>
  );
}
