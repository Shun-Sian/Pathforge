import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/addAdventure.css';

function AddAdventure({ onClose, onAdventureAdded }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddAdventure = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await axios.post(
        'http://localhost:3001/add-adventure',
        { title, details },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onAdventureAdded(response.data.adventure);

      setTitle('');
      setDetails('');

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding adventure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-adventure-overlay">
      <div className="add-adventure-container">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Add a New Adventure</h2>
        <form onSubmit={handleAddAdventure}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description:
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} required></textarea>
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Adventure'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
export default AddAdventure;
