const services = require('../services/posts');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  try {
    const newPost = await services.create(id, title, content, categoryIds);
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send({ message: '"categoryIds" not found' });
  }
};

module.exports = {
  create,
};