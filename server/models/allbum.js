/* eslint-disable lines-around-directive */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class allbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  allbum.init({
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    uploadedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'allbum',
  });
  return allbum;
};
