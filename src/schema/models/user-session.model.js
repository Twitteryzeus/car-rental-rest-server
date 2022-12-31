const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class UserSession extends Model { }

  UserSession.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserSession',
    tableName: 'user_session'
  })

  UserSession.associate = (models) => {
    UserSession.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id',
    })
  }

  return UserSession;
};