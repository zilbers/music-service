const { Model } = require('sequelize');

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
  User_artist.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      artistId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User_artist',
      tableName: 'User_artists',
      underscored: true,
    }
  );
  return User_artist;
};
