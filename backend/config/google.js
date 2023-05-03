const { json } = require("body-parser");
const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      console.log("user profile is: ", profile);
      const source = "google"


      await User.findOne({ email: email }).then((user) => {

      
          if (user) {
            console.log("user already exist");
            return done(null, user);
          }
          else {
        try {
          //check user email exist or not 
          const newUser = new User({
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: "user",
            source: source
          });
          newUser.save();
          return done(null, newUser,{
            message: "user created"
          });
        } catch (err) {
          console.log(err)
          return err;
        }
      }
      });


    }
  )
);