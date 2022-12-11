const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');


const QUESTION_MODEL = 'questions';

const QuestionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  question: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  order: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  lastTimeStudied: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'last_time_studied',
    defaultValue: Sequelize.NOW
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Question extends Model {
  static associate(models) {
    this.belongsTo(models.Question, {
      as: 'category'
    });
    this.hasMany(models.Answer, {
      as: 'answers',
      foreignKey: 'questionId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: QUESTION_MODEL,
      modelName: 'Question',
      timestamps: false
    }
  }
}

module.exports = { QUESTION_MODEL, QuestionSchema, Question }
