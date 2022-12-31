const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  })

  return User;
};