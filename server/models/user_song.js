const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_song extends Model {
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
      this.belongsTo(models.Song, {
        foreignKey: 'songId',
      });
    }
  }
  User_song.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      songId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User_song',
      tableName: 'User_songs',
      underscored: true,
    }
  );
  return User_song;
};
