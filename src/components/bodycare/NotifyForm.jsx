import { useState } from 'react';
import { Button } from '../common/Button';
import { useEmailJS } from '../../hooks/useEmailJS';

export function NotifyForm() {
  const { sendEmail, status, error, reset } = useEmailJS();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
    if (status === 'success') {
      reset();
    }
  };

  const validate = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const success = await sendEmail(
      import.meta.env.VITE_EMAILJS_NOTIFY_TEMPLATE_ID,
      {
        to_email: 'hello@goodnature.com',
        from_email: email,
        message: `New subscriber for Body Care launch: ${email}`
      }
    );

    if (success) {
      setEmail('');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="notify-email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="notify-email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-6 py-4 rounded-xl border-2 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-terracotta-500 ${
              emailError ? 'border-terracotta-500' : 'border-linen-300 focus:border-terracotta-400'
            }`}
          />
          {emailError && <p className="mt-2 text-sm text-terracotta-600 text-center">{emailError}</p>}
        </div>

        {status === 'success' && (
          <div className="p-4 bg-sage-100 border-2 border-sage-300 rounded-xl">
            <p className="text-sage-800 font-medium text-center">
              You're on the list! We'll let you know when we launch.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-terracotta-100 border-2 border-terracotta-300 rounded-xl">
            <p className="text-terracotta-800 font-medium text-center">
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          loading={status === 'loading'}
          disabled={status === 'loading'}
          className="w-full"
        >
          {status === 'loading' ? 'Subscribing...' : 'Notify Me'}
        </Button>
      </form>
    </div>
  );
}
