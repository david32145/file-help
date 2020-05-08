const { QueryInterface, DataTypes } = require("sequelize")

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: (queryInterface) => {
    return queryInterface.createTable("files", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("files");
  }
};
