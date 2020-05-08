const { Request, Response } = require("express")
const { singleUpload } = require("../services/UploadService")
const FileModel = require("../models/File")
const FileLabelModel = require("../models/FileLabel")

module.exports = {
  /**
   * 
   * @param {Request} req 
   * @param {Response} res 
   */
  async store(req, res) {
    const file_path = await singleUpload("file", req, res)
    console.log(file_path)
    const data = req.body
    const file = await FileModel.create({
      title: data.title,
      description: data.description,
      file_path
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

  async index(req, res) {
    const files = await FileModel.findAll({
      include: [{
        attributes: ["value"],
        association: "labels",
        all: true
      }]
    })
    return res.json(files)
  }
}