const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const userschema = require('../model/socialuser');
const userimg = require('../middleware/multerimg');
const userpost = require('../model/userpost');
let home = (req,res)=>{
    res.render('index')
}
let profile = (req, res) => {
    let userid = req.session.passport.user
    console.log(userid);
    res.render('profile')
}
let profilepage = (req, res) => {
    let userid = req.session.passport.user
    console.log(userid);
    res.render('profilepage')
}
let findlike =  async (req, res) => {
    // console.log("13");
    let userid = req.session.passport.user
    let findlike = await userschema.findById(userid).populate("like")
    // console.log(findlike);
    res.send(findlike.like);

}
let allpost = async (req, res) => {
    try {
        let allPost = await userpost.find()
        res.send(allPost)

    } catch (error) {
        console.log(error);
    }
}
let myUser = async (req, res) => {
    try {
        let myUser = await userschema.findById(req.session.passport.user)
        res.send(myUser)

    } catch (error) {
        console.log(error);
    }
}
let Userbio = async (req, res) => {
    let path = req.file.path
    req.body.img = path
    let user = await userschema.findByIdAndUpdate(req.session.passport.user, req.body)
    res.render('index')
}
let userbioget = (req, res) => {
    // console.log(req.session);
    res.render('userbio')
}
let GoogleAuth = async (req, res) => {
    try {
        console.log(req.user);
        let email = req.user.emails[0].value
        let emailfind = await userschema.findOne({ email: email })
        if (emailfind) {
            return res.redirect('/')
        }
        let data = await userschema.create({ email: email })
        return res.redirect('/')
    } catch (error) {
        console.log(error);
    }

}
let singUp =  async (req, res) => {
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
                        req.session.passport = { user: user._id };
                        res.redirect('/userbio')
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
}
module.exports = { home ,profile ,findlike , allpost , myUser , Userbio , userbioget ,GoogleAuth , singUp , profilepage}