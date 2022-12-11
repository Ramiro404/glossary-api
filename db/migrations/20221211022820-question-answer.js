'use strict';

const { QUESTION_MODEL } = require('../models/question.model');
const { CATEGORY_TABLE } = require('../models/question.model');
const { ANSWER_MODEL } = require('../models/answer.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(QUESTION_MODEL, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      order: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      lastTimeStudied: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'last_time_studied',
        defaultValue: Sequelize.NOW
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable(ANSWER_MODEL, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answer: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isCorrect: {
        allowNull: false,
        field: 'is_correct',
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      order: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      questionId: {
        field: 'question_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: QUESTION_MODEL,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ANSWER_MODEL);
    await queryInterface.dropTable(QUESTION_MODEL);
  }
};
