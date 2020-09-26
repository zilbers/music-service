const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Playlist_song, {
        foreignKey: 'playlistId',
      });
      this.hasMany(models.User_playlist, {
        foreignKey: 'playlistId',
      });
    }
  }
  Playlist.init({
    name: { type: DataTypes.STRING, allowNull: false },
    coverImg: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Playlist',
    underscored: true,
  });
  return Playlist;
};
