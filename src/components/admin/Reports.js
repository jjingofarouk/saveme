import React, { useState, useEffect } from 'react';
import { getReports } from '../../services/adminService';
import '../../App.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError('Failed to load reports');
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="reports">
      <h2>Reports</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.title}: {report.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;