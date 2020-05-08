const Sequelize = require("sequelize")

const File = require("../models/File")
const FileLabel = require("../models/FileLabel")

const {
  development: {
    database,
    dialect,
    username,
    password,
    host,
    port
  }
} = require("../config/database")

const sequelize = 
  new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${database}`);

File.init(sequelize)
FileLabel.init(sequelize)

File.associate(sequelize)