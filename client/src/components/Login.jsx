import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/login.css';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting login with:', { email, password });

      const response = await axios.post('http://localhost:3001/login', { email, password });
      console.log('Server response:', response.data);

      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Login to Pathforge</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email Address:</label>
          <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="login-button" type="submit">
            Login
          </button>
          <p>Don't have an account?</p>
          <Link className="login-link" to="/signup">
            Create an Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
