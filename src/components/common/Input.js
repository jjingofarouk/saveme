import React from 'react';
import '../../App.css';

const Input = ({ type, name, value, onChange, placeholder, error }) => (
  <div className="input-container">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? 'input error' : 'input'}
    />
    {error && <span className="error-text">{error}</span>}
  </div>
);

export default Input;