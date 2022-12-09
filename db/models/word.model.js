const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const WORD_TABLE = 'words';

const WordSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  word: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING
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
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Word extends Model {
  static associate(models) {
    // associate
    this.belongsTo(models.Category,{
      as: 'category'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WORD_TABLE,
      modelName: 'Word',
      timestamps: false
    }
  }
}

module.exports = { WORD_TABLE,  WordSchema,  Word }
