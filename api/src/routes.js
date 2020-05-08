const {Router} = require("express")

const routes = Router()

const FileController = require("./controllers/FileController")

routes.get("/", (req, res) => {
  return res.send("ok")
})

routes.post("/files", FileController.store)
routes.get("/files", FileController.index)

module.exports = routes