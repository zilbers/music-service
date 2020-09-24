const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Album, {
        foreignKey: 'albumId',
        as: 'album',
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        as: 'artist',
      });
      this.hasMany(models.Playlist_song, {
        foreignKey: 'artistId',
      });
      this.hasMany(models.User_song, {
        foreignKey: 'artistId',
      });
    }
  }
  Song.init({
    name: DataTypes.STRING,
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    length: DataTypes.TIME,
    trackNumber: DataTypes.INTEGER,
    lyrics: DataTypes.STRING,
    youtubeLink: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Song',
    underscored: true,
  });
  return Song;
};
