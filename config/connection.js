const mongoose = require('mongoose')

let connection = async()=>{
    try {
        console.log("connecting");
        await mongoose.connect("mongodb+srv://ambaliyavivek17:social@cluster0.rtj3vo8.mongodb.net/?retryWrites=true&w=majority")
        console.log("connect");
    } catch (error) {
        console.log(error);
    }
}
module.exports =connection