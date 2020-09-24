'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  playlist.init({
    playlistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    uploadedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'playlist',
  });
  return playlist;
};