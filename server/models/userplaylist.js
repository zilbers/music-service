const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPlaylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId',
      });
    }
  }
  UserPlaylist.init({
    userId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserPlaylist',
  });
  return UserPlaylist;
};
