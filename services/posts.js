const { BlogPost, Category } = require('../models');

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

module.exports = {
  create,
};