import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting login with:', { email, password }); // Debugging

      const response = await axios.post('http://localhost:3001/login', { email, password });
      console.log('Server response:', response.data); // Debugging

      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message); // Debugging
      alert(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-success w-100 rounded-0">
          Login
        </button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register" className="">
        Sign Up
      </Link>
    </div>
  );
}

export default Login;
