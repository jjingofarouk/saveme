import React from 'react';

const Button = ({ type = 'button', children, onClick, disabled }) => (
  <>
    <style>
      {`
        .button {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #C62828;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
          text-align: center;
        }

        .button:hover {
          background: #A51C1C;
        }

        .button:active {
          transform: scale(0.98);
        }

        .button:disabled {
          background: #E8ECEF;
          color: #6B7280;
          cursor: not-allowed;
          transform: none;
        }

        /* Accessibility */
        .button:focus {
          outline: 2px solid #C62828;
          outline-offset: 2px;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .button {
            padding: 0.65rem 0.8rem;
            font-size: 0.9rem;
          }
        }
      `}
    </style>
    <button
      type={type}
      className="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  </>
);

export default Button;