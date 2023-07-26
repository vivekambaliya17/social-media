const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const userschema = require('../model/socialuser');
const userimg = require('../middleware/multerimg');
const userpost = require('../model/userpost');
const { home, profile, findlike, allpost, myUser, Userbio, userbioget, GoogleAuth, singUp, profilepage } = require('../controller/controller')
const auth = require('../middleware/auth');
const uploadIMG = require('../middleware/multer');
const { usetfind, myfollow, followunfollow, createpost, createpostGet, editprofile, editprofilepost, mypost } = require('../controller/user');
const { commentsdelete, comments, like } = require('../controller/post');
let router = express.Router()
router.get('/', auth, home)
router.get('/sing', (req, res) => {
    res.render('singin')
})
router.post('/singup', singUp)
router.post('/login', passport.authenticate('local', { failureRedirect: '/sing' }), (req, res) => {
    // console.log(req.session.passport.user);

    res.render('index')
})
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/sigup' }), GoogleAuth);
router.get('/createpost', createpostGet)
router.post('/createpost', uploadIMG, createpost)

// user img resevie
router.get('/userbio', userbioget)
router.post('/userbio', userimg, Userbio)
// router.get('/allpost', async (req, res) => {
//     let allPost = await userpost.find();
//     res.send(allPost)
// })
router.get('/myUser', myUser)
router.get('/allpost', allpost)
// like button
router.post('/like', like)

router.post('/comments/:id', comments)
router.post('/commentsdelete', commentsdelete)




//   Profile page
router.get('/profile', profile)
router.get('/profilepage', profilepage)
router.get('/findlike', findlike)
router.get('/mypost', mypost)


// follow and unfollow
router.post('/followunfollow', followunfollow)
// user sugestion find
router.get('/userfind', usetfind)
router.get('/myfollow', myfollow)

// Edit Profile
router.get('/editprofile', editprofile)
router.post('/editprofile', editprofilepost)


module.exports = router