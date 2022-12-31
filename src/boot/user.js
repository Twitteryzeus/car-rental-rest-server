const data = require('./data/user');
const Sequelize = require('sequelize');
const { sequelize, models } = require('../sequelize-client');

const createAdminUser = async () => {
  let transaction;
  try {
    const { User: UserModel } = models;
    transaction = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED });

    // Check If Admin User Already exists or not.
    const count = await UserModel.count({
      where: {
        phoneNo: data.phoneNo
      }
    });

    if (!count) {
      await UserModel.create(data, { transaction });
    }

    await transaction.commit();
    return true;
  } catch (error) {
    if(transaction) {
      await transaction.rollback();
    }
    console.log('ERROR > BOOTSCRIPT > CREATE ADMIN USER', error);
  }
};

module.exports = createAdminUser;