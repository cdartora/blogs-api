module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostCategory', {},
  { timestamps: false, tableName: 'PostsCategories' });
  
  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'post_id',
      otherKey: 'id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostsCategories,
      foreignKey: 'category_id',
      otherKey: 'id',
    });
  };

  return PostsCategories;
};