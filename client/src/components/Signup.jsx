import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/signup.css';

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', { email, password })
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="signUp-container">
        <h2 className="signUp-title">Sign Up</h2>
        <form className="signUp-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="signUp-button" type="submit">
            Sign Up
          </button>
          <p>Already have an account?</p>
          <Link to="/login" className="">
            Login
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
