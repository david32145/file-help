const multer = require("multer")
const {v4: uuid} = require("uuid")
const config = require("../config/multer")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.dest)
  },
  filename: function(req, file, cb) {
    const fileName = `${uuid()}-${file.originalname}`
    req.fileName = fileName
    cb(null, fileName)
  }
})

async function singleUpload(field, req, res){
  const handler = multer({storage}).single(field)
  return new Promise((resolve, reject) => {
    handler(req, res, function(error) {
      if(!!error){
        reject(err)
        return
      }
      resolve(req.fileName)
    })
  })
}

exports.singleUpload = singleUpload