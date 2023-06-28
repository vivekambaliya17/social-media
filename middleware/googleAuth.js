const passport = require('passport');
require('dotenv').config()
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleauth = (passport)=>{
    try {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.callbackURL
        },
        function(accessToken, refreshToken, profile, cb) {
          cb(null ,profile)
        }
      ));
      passport.serializeUser((user,done)=>{
          return done(null ,user)
      })
      
      passport.deserializeUser((user,done)=>{
        return done(null ,user)
      })  
    } catch (error) {
        console.log(error);
    }
  
}

module.exports =googleauth