import { useState } from 'react';
import axios from 'axios';
import './eventCreation.css'

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventDate = new Date(date);
    const currentDate = new Date();

    if (eventDate < currentDate) {
      setErrorMessage('Event date cannot be in the past');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:4000/api/events',
        { name, description, date, time, location },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      window.location.href = '/eventDisplay';  // Redirect to dashboard
    } catch (err) {
      setErrorMessage('Error creating event. Try again later.');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
