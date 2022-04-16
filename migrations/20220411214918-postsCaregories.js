'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('PostsCategories', {
       postId: {
         type: Sequelize.INTEGER,
         references: {
           model: 'BlogPosts',
           key: 'id',
         },
         onDelete: 'CASCADE',
       },
       categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
       },
     });
  },

  down: async (queryInterface, _Sequelize) => {

    await queryInterface.dropTable('PostCategories');

  }
};
