'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint("TagPosts", {
      fields: ["PostId"],
      type: 'foreign key',
      name: 'fkey_post_to_tagpost',
      references: {
        table: 'Posts',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint("TagPosts", "fkey_post_to_tagpost")
  }
};
