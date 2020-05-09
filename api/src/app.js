require("dotenv/config")
const express = require("express")
const routes = require("./routes")
const path = require("path")
require("./database")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)


app.use("/download", express.static(path.resolve(__dirname, "uploads")))

module.exports = app