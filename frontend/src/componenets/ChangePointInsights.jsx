import React, { useEffect, useState } from 'react';
import { fetchChangePoints } from '../services/api';

const ChangePointInsights = ({ dateRange }) => {
  const [changePoints, setChangePoints] = useState([]);

  useEffect(() => {
    fetchChangePoints().then(res => {
      const formatted = res.data.map(cp => ({
        date: new Date(cp['Change Point Date']).toISOString().split('T')[0],
        event: cp['Associated Event'],
        eventDate: new Date(cp['Event Date']).toISOString().split('T')[0],
        beforeMean: cp['Mean Before ($)'],
        afterMean: cp['Mean After ($)'],
        percentageChange: cp['Price Change (%)']
      }));
      setChangePoints(formatted);
    });
  }, []);

  const filteredChangePoints = changePoints.filter(cp => {
    const date = new Date(cp.date);
    return date >= new Date(dateRange.start) && date <= new Date(dateRange.end);
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Detected Change Points</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Change Point Date</th>
            <th className="border p-2">Associated Event</th>
            <th className="border p-2">Event Date</th>
            <th className="border p-2">Mean Before ($)</th>
            <th className="border p-2">Mean After ($)</th>
            <th className="border p-2">Price Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {filteredChangePoints.map((cp, i) => (
            <tr key={i}>
              <td className="border p-2">{cp.date}</td>
              <td className="border p-2">{cp.event}</td>
              <td className="border p-2">{cp.eventDate}</td>
              <td className="border p-2">{cp.beforeMean.toFixed(2)}</td>
              <td className="border p-2">{cp.afterMean.toFixed(2)}</td>
              <td className="border p-2">{cp.percentageChange.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChangePointInsights;