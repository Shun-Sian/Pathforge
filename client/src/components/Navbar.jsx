import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/navbar.css';
import Logout from './Logout';

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <button className="navButton" onClick={() => navigate('/Login')}>
        Login
      </button>
      <button className="navButton" onClick={() => navigate('/Signup')}>
        Sign up
      </button>
      <Logout className="navButton">Logout</Logout>
    </div>
  );
}

export default Navbar;
