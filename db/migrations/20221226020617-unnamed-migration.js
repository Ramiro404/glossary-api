'use strict';

const { ANSWER_MODEL } = require('../models/answer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.changeColumn(ANSWER_MODEL, 'questionId', {
        allowNull: true,
        onDelete: 'CASCADE'
      });
    } catch (error) {
      console.log(error);
    }

  },

  async down(queryInterface) {
    await queryInterface.changeColumn(ANSWER_MODEL, 'questionId', {
      allowNull: false,
      onDelete: 'SET NULL'
    })
  }
};
