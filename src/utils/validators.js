export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Invalid email';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return 'Phone is required';
  const re = /^\+256\d{9}$/;
  if (!re.test(phone)) return 'Invalid phone number (+256 format)';
  return '';
};