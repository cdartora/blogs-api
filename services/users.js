const { User } = require('../models');

const create = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });

  if (user) throw new Error('User already exists');

  const { dataValues } = await User.create({ displayName, email, password, image });
  
  return dataValues;
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user.dataValues) throw new Error('User doesn\'t exists.');
  return user.dataValues;
};

module.exports = {
  create,
  authenticateUser,
};