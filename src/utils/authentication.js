const jwt = require('jsonwebtoken');
const config = require('../config');

// Method TO Generate Token
const generateToken = userId => new Promise((resolve, reject) => {
  jwt.sign({ userId },
    config.jwt.secret,
    { expiresIn: config.jwt.lifeTime },
    (error, token) => {
      if (error) reject(error);
      resolve(token);
      return true;
    });
});

// Method To Decode Token
const getDecodedToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, config.jwt.secret, (error, decodedToken) => {
    if(error) reject(error);
    resolve(decodedToken);
    return true;
  });
});

module.exports = {
  generateToken,
  getDecodedToken
};