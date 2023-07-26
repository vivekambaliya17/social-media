const express = require('express')
const bcrypt = require('bcrypt');
const passport = require('passport');
const userschema = require('../model/socialuser');
const userimg = require('../middleware/multerimg');
const userpost = require('../model/userpost');
let commentsdelete = async (req, res) => {
    return res.send("done")
    // let findpost = await userpost.findById(req.body.data)
    // let userid = req.session.passport.user 
    // if(findpost.userid.toString() === userid.toString(){

    // }) 
}
let comments =  async (req, res) => {
    let postid = req.params.id
    let comnentvalue = req.body.comnentvalue
    console.log(postid, comnentvalue);
    let findpost = await userpost.findById(postid)
    let userid = req.session.passport.user
    let Username = await userschema.findById(userid)

    if (!findpost) {
        res.send(405).send("Error");
    }

    findpost.comments.push({
        user: userid,
        comment: comnentvalue,
        username: Username.username
    })
    let commnet = await userpost.findByIdAndUpdate(postid, findpost)
    let commnetnew = await userpost.findById(postid)
    // console.log(commnet);
    res.send(commnetnew.comments)
}
let like =  async (req, res) => {
    let userid = req.session.passport.user
    let finduser = await userschema.findById(userid)
    let findpost = await userpost.findById(req.body.data)
    console.log(finduser.like);
    if (findpost.like.includes(userid)) {
        console.log("1");
        const index2 = findpost.like.indexOf(userid)
        findpost.like.splice(index2, 1);
        await userpost.findByIdAndUpdate(req.body.data, findpost)
        //
        const index = finduser.like.indexOf(req.body.data)
        
        finduser.like.splice(index, 1);
        await userschema.findByIdAndUpdate(userid, finduser)
        let findlike = await userschema.findById(userid)
        return res.json("unlike")
    }
    // if (finduser.like.includes(req.body.data)) {
        
    //     // log
    //     return res.send(findlike.like)
    // }
    else {
    console.log("2");

        finduser.like.push(req.body.data)
        findpost.like.push(userid)
        await userschema.findByIdAndUpdate(userid, finduser)
        await userpost.findByIdAndUpdate(req.body.data, findpost)
        let findlike = await userschema.findById(userid)
        // log
        return res.send(findlike.like)


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
}
module.exports ={commentsdelete ,comments , like}