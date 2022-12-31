const createAdminUser = require('./user');

module.exports = async () => {
  await createAdminUser();
};