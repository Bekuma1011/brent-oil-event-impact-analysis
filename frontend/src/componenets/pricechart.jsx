import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { fetchPrices, fetchEvents, fetchChangePoints } from '../services/api';

const PriceChart = ({ dateRange, selectedCategory }) => {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);

  useEffect(() => {
    fetchPrices().then(res => {
      const formatted = res.data.map(d => ({
        date: new Date(d.Date).toISOString().split('T')[0],
        price: d.Price,
        volatility: d.Volatility
      }));
      setPrices(formatted);
    });
    fetchEvents().then(res => {
      const formatted = res.data.map(e => ({
        date: new Date(e.Date).toISOString().split('T')[0],
        event: e.Event,
        category: e.Category
      }));
      setEvents(formatted);
    });
    fetchChangePoints().then(res => {
      const formatted = res.data.map(cp => ({
        date: new Date(cp['Change Point Date']).toISOString().split('T')[0],
        event: cp['Associated Event']
      }));
      setChangePoints(formatted);
    });
  }, []);

  const filteredPrices = prices.filter(p => {
    const date = new Date(p.date);
    return date >= new Date(dateRange.start) && date <= new Date(dateRange.end);
  });

  const filteredEvents = selectedCategory === 'All'
    ? events.filter(e => {
        const date = new Date(e.date);
        return date >= new Date(dateRange.start) && date <= new Date(dateRange.end);
      })
    : events.filter(e => e.category === selectedCategory && new Date(e.date) >= new Date(dateRange.start) && new Date(e.date) <= new Date(dateRange.end));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Brent Oil Price Trend</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredPrices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={['auto', 'auto']} label={{ value: 'USD per Barrel', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" dot={false} />
          <Line type="monotone" dataKey="volatility" stroke="#82ca9d" name="Volatility" dot={false} />
          {filteredEvents.map(e => (
            <ReferenceLine key={e.date} x={e.date} stroke="blue" strokeDasharray="3 3" label={{ value: e.event, position: 'top', fill: 'blue', fontSize: 10 }} />
          ))}
          {changePoints.map(cp => (
            <ReferenceLine key={cp.date} x={cp.date} stroke="red" strokeDasharray="5 5" label={{ value: 'Change Point', position: 'top', fill: 'red', fontSize: 10 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;