const { BlogPost, Category, User } = require('../models');

const create = async (userId, title, content, categoryIds) => {
  const promises = categoryIds.map((id) => Category.findOne({ where: { id } }));

  const categories = await Promise.all(promises);

  const categoriesExists = categories.every((category) => category); 
  
  if (!categoriesExists) throw new Error('Category doesn\'t exist.');

  const newPost = await BlogPost.create({
    title,
    content,
    userId,
    categoryIds,
  });

  newPost.addCategory(categoryIds);

  return newPost.dataValues;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
      attributes: { include: ['id', 'name'], exclude: ['PostCategory'] },
    }],
  });

  // https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
  return posts.map((post) => post.get({ plain: true }));
};

const getPost = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
      attributes: { include: ['id', 'name'], exclude: ['PostCategory'] },
    }],
  });

  if (!post) throw new Error('Post doesn\'t exist');

  // https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
  return post.get({ plain: true });
};

const update = async (id, title, content) => {
  await BlogPost.update(
    { title, content },
    {
      where: { id },
    },
  );
};

const destroy = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) throw new Error('Post does not exist');
  if (post.userId !== userId) throw new Error('Unauthorized user');
  post.destroy();
};

module.exports = {
  create,
  getAll,
  getPost,
  update,
  destroy,
};