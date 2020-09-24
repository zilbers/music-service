const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserLikedSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Song, {
        foreignKey: 'songId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  UserLikedSong.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserLikedSong',
  });
  return UserLikedSong;
};
