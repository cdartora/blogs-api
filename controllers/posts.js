const services = require('../services/posts');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  try {
    const newPost = await services.create(id, title, content, categoryIds);
    return res.status(201).send(newPost);
  } catch (err) {
    return res.status(400).send({ message: '"categoryIds" not found' });
  }
};

const getAll = async (_req, res) => {
  try {
    const posts = await services.getAll();
    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send({ message: 'something went wrong' });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await services.getPost(id);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(404).send({ message: 'Post does not exist' });
  }
};

module.exports = {
  create,
  getAll,
  getPost,
};