const Sequelize = require('sequelize');
const { sequelize, models } = require('../../../sequelize-client');

const loginOTP = async (req, res) => {
  try {
    const { User: UserModel } = models;
    const { body } = req;
    transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });

    res.status(200).json({ otp: 123456 });
  } catch (error) {
    console.log('ERROR > USER > LOGIN OTP', error);
  }
};

module.exports = loginOTP;