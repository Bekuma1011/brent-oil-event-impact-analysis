import React, { useState } from 'react';
import PriceChart from './components/PriceChart';
import EventTimeline from './components/EventTimeline';
import ChangePointInsights from './components/ChangePointInsights';

const App = () => {
  const [dateRange, setDateRange] = useState({ start: '2012-01-01', end: '2022-09-30' });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Brent Oil Price Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateRangeChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateRangeChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Event Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded p-2 w-full"
          >
            <option value="All">All</option>
            <option value="Conflict">Conflict</option>
            <option value="OPEC Policy">OPEC Policy</option>
            <option value="Sanction">Sanction</option>
            <option value="Economic Shock">Economic Shock</option>
            <option value="Political Decision">Political Decision</option>
          </select>
        </div>
      </div>
      <PriceChart dateRange={dateRange} selectedCategory={selectedCategory} />
      <EventTimeline dateRange={dateRange} selectedCategory={selectedCategory} />
      <ChangePointInsights dateRange={dateRange} />
    </div>
  );
};

export default App;