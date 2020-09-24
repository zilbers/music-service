module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Album_songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      albumId: {
        type: Sequelize.INTEGER,
      },
      songId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Album_songs');
  },
};
