const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_playlist extends Model {
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
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  User_playlist.init({
    userId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User_playlist',
    underscored: true,
  });
  return User_playlist;
};
