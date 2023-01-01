require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    lifeTime: process.env.JWT_LIFE_TIME
  }
};