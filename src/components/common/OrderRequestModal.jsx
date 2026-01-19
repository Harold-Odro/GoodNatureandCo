import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useEmailJS } from '../../hooks/useEmailJS';
import { Button } from './Button';

export function OrderRequestModal({ isOpen, onClose }) {
  const { cart, getCartTotal, clearCart } = useCart();
  const { sendEmail, status, error, reset } = useEmailJS();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryDate: '',
    deliveryAddress: '',
    deliveryInstructions: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.deliveryDate.trim()) {
      newErrors.deliveryDate = 'Delivery date is required';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatOrderItems = () => {
    return cart.map((item) => {
      if (item.type === 'semi-custom') {
        return `• ${item.productName} (Custom) - ${item.customizationSummary} x${item.quantity} = $${item.price * item.quantity}`;
      }
      return `• ${item.productName} - ${item.sizeName} (${item.stems} stems), ${item.optionName} x${item.quantity} = $${item.price * item.quantity}`;
    }).join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const orderDetails = `
ORDER REQUEST
=============

Customer Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Delivery Details:
- Date: ${formData.deliveryDate}
- Address: ${formData.deliveryAddress}
- Instructions: ${formData.deliveryInstructions || 'None'}

Order Items:
${formatOrderItems()}

Subtotal: $${getCartTotal()}

Additional Notes:
${formData.message || 'None'}
    `.trim();

    const success = await sendEmail(
      import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        event_type: 'Online Order Request',
        event_date: formData.deliveryDate,
        message: orderDetails
      }
    );

    if (success) {
      // Don't clear form yet - show success message first
    }
  };

  const handleSuccessClose = () => {
    clearCart();
    setFormData({
      name: '',
      email: '',
      phone: '',
      deliveryDate: '',
      deliveryAddress: '',
      deliveryInstructions: '',
      message: ''
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-900/80"
        onClick={status === 'success' ? handleSuccessClose : onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-ivory-50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-linen-300 bg-linen-100">
          <div>
            <h2 className="text-2xl font-display text-charcoal-800">
              Complete Your Order
            </h2>
            <p className="text-sm text-charcoal-600 mt-1">
              We'll contact you to confirm and arrange payment
            </p>
          </div>
          <button
            onClick={status === 'success' ? handleSuccessClose : onClose}
            className="p-2 text-charcoal-600 hover:text-charcoal-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {status === 'success' ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-charcoal-800 mb-4">
                Order Request Received!
              </h3>
              <p className="text-charcoal-600 mb-6 max-w-md mx-auto">
                Thank you for your order! We'll review your request and contact you within 24 hours to confirm details and arrange payment.
              </p>
              <Button onClick={handleSuccessClose} variant="primary" size="lg">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-linen-50 rounded-xl p-4">
                <h3 className="font-medium text-charcoal-800 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-charcoal-700">
                        {item.type === 'semi-custom' ? (
                          <>{item.productName} (Custom) x{item.quantity}</>
                        ) : (
                          <>{item.productName} ({item.sizeName}, {item.optionName}) x{item.quantity}</>
                        )}
                      </span>
                      <span className="text-charcoal-800 font-medium">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-linen-300 pt-2 mt-2 flex justify-between">
                    <span className="font-medium text-charcoal-800">Subtotal</span>
                    <span className="font-display text-lg text-charcoal-800">${getCartTotal()}</span>
                  </div>
                </div>
                <p className="text-xs text-charcoal-500 mt-2">
                  Delivery fee will be confirmed based on your location
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-medium text-charcoal-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="order-name" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Name <span className="text-terracotta-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="order-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                        errors.name ? 'border-terracotta-500' : 'border-linen-300 focus:border-sage-400'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-terracotta-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="order-phone" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Phone <span className="text-terracotta-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="order-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                        errors.phone ? 'border-terracotta-500' : 'border-linen-300 focus:border-sage-400'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-terracotta-600">{errors.phone}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="order-email" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Email <span className="text-terracotta-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="order-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                        errors.email ? 'border-terracotta-500' : 'border-linen-300 focus:border-sage-400'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-terracotta-600">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h3 className="font-medium text-charcoal-800 mb-4">Delivery Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="order-date" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Preferred Delivery Date <span className="text-terracotta-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="order-date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                        errors.deliveryDate ? 'border-terracotta-500' : 'border-linen-300 focus:border-sage-400'
                      }`}
                    />
                    {errors.deliveryDate && <p className="mt-1 text-xs text-terracotta-600">{errors.deliveryDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="order-address" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Delivery Address <span className="text-terracotta-500">*</span>
                    </label>
                    <textarea
                      id="order-address"
                      name="deliveryAddress"
                      rows="2"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      placeholder="Street address, city, state, zip"
                      className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none ${
                        errors.deliveryAddress ? 'border-terracotta-500' : 'border-linen-300 focus:border-sage-400'
                      }`}
                    />
                    {errors.deliveryAddress && <p className="mt-1 text-xs text-terracotta-600">{errors.deliveryAddress}</p>}
                  </div>

                  <div>
                    <label htmlFor="order-instructions" className="block text-sm font-medium text-charcoal-700 mb-1">
                      Delivery Instructions
                    </label>
                    <input
                      type="text"
                      id="order-instructions"
                      name="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={handleChange}
                      placeholder="Gate code, leave at door, etc."
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-linen-300 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label htmlFor="order-message" className="block text-sm font-medium text-charcoal-700 mb-1">
                  Card Message or Special Requests
                </label>
                <textarea
                  id="order-message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Include a message for the recipient or any special requests..."
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-linen-300 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none"
                />
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="p-4 bg-terracotta-100 border-2 border-terracotta-300 rounded-lg">
                  <p className="text-terracotta-800 font-medium text-sm">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={status === 'loading'}
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Order Request'}
                </Button>
                <p className="text-xs text-center text-charcoal-500 mt-3">
                  No payment required now. We'll confirm your order and arrange payment.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
