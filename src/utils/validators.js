const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email';
  return '';
}

export function validateRequired(value, fieldName) {
  if (!value.trim()) return `${fieldName} is required`;
  return '';
}
