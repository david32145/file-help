const app = require("./app")

const PORT = process.env.PORT || 3333

app.listen(PORT, function(err) {
  if(!!err){
    console.log("An error ocurred")
    console.error(err)
    return
  }
  console.log("Sever is running")
})