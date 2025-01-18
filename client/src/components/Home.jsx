import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdventureList from './AdventureList';
import AddAdventure from './AddAdventure';
import '../Styles/home.css';

function Home() {
  const [message, setMessage] = useState('');
  const [showAddAdventure, setShowAddAdventure] = useState(false);
  const [adventures, setAdventures] = useState([]);

  const handleOpen = () => setShowAddAdventure(true);
  const handleClose = () => setShowAddAdventure(false);

  const handleAdventureAdded = (newAdventure) => {
    setAdventures((prev) => [...prev, newAdventure]);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/adventures')
      .then((response) => {
        setAdventures(response.data);
      })
      .catch((error) => {
        console.error('Error fetching adventures:', error);
      });
  }, [handleClose]);

  return (
    <>
      <div className="home-container">
        <h1 className="home-header">Your Advetures</h1>
        <button className="home-adventureButton" onClick={handleOpen}>
          Create an Aventure
        </button>
        {showAddAdventure && <AddAdventure onClose={handleClose} onAdventureAdded={handleAdventureAdded} />}
        <div className="AdventureLists-container">
          <AdventureList />
        </div>
      </div>
    </>
  );
}

export default Home;
