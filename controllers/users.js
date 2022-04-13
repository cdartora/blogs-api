const jwt = require('jsonwebtoken');
const services = require('../services/users');
require('dotenv').config();

const secret = process.env.SECRET;

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  try {
    const newUser = await services.create(displayName, email, password, image);

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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await services.authenticateUser(email, password);
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ data: user }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).send({ message: 'Invalid fields' });
  }
};

const getAll = async (req, res) => {
  try {
    const allUsers = await services.getAll();
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(500).send({ message: 'Somethin went wrong on the db.' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await services.getUser(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send({ message: 'User does not exist' });
  }
};

module.exports = {
  create,
  login,
  getAll,
  getById,
};