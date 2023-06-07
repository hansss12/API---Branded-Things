'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/category.json'))
    const newData = data.map((el) => {
      if (el.id) {
        delete el.id
      }
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })
    queryInterface.bulkInsert('Categories', newData, {})
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Categories', null, {});
  }
};
