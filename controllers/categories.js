const { Category } = require('../models');

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).send({ message: '"name" is required' });

  try {
    const newCategory = await Category.create({ name });
  
    return res.status(201).send(newCategory);
  } catch (err) {
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getAll = async (req, res) => {
  try {
    const allCategories = await Category.findAll();

    res.status(200).send(allCategories);
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = {
  create,
  getAll,
};