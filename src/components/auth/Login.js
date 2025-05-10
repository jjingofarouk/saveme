import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/authService';
import Button from '../common/Button';
import Input from '../common/Input';
import { AlertCircle } from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/validators';
import '../../styles/Login.css';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const user = await login(email, password);
      setUser(user);
      navigate(`/${user.role}`);
    } catch (err) {
      setServerError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to BloodMatch</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              error={errors.email}
              icon={<AlertCircle size={18} />}
            />
          </div>
          <div className="input-group">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              error={errors.password}
              icon={<AlertCircle size={18} />}
            />
          </div>
          {serverError && (
            <p className="error-message">
              <AlertCircle size={18} className="error-icon" />
              {serverError}
            </p>
          )}
          <Button type="submit">Login</Button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;