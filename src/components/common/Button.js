import React from 'react';
import '../../App.css';

const Button = ({ type = 'button', children, onClick, disabled }) => (
  <button
    type={type}
    className="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;