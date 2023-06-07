'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Category.belongsToMany(models.User, { through: models.Product, foreignKey: 'categoryId' })
      Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'categories' })
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category name cannot empty'
        },
        notEmpty: {
          msg: 'Category name cannot empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};