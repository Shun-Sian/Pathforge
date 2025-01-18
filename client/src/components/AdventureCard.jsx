import React from 'react';
import '../Styles/adventureCard.css';

function AdventureCard({ name, description }) {
  return (
    <div className="adventureCard-container">
      <h3 className="adventureCard-name">{name}</h3>
      <p className="adventureCard-description">{description}</p>
    </div>
  );
}

export default AdventureCard;
