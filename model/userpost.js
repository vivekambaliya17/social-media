const mongoose = require('mongoose')

let post = mongoose.Schema({
    img: String,
    caption: String,
    username: String,
    userimg: String,
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "userschema" },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "userschema"
            },
            comment: {
                type: String,
            },
            username: {
                type: String,
            }
        },

    ],
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userschema"
        }
    ]
})
let userpost = mongoose.model('userpost', post)
module.exports = userpost