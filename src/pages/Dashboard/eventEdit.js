import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './eventCreation.css';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: ''
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:4000/api/events/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const event = response.data.data;
            // Split datetime into date and time if it comes as a single field
            const dateTime = new Date(event.date);
            const formattedDate = dateTime.toISOString().split('T')[0];
            const formattedTime = dateTime.toTimeString().slice(0, 5);

            setFormData({
                name: event.name,
                description: event.description,
                date: formattedDate,
                time: formattedTime,
                location: event.location
            });
            setLoading(false);
        } catch (err) {
            setErrorMessage('Error loading event details. Please try again.');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const eventDate = new Date(formData.date);
        const currentDate = new Date();

        if (eventDate < currentDate) {
            setErrorMessage('Event date cannot be in the past');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:4000/api/events/${id}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/eventDisplay'); // Redirect to dashboard
        } catch (err) {
            setErrorMessage('Error updating event. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading">Loading event details...</div>;
    }

    return (
        <div className="event-form-container">
            <div className="form-header">
                <h2>Edit Event</h2>
                <button
                    className="back-button"
                    onClick={() => navigate('/eventDisplay')}
                >
                    Back to Events
                </button>
            </div>

            <form onSubmit={handleSubmit} className="event-form">
                <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate('/eventDisplay')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;