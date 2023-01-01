const Sequelize = require('sequelize');
const { sequelize, models } = require('../../../sequelize-client');
const { isEmpty } = require('lodash');
const moment = require('moment');

const verifyOTP = async (req, res) => {
  let transaction;
  try {
    const { User: UserModel, UserSession: UserSessionModel } = models;
    const { body } = req;
    transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });

    if (isEmpty(body)) throw new Error(`Body can't be empty!`);

    // Check If OTP is correct
    const _userInstance = await UserModel.findOne({
      where: {
        otp: body.otp,
        otpExpiry: {
          [Sequelize.Op.gte]: moment()
        }
      }
    });

    if(!_userInstance) throw new Error('User not found!'); 

    await transaction.commit();
    res.status(200).json({ data: _userInstance });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log('ERROR > USER > VERIFY OTP', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyOTP;