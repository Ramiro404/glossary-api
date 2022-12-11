const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Category extends Model {
  static associate(models) {
    // associate
    this.belongsTo(models.User, {
      as: 'user'
    });

    this.hasMany(models.Word, {
      as: 'words',
      foreignKey: 'categoryId'
    })
    this.hasMany(models.Question, {
      as: 'questions',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = {  CATEGORY_TABLE,  CategorySchema, Category }
