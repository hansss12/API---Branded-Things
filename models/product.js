'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: 'authorId', as: 'authors' })
      Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'categories' })
      Product.hasMany(models.Bookmark)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cannot empty'
        },
        notEmpty: {
          msg: 'Name cannot empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Descripton cannot empty'
        },
        notEmpty: {
          msg: 'Descripton cannot empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot empty'
        },
        notEmpty: {
          msg: 'Price cannot empty'
        },
        min: {
          args: 10,
          msg: 'Minimum price is 10$'
        }
      }
    },
    stock: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};