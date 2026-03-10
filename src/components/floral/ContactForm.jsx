import { useState } from 'react';
import { Button } from '../common/Button';
import { useEmailJS } from '../../hooks/useEmailJS';
import { validateEmail, validateRequired } from '../../utils/validators';

export function ContactForm() {
  const { sendEmail, status, error, reset, retry, canRetry } = useEmailJS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const nameErr = validateRequired(formData.name, 'Name');
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const msgErr = validateRequired(formData.message, 'Message');
    if (msgErr) newErrors.message = msgErr;

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
        event_type: formData.eventType || 'Not specified',
        event_date: formData.eventDate || 'Not specified',
        message: formData.message
      }
    );

    if (success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset disabled={status === 'loading'} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal-800 mb-2">
          Name <span className="text-terracotta-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
            errors.name ? 'border-terracotta-500' : 'border-sage-200 focus:border-sage-400'
          }`}
        />
        {errors.name && <p id="name-error" role="alert" className="mt-1 text-sm text-terracotta-600">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal-800 mb-2">
          Email <span className="text-terracotta-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
            errors.email ? 'border-terracotta-500' : 'border-sage-200 focus:border-sage-400'
          }`}
        />
        {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm text-terracotta-600">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal-800 mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-sage-200 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
      </div>

      {/* Event Type */}
      <div>
        <label htmlFor="eventType" className="block text-sm font-medium text-charcoal-800 mb-2">
          Event Type
        </label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-sage-200 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <option value="">Select an event type</option>
          <option value="Wedding">Wedding</option>
          <option value="Corporate/Event">Corporate/Event</option>
          <option value="Everyday/Gift">Everyday/Gift</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Event Date */}
      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-charcoal-800 mb-2">
          Event Date
        </label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-sage-200 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-800 mb-2">
          Message <span className="text-terracotta-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none ${
            errors.message ? 'border-terracotta-500' : 'border-sage-200 focus:border-sage-400'
          }`}
        ></textarea>
        {errors.message && <p id="message-error" role="alert" className="mt-1 text-sm text-terracotta-600">{errors.message}</p>}
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 bg-sage-100 border-2 border-sage-300 rounded-xl">
          <p className="text-sage-800 font-medium">Thank you! We'll be in touch soon.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-terracotta-100 border-2 border-terracotta-300 rounded-xl">
          <p className="text-terracotta-800 font-medium">
            {error}
          </p>
          {canRetry && (
            <button
              type="button"
              onClick={retry}
              className="mt-2 text-sm text-terracotta-700 underline hover:text-terracotta-900 transition-colors"
            >
              Try again
            </button>
          )}
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
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
      </fieldset>
    </form>
  );
}
