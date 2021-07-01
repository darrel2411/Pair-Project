'use strict';
const hashPass = require('../helper/bcryptpass')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'UserId'
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
          user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};