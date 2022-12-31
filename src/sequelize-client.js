const path = require('path');

const glob = require('glob');
const Sequelize = require('sequelize');

const config = require('./config/');
const env = config.env || 'development';
const sequelizeConfig = require('./schema/config')[env];

const sequelize = new Sequelize(
  Object.assign(sequelizeConfig, {
    logging: false,
    // Specify options, which are used when sequelize.define is called.
    define: {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  }),
);

glob.sync('**/*.model.js')
  .forEach(file => {
    require(path.join(__dirname, '../', file))(sequelize, Sequelize.DataTypes);
  });

const { models } = sequelize;

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };