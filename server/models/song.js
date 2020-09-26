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
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
      });
      this.hasMany(models.Playlist_song, {
        foreignKey: 'songId',
      });
      this.hasMany(models.User_song, {
        foreignKey: 'artistId',
      });
    }
  }
  Song.init({
    name: { type: DataTypes.STRING, allowNull: false },
    albumId: { type: DataTypes.INTEGER, allowNull: false },
    artistId: { type: DataTypes.INTEGER, allowNull: false },
    length: DataTypes.TIME,
    trackNumber: DataTypes.INTEGER,
    lyrics: DataTypes.STRING,
    youtubeLink: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Song',
    underscored: true,
  });
  return Song;
};
