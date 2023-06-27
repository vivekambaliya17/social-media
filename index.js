const express = require('express');
const connection = require('./config/connection');
const router = require('./router/router');
let app = express();
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use('/',router)
app.listen(9090,()=>{
    console.log(`localhost:9090`);
    connection()
})