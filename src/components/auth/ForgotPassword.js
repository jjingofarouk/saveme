
import React, { useState } from 'react';
import { forgotPassword } from '../../services/authService';
import Button from '../common/Button';
import Input from '../common/Input';
import { validateEmail } from '../../utils/validators';
import '../App.css';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    try {
      await forgotPassword(email);
      setSuccess('Password reset email sent');
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          error={error}
        />
        {success && <p className="success">{success}</p>}
        <Button type="submit">Send Reset Link</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;