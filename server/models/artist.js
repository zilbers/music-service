'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  artist.init({
    artistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    uploadedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};