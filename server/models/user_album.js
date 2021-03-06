const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_album extends Model {
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
      this.belongsTo(models.Album, {
        foreignKey: 'albumId',
      });
    }
  }
  User_album.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      albumId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User_album',
      tableName: 'User_albums',
      underscored: true,
    }
  );
  return User_album;
};
