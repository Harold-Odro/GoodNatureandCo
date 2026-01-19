import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { useEmailJS } from '../../hooks/useEmailJS';

export function RequestModal({ item, onClose }) {
  const { sendEmail, status, error, reset } = useEmailJS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const categoryLabels = {
    weddings: 'Weddings',
    events: 'Events & Corporate',
    sympathy: 'Sympathy',
    everyday: 'Everyday'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const success = await sendEmail(
      import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        event_type: `Product Request: ${item.title}`,
        event_date: formData.eventDate || 'Not specified',
        message: `Product Request for: ${item.title} (${categoryLabels[item.category]})\n\nMessage: ${formData.message}`,
        product_title: item.title,
        product_category: categoryLabels[item.category]
      }
    );

    if (success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        message: ''
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center p-4 overflow-y-auto"
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

      {/* Content */}
      <div
        className="max-w-4xl w-full bg-ivory-50 rounded-2xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image Section */}
          <div className="relative bg-linen-100 p-6 lg:p-8">
            <div className="sticky top-8">
              <h3 className="text-sm uppercase tracking-wider text-sage-600 mb-4 font-medium">
                Requesting
              </h3>

              {/* Product Image Box */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs uppercase tracking-wider text-ivory-200 mb-1">
                    {categoryLabels[item.category]}
                  </p>
                  <h4 className="text-lg font-display">{item.title}</h4>
                </div>
              </div>

              <p className="mt-4 text-sm text-charcoal-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 lg:p-8">
            <h2 className="text-2xl md:text-3xl font-display text-charcoal-800 mb-2">
              Request This Arrangement
            </h2>
            <p className="text-charcoal-600 mb-6">
              Tell us about your event and we'll create something beautiful for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="request-name" className="block text-sm font-medium text-charcoal-800 mb-1">
                  Name <span className="text-terracotta-500">*</span>
                </label>
                <input
                  type="text"
                  id="request-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                    errors.name ? 'border-terracotta-500' : 'border-sage-200 focus:border-sage-400'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-terracotta-600">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="request-email" className="block text-sm font-medium text-charcoal-800 mb-1">
                  Email <span className="text-terracotta-500">*</span>
                </label>
                <input
                  type="email"
                  id="request-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                    errors.email ? 'border-terracotta-500' : 'border-sage-200 focus:border-sage-400'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-terracotta-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="request-phone" className="block text-sm font-medium text-charcoal-800 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="request-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-sage-200 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              {/* Event Date */}
              <div>
                <label htmlFor="request-date" className="block text-sm font-medium text-charcoal-800 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  id="request-date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-sage-200 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="request-message" className="block text-sm font-medium text-charcoal-800 mb-1">
                  Tell us about your vision <span className="text-terracotta-500">*</span>
                </label>
                <textarea
                  id="request-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your event, color preferences, any specific flowers you'd like..."
                  className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none ${
                    errors.message ? 'border-terracotta-500' : 'border-sage-200 focus:border-sage-400'
                  }`}
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-terracotta-600">{errors.message}</p>}
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="p-4 bg-sage-100 border-2 border-sage-300 rounded-lg">
                  <p className="text-sage-800 font-medium text-sm">
                    Thank you! We've received your request and will be in touch soon.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-terracotta-100 border-2 border-terracotta-300 rounded-lg">
                  <p className="text-terracotta-800 font-medium text-sm">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={status === 'loading'}
                disabled={status === 'loading'}
                className="w-full"
              >
                {status === 'loading' ? 'Sending...' : 'Send Request'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
