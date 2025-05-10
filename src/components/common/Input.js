import React from 'react';
import { AlertCircle } from 'lucide-react';

const Input = ({ type, name, value, onChange, placeholder, error, icon }) => (
  <>
    <style>
      {`
        .input-container {
          position: relative;
          width: 100%;
          margin-bottom: 0.5rem;
        }

        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #E8ECEF;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          color: #1A1A1A;
          background: #FFFFFF;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input::placeholder {
          color: #6B7280;
        }

        .input:focus {
          border-color: #C62828;
          box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.1);
          outline: none;
        }

        .input.error {
          border-color: #C62828;
          background: #FFF1F1;
        }

        .error-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #C62828;
          font-size: 0.85rem;
          font-family: 'Inter', sans-serif;
          margin-top: 0.25rem;
          text-align: left;
        }

        .error-icon {
          color: #C62828;
          flex-shrink: 0;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .input {
            padding: 0.65rem 0.8rem;
            font-size: 0.9rem;
          }

          .error-text {
            font-size: 0.8rem;
          }
        }

        /* Accessibility */
        .input:focus {
          outline: 2px solid #C62828;
          outline-offset: 2px;
        }
      `}
    </style>
    <div className="input-container">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input error' : 'input'}
      />
      {error && (
        <span className="error-text">
          {icon && <span className="error-icon">{icon}</span>}
          {error}
        </span>
      )}
    </div>
  </>
);

export default Input;