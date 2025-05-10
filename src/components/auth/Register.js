import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { register } from '../../services/authService';
import Button from '../common/Button';
import Input from '../common/Input';
import { AlertCircle } from 'lucide-react';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validators';
import '../../styles/Register.css';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    role: 'donor',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

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
      await register(formData);
      navigate('/login');
    } catch (err) {
      setServerError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register for BloodMatch</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              error={errors.email}
              icon={<AlertCircle size={18} />}
            />
          </div>
          <div className="input-group">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={errors.password}
              icon={<AlertCircle size={18} />}
            />
          </div>
          <div className="input-group">
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (+256)"
              error={errors.phone}
              icon={<AlertCircle size={18} />}
            />
          </div>
          <div className="input-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
            </select>
          </div>
          {serverError && (
            <p className="error-message">
              <AlertCircle size={18} className="error-icon" />
              {serverError}
            </p>
          )}
          <Button type="submit">Register</Button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;