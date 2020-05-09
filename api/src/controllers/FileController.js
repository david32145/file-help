const { Request, Response } = require("express")
const { singleUpload } = require("../services/UploadService")
const FileModel = require("../models/File")
const FileLabelModel = require("../models/FileLabel")
const { Op, Sequelize } = require("sequelize")

module.exports = {
  /**
   * 
   * @param {Request} req 
   * @param {Response} res 
   */
  async store(req, res) {
    const file_name = await singleUpload("file", req, res)
    const data = req.body
    const file = await FileModel.create({
      title: data.title,
      description: data.description,
      file_name
    })
    let labels = []
    if (data.labels && data.labels.length > 0) {
      labels = data.labels.split(",").map(label => ({
        file_id: file.id, value: label.trim()
      }))

      await FileLabelModel.bulkCreate(labels)
    }
    return res.json({
      ...file.toJSON(),
      labels
    })
  },

  async destroy(req, res) {
    const id = req.params.id
    await FileModel.destroy({
      where: {
        id
      }
    })
    return res.status(200).json()
  },

  async index(req, res) {
    const query = req.query.query
    let filter = {}
    if (!!query) {
      filter.root = {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${query}%`
            }
          },
          {
            description: {
              [Op.like]: `%${query}%`
            }
          },
          {
            "$labels.value$": {
              [Op.like]: `%${query}`
            }
          }
        ]
      }
    }
    const files = await FileModel.findAll({
      include: [{
        attributes: ["value"],
        association: "labels",
        required: false,
        
      }],
      where: filter.root
    })
    return res.json(files)
  }
}