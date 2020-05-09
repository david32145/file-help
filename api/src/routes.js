const {Router} = require("express")

const routes = Router()

const FileController = require("./controllers/FileController")

routes.post("/files", FileController.store)
routes.get("/files", FileController.index)
routes.delete("/files/:id", FileController.destroy)

module.exports = routes