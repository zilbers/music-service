const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Song);
    }
  }
  Artist.init({
    name: DataTypes.STRING,
    coverImg: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
