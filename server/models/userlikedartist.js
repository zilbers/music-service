const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserLikedArtist extends Model {
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
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
      });
    }
  }
  UserLikedArtist.init({
    userId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserLikedArtist',
  });
  return UserLikedArtist;
};
