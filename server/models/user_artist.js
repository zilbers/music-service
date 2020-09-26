const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_artist extends Model {
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
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  User_artist.init({
    userId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User_artist',
    underscored: true,
  });
  return User_artist;
};