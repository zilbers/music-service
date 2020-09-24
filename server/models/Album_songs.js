const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Album_songs extends Model {
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
  Album_songs.init({
    albumId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Album_songss',
  });
  return Album_songs;
};
