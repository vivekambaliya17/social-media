const express = require('express');
const connection = require('./config/connection');
const router = require('./router/router');
let cookieParser = require('cookie-parser')
let  session = require('express-session')
const passport = require('passport');
const localAuth = require('./middleware/passAuth');
const googleauth = require('./middleware/googleAuth');
localAuth(passport)
googleauth(passport)
let app = express();

app.use(session({secret:'social'}))
app.use(passport.initialize());
app.use(passport.session()); 
app.use(cookieParser())
const bcrypt = require('bcrypt');
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+'/public'));
app.use(express.static((__dirname)));

app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use('/',router)
app.listen(9090,()=>{
    console.log(`localhost:9090`);
// console.log(process.env.GOOGLE_CLIENT_ID);

    connection()
})