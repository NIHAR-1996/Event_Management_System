const passport = require('passport');
require('dotenv').config(); 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');



console.log(process.env.GOOGLE_CLIENT_ID,"Client_Id");
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/api/auth/google/callback',
    passReqToCallback:true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find the user based on Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        // If user doesn't exist, create a new one
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        });
        await user.save();
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
