require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./model/User');
const AdventureModel = require('./model/Adventure');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET ----', process.env.JWT_SECRET);

mongoose
  .connect('mongodb://127.0.0.1:27017/user', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await UserModel.create({ email, password: hashedPassword });
    res.json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration time
    );

    console.log('Login successful for user:', email);
    return res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

app.get('/home', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route', user: req.user });
});

app.post('/add-adventure', authenticateToken, async (req, res) => {
  const { title, details } = req.body;

  if (!title || !details) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const adventure = await AdventureModel.create({
      title,
      details,
      ownerId: req.user.id,
    });
    res.json({ message: 'Adventure added successfully', adventure });
  } catch (err) {
    res.status(500).json({ message: 'Error adding adventure', error: err });
  }
});

app.get('/adventures', async (req, res) => {
  try {
    const adventures = await AdventureModel.find().populate('ownerId', 'email');
    res.json(adventures);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Adventures', error: err });
  }
});

app.listen(3001, () => {
  console.log('server is running');
});
