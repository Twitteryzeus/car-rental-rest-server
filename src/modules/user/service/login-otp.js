const Sequelize = require('sequelize');
const { sequelize, models } = require('../../../sequelize-client');
const { isEmpty } = require('lodash');
const randomString = require('randomstring');
const moment = require('moment');

const loginOTP = async (req, res) => {
  let transaction;
  try {
    const { User: UserModel } = models;
    const { body } = req;
    transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });

    if (isEmpty(body)) throw new Error(`Body can't be empty!`);

    // Check If User Already Exists
    const _userInstance = await UserModel.findOne({
      where: {
        phoneNo: body.phoneNo
      },
      raw: true,
      attributes: ['id']
    });

    const userModelInput = {
      ...body,
      otp: randomString.generate({ length: 6, charset: 'numeric' }),
      otpExpiry: moment().add(15, 'minute')
    };

    if (!_userInstance) {
      await UserModel.create(userModelInput, { transaction });
    } else {
      await UserModel.update(userModelInput, {
        where: { id: _userInstance.id },
        transaction
      });
    }

    await transaction.commit();
    res.status(200).json({ otp: userModelInput.otp });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log('ERROR > USER > LOGIN OTP', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginOTP;