import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Styles/home.css';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3001/home', {
        headers: { Authorization: token },
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Access denied');
      });
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-header">Your Adventures</h1>
      {/* <div>{message}</div>; */}
    </div>
  );
}

export default Home;
