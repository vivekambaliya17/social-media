const bcrypt = require('bcrypt');
const userschema = require('../model/socialuser');
const loclalstrtegy =require('passport-local').Strategy
let localAuth =(passport)=>{
    passport.use(new loclalstrtegy( async(username, password, done)=>{
        // console.log("1");
        try {
            let user = await userschema.findOne({username:username})
            // console.log(user);
        if(!user){
            return done(null, false)
        }
        let bcryptpassword = user.password
        let bcryptUser = await bcrypt.compare(password, bcryptpassword)
        if(!bcryptUser){
            return done(null, false)
        }
        return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    }))
    passport.serializeUser((User, done)=> {
        return done(null, User.id); 
     });
     
     passport.deserializeUser((id, done)=> {
         let User = userschema.findById(id)
         return done(null, User);
     });
}
module.exports = localAuth