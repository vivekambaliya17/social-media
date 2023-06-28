const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');

const { home } = require('../controller/controller')
const userschema = require('../model/socialuser')
let router = express.Router()
router.get('/', home)
router.get('/sing', (req, res)=>{
    res.render('singin')
})
router.post('/singup', async(req, res)=>{
    try {
        let password = req.body.password
        let confirmpassword = req.body.confirmpassword
        let username = req.body.username
        let usernamechack = await userschema.findOne({ username: username })
        if (!usernamechack) {
            if (password == confirmpassword) {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        req.body.password = hash
                        console.log(req.body.password);
                        let user = await userschema.create(req.body)
                        console.log(user);
                        res.render('index')
                    }
                });
            }
            else {
                res.status(444).send("Paasword not Match")
            }
        }
        else {
            return res.send("Username is allready used")
        }

    } catch (error) {
        console.log(error);
    }
})
router.post('/login',passport.authenticate('local', { failureRedirect: '/sing' }) , (req,res) => {
    // console.log(req.session.passport.user);

    res.render('index')
})
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/sigup' }), async(req,res)=>{
    try {
        console.log(req.user);
    let email = req.user.emails[0].value
    let emailfind = await userschema.findOne({email: email})
    if(emailfind){
        return res.redirect('/')
    }
    let data = await userschema.create({email:email})
    return res.redirect('/')
    } catch (error) {
        console.log(error);
    }
    
});

module.exports =router