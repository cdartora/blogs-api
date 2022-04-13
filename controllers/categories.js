const { Category } = require('../models');

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) res.status(400).send({ message: '"name" is required' });

  try {
    const newCategory = await Category.create({ name });
  
    res.status(201).send(newCategory);
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = {
  create,
};