'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("Orders", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "Products",
          key: "id"
        },

        onDelete: "CASCADE"
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable("Orders");
  }

};