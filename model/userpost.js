const mongoose = require('mongoose')

let post = mongoose.Schema({
    img:String,
    caption:String,
    username:String,
    userimg:String,
    userid:{type: mongoose.Schema.Types.ObjectId , ref:"userschema"},
    comment:[]
})
let userpost = mongoose.model('userpost',post)
module.exports = userpost