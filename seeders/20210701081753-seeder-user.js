'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require('../data/user.json')
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Users', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users',null,{})
  }
};
