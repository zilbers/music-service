const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Album, {
        foreignKey: 'artistId',
      });
      this.hasMany(models.Song, {
        foreignKey: 'artistId',
      });
      this.hasMany(models.User_artist, {
        foreignKey: 'artistId',
      });
    }
  }
  Artist.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      coverImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Artist',
      tableName: 'Artists',
      underscored: true,
    }
  );
  return Artist;
};
