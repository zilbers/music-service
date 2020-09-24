const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        as: 'artist',
      });
      this.hasMany(models.Song, {
        foreignKey: 'albumId',
      });
      this.hasMany(models.User_album, {
        foreignKey: 'albumId',
      });
    }
  }
  Album.init({
    name: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    coverImg: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Album',
    underscored: true,
  });
  return Album;
};
