const multer = require("multer");

const store = multer.diskStorage({
    destination:"userimg",
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
const userimg = multer({
    storage:store,
}).single("img")

module.exports = userimg