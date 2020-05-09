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
      file_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uri: DataTypes.STRING
    }, {
      hooks: {
        beforeCreate: (file) => {
          file.uri = `${process.env.SERVER_URI}/download/${file.file_name}`
        }
      },
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