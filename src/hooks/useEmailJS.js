import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

function getErrorMessage(err) {
  if (!navigator.onLine) {
    return 'You appear to be offline. Please check your internet connection and try again.';
  }

  if (err?.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  if (err?.status >= 500) {
    return 'The email service is temporarily unavailable. Please try again later or contact us directly.';
  }

  if (err?.status === 400) {
    return 'There was an issue with the form data. Please check your entries and try again.';
  }

  return 'Something went wrong. Please try again or contact us directly.';
}

export function useEmailJS() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);
  const [retryData, setRetryData] = useState(null);

  const sendEmail = useCallback(async (templateId, templateParams) => {
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
      setRetryData(null);
      return true;
    } catch (err) {
      setStatus('error');
      setError(getErrorMessage(err));
      setRetryData({ templateId, templateParams });
      return false;
    }
  }, []);

  const retry = useCallback(async () => {
    if (!retryData) return false;
    return sendEmail(retryData.templateId, retryData.templateParams);
  }, [retryData, sendEmail]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setRetryData(null);
  }, []);

  return { sendEmail, status, error, reset, retry, canRetry: !!retryData };
}
