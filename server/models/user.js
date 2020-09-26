const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User_song, {
        foreignKey: 'userId',
      });
      this.hasMany(models.User_playlist, {
        foreignKey: 'userId',
      });
      this.hasMany(models.User_artist, {
        foreignKey: 'userId',
      });
      this.hasMany(models.User_album, {
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        name: 'users_email',
        msg: 'A user with this email already exists.',
      },
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: DataTypes.BOOLEAN,
    preferences: DataTypes.JSON,
    rememberToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });

  return User;
};
