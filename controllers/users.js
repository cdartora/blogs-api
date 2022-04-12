const jwt = require('jsonwebtoken');
const services = require('../services/users');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const secret = 'ayecaptain66';
  
  try {
    const newUser = services.create(displayName, email, password, image);
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ data: newUser }, secret, jwtConfig);

    res.status(201).json({ token });
  } catch (err) {
    res.status(409).send({ message: 'User already registered' });
  }
};

module.exports = {
  create,
};