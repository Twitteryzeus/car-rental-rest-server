const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('ADMIN','USER'),
      defaultValue: 'USER'
    },
    opt: {
      type: DataTypes.INTEGER
    },
    optExpiry: {
      type: DataTypes.DATE
    },
    geoLocation: {
      type: DataTypes.GEOGRAPHY('POINT')
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  })

  User.associate = (models) => {
    User.hasMany(models.UserSession, {
      as: 'userSessions',
      foreignKey: 'userId',
      sourceKey: 'id',
      constraints: false,
      onDelete: 'RESTRICT',
      hooks: true
    })
  }

  return User;
};