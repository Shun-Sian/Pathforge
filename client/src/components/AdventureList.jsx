import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Styles/adventureList.css';
import AdventureCard from './AdventureCard';

function AdventureList() {
  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const response = await axios.get('http://localhost:3001/adventures');
        setAdventures(response.data);
      } catch (err) {
        setError('Error fetching adventures');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, [setAdventures]);

  if (loading) return <p>Loading adventures...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="adventureList-container">
      {adventures.map((adv) => (
        <AdventureCard key={adv._id} name={adv.title} description={adv.details} />
      ))}
    </div>
  );
}

export default AdventureList;
