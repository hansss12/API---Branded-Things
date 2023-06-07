'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsToMany(models.Category, { through: models.Product, foreignKey: 'authorId' })
      User.hasMany(models.Product, { foreignKey: 'authorId', as: 'authors' })
      User.hasMany(models.Bookmark)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username cannot empty'
        },
        notEmpty: {
          msg: 'Username cannot empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email has taken'
      },
      validate: {
        notNull: {
          msg: 'Email cannot empty'
        },
        notEmpty: {
          msg: 'Email cannot empty'
        },
        isEmail: {
          msg: 'Email format wrong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot empty'
        },
        notEmpty: {
          msg: 'Password cannot empty'
        },
        len: {
          args: 5,
          msg: 'Minimum Password Characters is 5'
        }
      }
    },
    role: DataTypes.STRING, // admin / staff
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        user.role = 'admin'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};