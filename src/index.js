const express = require('express');
const config = require('./config');

// Create Express App
const app = express();

// Configure Express App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Car Rental!' });
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}/`);
});