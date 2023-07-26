const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const userschema = require('../model/socialuser');
const userimg = require('../middleware/multerimg');
const userpost = require('../model/userpost');
let usetfind = async (req, res) => {
    let userid = req.session.passport.user
    console.log("user", userid);
    // let arr = []
    let User = await userschema.findById(userid)
    let alluser = await userschema.find()
    // console.log("alluser",alluser);
    let myuser = alluser.filter((user) => user.id != userid)
    //    console.log("myuser",myuser);

    res.send(myuser)

}
let myfollow = async (req, res) => {
    let userid = req.session.passport.user
    let alluser = await userschema.findById(userid).populate("following")
    let ALL = alluser.following
    // console.log("ALL",ALL);
    res.send(ALL)

}
let followunfollow = async (req, res) => {
    let userid = req.session.passport.user
    let usertofollow = await userschema.findById(req.body.data)
    console.log("usertofollow", usertofollow.id);
    let loginuser = await userschema.findById(userid)
    console.log("loginuser", loginuser.id);
    if (loginuser.following.includes(usertofollow._id)) {
        console.log("1");
        const index = loginuser.following.indexOf(req.body.data)
        loginuser.following.splice(index, 1);
        console.log("11");
        await userschema.findByIdAndUpdate(userid, loginuser)

        const index2 = usertofollow.followers.indexOf(userid)
        usertofollow.followers.splice(index2, 1);
        await userschema.findByIdAndUpdate(req.body.data, usertofollow)

        return res.json("unfolowing")
    }
    console.log("2");

    loginuser.following.push(usertofollow.id)
    usertofollow.followers.push(loginuser.id)
    console.log("3");
    await userschema.findByIdAndUpdate(req.body.data, usertofollow)
    await userschema.findByIdAndUpdate(userid, loginuser)
    res.json("follow")


}
let createpostGet = (req, res) => {
    res.render('post')
}
let createpost = async (req, res) => {
    let newuser = await userschema.findById(req.session.passport.user)
    let path = req.file.path
    req.body.img = path
    req.body.userimg = newuser.img
    req.body.username = newuser.username
    req.body.userid = req.session.passport.user
    console.log(req.body);
    let data = await userpost.create(req.body);
    res.send("done")
}
let editprofile = (req, res) => {
    res.render('edit')
}
let editprofilepost = async (req, res) => {
    let { username, userbio } = req.body
    // if (!username || !userbio) {
    //     res.send("All are required`")
    // }
    let userid = req.session.passport.user
    await userschema.findByIdAndUpdate(userid, req.body)
    console.log("12456");

    res.render('profilepage')
}
let mypost =async (req, res) => {
      // console.log("13");
      let userid = req.session.passport.user
      let findlike =await userpost.find()
      console.log(findlike);
      let newpost =  await findlike.filter((res)=> res.userid == userid)
      console.log(newpost);
      res.send("findlike");
  
}
module.exports = { usetfind, myfollow, followunfollow, createpost, createpostGet, editprofile, editprofilepost , mypost }