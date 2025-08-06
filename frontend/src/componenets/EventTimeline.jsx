import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api';

const EventTimeline = ({ dateRange, selectedCategory }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(res => {
      const formatted = res.data.map(e => ({
        date: new Date(e.Date).toISOString().split('T')[0],
        event: e.Event,
        category: e.Category
      }));
      setEvents(formatted);
    });
  }, []);

  const filteredEvents = selectedCategory === 'All'
    ? events.filter(e => {
        const date = new Date(e.date);
        return date >= new Date(dateRange.start) && date <= new Date(dateRange.end);
      })
    : events.filter(e => e.category === selectedCategory && new Date(e.date) >= new Date(dateRange.start) && new Date(e.date) <= new Date(dateRange.end));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Key Events Affecting Oil Prices</h2>
      <ul className="list-disc pl-5">
        {filteredEvents.map((e, i) => (
          <li key={i} className="mb-2">
            <strong>{e.date}</strong>: {e.event} ({e.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventTimeline;