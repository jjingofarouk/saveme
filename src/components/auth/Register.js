
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { register } from '../../services/authService';
import Button from '../common/Button';
import Input from '../common/Input';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validators';
import '../../App.css';

const Register = ({ onClose }) => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    role: 'donor',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const phoneError = validatePhone(formData.phone);
    if (emailError || passwordError || phoneError) {
      setErrors({ email: emailError, password: passwordError, phone: phoneError });
      return;
    }

    try {
      const user = await register(formData);
      setUser(user);
      onClose();
    } catch (err) {
      setServerError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password}
        />
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone (+256)"
          error={errors.phone}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>
        {serverError && <p className="error">{serverError}</p>}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;