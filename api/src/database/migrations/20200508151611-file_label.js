const { QueryInterface, DataTypes } = require("sequelize")

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   */
  up: async (queryInterface) => {
    await queryInterface.createTable("file_labels", {
      file_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'files'
          },
          key: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false
      },
      value: {
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
    await queryInterface.addConstraint("file_labels", ["file_id", "value"], {
      type: "primary key",
      name: "file_id_value_primary_key"
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("file_labels");
  }
};