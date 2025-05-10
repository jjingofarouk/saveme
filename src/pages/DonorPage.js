import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DonorProfile from '../components/donor/DonorProfile';
import DonorDashboard from '../components/donor/DonorDashboard';
import DonationHistory from '../components/donor/DonationHistory';

const DonorPage = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'donor') {
    return (
      <>
        <style>
          {`
            .unauthorized {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #F7F9FA;
              color: #C62828;
              font-family: 'Inter', sans-serif;
              font-size: 1.25rem;
              font-weight: 500;
              text-align: center;
              padding: 1.5rem;
            }
          `}
        </style>
        <p className="unauthorized">Unauthorized</p>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          .donor-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
            background: #F7F9FA;
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
          }

          .donor-page h1 {
            color: #1A1A1A;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-align: center;
          }

          .donor-section {
            background: #FFFFFF;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .donor-page {
              padding: 1.5rem 1rem;
            }

            .donor-page h1 {
              font-size: 1.75rem;
            }

            .donor-section {
              padding: 1rem;
            }
          }

          @media (max-width: 480px) {
            .donor-page h1 {
              font-size: 1.5rem;
            }
          }

          /* Accessibility */
          .donor-page h1:focus {
            outline: 2px solid #C62828;
            outline-offset: 2px;
          }
        `}
      </style>
      <div className="donor-page">
        <h1>Donor Portal</h1>
        <div className="donor-section">
          <DonorProfile />
        </div>
        <div className="donor-section">
          <DonorDashboard />
        </div>
        <div className="donor-section">
          <DonationHistory />
        </div>
      </div>
    </>
  );
};

export default DonorPage;