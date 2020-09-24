const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist_songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistIds',
      });
      this.belongsTo(models.Song, {
        foreignKey: 'songId',
      });
    }
  }
  Playlist_songs.init({
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Playlist_songs',
  });
  return Playlist_songs;
};
