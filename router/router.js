const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const { home } = require('../controller/controller')
const userschema = require('../model/socialuser');
const auth = require('../middleware/auth');
const uploadIMG = require('../middleware/multer');
const userpost = require('../model/userpost');
const userimg = require('../middleware/multerimg');
let router = express.Router()
router.get('/', auth, home)
router.get('/sing', (req, res) => {
    res.render('singin')
})
router.post('/singup', async (req, res) => {
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
})
router.post('/login', passport.authenticate('local', { failureRedirect: '/sing' }), (req, res) => {
    // console.log(req.session.passport.user);

    res.render('index')
})
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/sigup' }), async (req, res) => {
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

});
router.get('/createpost', (req, res) => {
    res.render('post')
})
router.post('/createpost', uploadIMG, async (req, res) => {
    let newuser = await userschema.findById(req.session.passport.user)
    let path = req.file.path
    req.body.img = path
    req.body.userimg = newuser.img
    req.body.username = newuser.username
    req.body.userid = req.session.passport.user
    console.log(req.body);
    let data = await userpost.create(req.body);
    res.send("done")
})
router.get('/profile', (req, res) => {
    let userid = req.session.passport.user
console.log(userid);
    res.render('profile')
})
// user img resevie
router.get('/userbio', (req, res) => {
    // console.log(req.session);
    res.render('userbio')
})
router.post('/userbio', userimg, async (req, res) => {
    let path = req.file.path
    req.body.img = path
    let user = await userschema.findByIdAndUpdate(req.session.passport.user, req.body)
    res.render('index')
})
router.get('/allpost', async (req, res) => {
    let allPost = await userpost.find()
    res.send(allPost)
})
router.get('/myUser', async (req, res) => {
    try {
        let myUser = await userschema.findById(req.session.passport.user)
        res.send(myUser)

    } catch (error) {
        console.log(error);
    }
})
router.get('/allpost', async (req, res) => {
    try {
        let allPost = await userpost.find()
        res.send(allPost)

    } catch (error) {
        console.log(error);
    }
})
// like button
router.post('/like', async (req, res) => {
    let userid = req.session.passport.user
    let finduser = await userschema.findById(userid)
    let findpost = await userpost.findById(req.body.data)
    console.log(finduser.like);
    if(finduser.like.includes(req.body.data)){
        const index = finduser.like.indexOf(req.body.data)
        finduser.like.splice(index, 1);
        await userschema.findByIdAndUpdate(userid ,finduser)
        return res.send("done unlike")

    }
    else{
        finduser.like.push(req.body.data)
        await userschema.findByIdAndUpdate(userid ,finduser)
        return res.send("done like")

        
    }
    // let userexist = false
    // console.log(req.body.data);
    // console.log("not found",finduser);
    // finduser.like.map(async(ele,index)=>{
    //     if(String(ele._id) == String(req.body.data)){
    //         // console.log(ele);
    //         finduser.like.splice(index,1)
    //         console.log("1" ,  index);
    //         await userschema.findByIdAndUpdate(userid , finduser)

    //     }
    //     else if(String(ele._id) !== String(req.body.data)){
    //         finduser.like.push(findpost)
    //         console.log("2");
    //         await userschema.findByIdAndUpdate(userid , finduser)
    //     }
       
    // })
     res.send("success")
    // console.log("finduser",finduser);
    // console.log(finduser.like[0]._id);
    
    // if(posts == []){
    //     console.log("1");
    //     console.log(posts);
    //     finduser.like.push(findpost)
    // await userschema.findByIdAndUpdate(userid ,finduser )
    // }
    // console.log("second", posts);
})
router.get('/findlike', async(req, res) => {
    console.log("13");
    
    let userid = req.session.passport.user
    let findlike = await userschema.findById(userid).populate("like")
    // console.log(findlike);
    res.send(findlike.like);

})
router.post('/comments',(req,res)=>{
    res.send("done comment")
})
module.exports = router