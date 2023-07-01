const mongoose = require('mongoose');
let user = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    like:[],
    save:[]
})
let userschema = mongoose.model("userschema",user);
module.exports =userschema