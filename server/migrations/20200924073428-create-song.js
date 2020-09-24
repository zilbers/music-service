'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      songId: {
        type: Sequelize.INTEGER
      },
      artistId: {
        type: Sequelize.INTEGER
      },
      albumId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.TIME
      },
      trackNumber: {
        type: Sequelize.STRING
      },
      lyrics: {
        type: Sequelize.STRING
      },
      youtubeLink: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      uploadedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songs');
  }
};