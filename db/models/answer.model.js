const { Model, DataTypes } = require('sequelize');
const { QUESTION_MODEL } = require('./question.model');


const ANSWER_MODEL = 'answer';

const AnswerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  answer: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  isCorrect: {
    allowNull: false,
    field: 'is_correct',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  questionId: {
    field: 'question_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: QUESTION_MODEL,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class Answer extends Model {
  static associate(models) {
    this.belongsTo(models.Question, {
      as: 'question'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ANSWER_MODEL,
      modelName: 'Answer',
      timestamps: false
    }
  }
}

module.exports = { ANSWER_MODEL, AnswerSchema, Answer }
