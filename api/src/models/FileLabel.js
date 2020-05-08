const {Model, Sequelize, DataTypes} = require("sequelize")

class FileLabel extends Model {
  /**
   * @param {Sequelize} sequelize 
   */
  static init(sequelize){
    sequelize.models.FileLabel = this
    super.init({
      file_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
    }, {
      sequelize,
      tableName: "file_labels"
    })
  }

  /**
   * @param {Sequelize} sequelize 
   */
  static associate(sequelize){
    super.belongsTo(sequelize.models.File,
      { foreignKey: 'file_id', as: 'file' })
  }
}

module.exports = FileLabel