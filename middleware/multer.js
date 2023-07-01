const multer = require("multer");

const store = multer.diskStorage({
    destination:"userpost",
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
const uploadIMG = multer({
    storage:store,
}).single("img")

module.exports = uploadIMG