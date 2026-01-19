import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function useEmailJS() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const sendEmail = async (templateId, templateParams) => {
    setStatus('loading');
    setError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      return true;
    } catch (err) {
      setStatus('error');
      setError(err.message);
      return false;
    }
  };

  const reset = () => {
    setStatus('idle');
    setError(null);
  };

  return { sendEmail, status, error, reset };
}
