const {Model, Sequelize, DataTypes} = require("sequelize")

class File extends Model {
  /**
   * @param {Sequelize} sequelize 
   */
  static init(sequelize){
    sequelize.models.File = this
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      }
    }, {
      sequelize,
      tableName: "files"
    })
  }

  /**
   * @param {Sequelize} sequelize 
   */
  static associate(sequelize){
    super.hasMany(sequelize.models.FileLabel,
      { foreignKey: 'file_id', as: 'labels' })
  }
}

module.exports = File