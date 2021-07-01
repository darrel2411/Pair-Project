'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      return queryInterface.addConstraint("TagPosts", {
      fields: ["TagId"],
      type: 'foreign key',
      name: 'fkey_tag_to_tagpost',
      references: {
        table: 'Tags',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint("TagPosts", "fkey_tag_to_tagpost")
  }
};
