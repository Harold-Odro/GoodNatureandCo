import { CONTACT_INFO, SITE_INFO } from '../../utils/constants';

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-display text-charcoal-800 mb-6">Get in Touch</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wider text-sage-600 mb-1">Phone</p>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
              className="text-lg text-charcoal-800 hover:text-sage-600 transition-colors"
            >
              {CONTACT_INFO.phone}
            </a>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-sage-600 mb-1">Email</p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-lg text-charcoal-800 hover:text-sage-600 transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-sage-600 mb-1">Instagram</p>
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-charcoal-800 hover:text-sage-600 transition-colors"
            >
              {CONTACT_INFO.instagram}
            </a>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display text-charcoal-800 mb-3">Service Area</h3>
        <p className="text-charcoal-700">{SITE_INFO.serviceArea}</p>
      </div>

      <div className="pt-6 border-t border-linen-300">
        <p className="text-sm text-charcoal-600 leading-relaxed">
          We typically respond to inquiries within 24-48 hours. For urgent requests, please call us directly.
        </p>
      </div>
    </div>
  );
}
