const mongoose = require('mongoose');
let user = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    img:String,
    userbio:String,
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userpost"
        },
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userschema"
        },
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userschema"
        },
    ],
    save:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userpost"
        },
    ]
})
let userschema = mongoose.model("userschema",user);
module.exports =userschema