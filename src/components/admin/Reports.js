
import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import '../../App.css';

const Reports = () => {
  const { data: reports, loading, error } = useFirestore('reports', true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="reports">
      <h2>Reports</h2>
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
