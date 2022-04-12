const { User } = require('../models');

const create = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new Error();
  }
  const { dataValues } = await User.create({ displayName, email, password, image });
  return dataValues;
};

module.exports = {
  create,
};