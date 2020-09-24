const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SongsInAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId',
      });
    }
  }
  SongsInAlbum.init({
    albumId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SongsInAlbum',
  });
  return SongsInAlbum;
};
