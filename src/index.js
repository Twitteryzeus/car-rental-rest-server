const express = require('express');
const config = require('./config');
const { sequelize } = require('./sequelize-client');
const boot = require('./boot');
const userRouter = require('./modules/user/route');

// Create Express App
const app = express();

// Configure Express App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Car Rental!' });
});

// Configure Routes
app.use('/user', userRouter);

sequelize.sync().then(async () => {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}/`);
  });

  await boot();
  return true;
}).catch(error => {
  console.log('DB SYNC ERROR', error);
})