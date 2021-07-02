'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })
      Post.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      Post.belongsToMany(models.Tag, {
        through: models.TagPost
      })
    }

    static getClothes() {
      return Post
        .findAll({
          where: {
            CategoryId: 1
          },
          order: [
            ['updatedAt', 'DESC']
          ]
        })
    }

    static getCosmetics() {
      return Post
        .findAll({
          where: {
            CategoryId: 2
          },
          order: [
            ['updatedAt', 'DESC']
          ]
        })
    }

    cutText() {
      return this.text.substring(0, 10)
    }

  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "must input title"
        }
      }
    },
    date: DataTypes.DATE,
    text: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "must input descriptions"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'must choose a category'
        }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'must input url format'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (post, options) => {
        post.title = post.title.toUpperCase()
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};