const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist_song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId',
      });
      this.belongsTo(models.Song, {
        foreignKey: 'songId',
      });
    }
  }
  Playlist_song.init(
    {
      playlistId: { type: DataTypes.INTEGER, allowNull: false },
      songId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Playlist_song',
      tableName: 'Playlist_songs',
      underscored: true,
    }
  );
  return Playlist_song;
};
