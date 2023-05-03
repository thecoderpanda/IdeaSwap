/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
//Load user model for email exist checking
const keys = require("../../config/keys");
const User = require("../../models/User");
const Token = require("../../models/Token")
const Profile = require("../../models/Profile");
const passport = require("passport");
const emailclient = require("../../controllers/emailclient")
//Load input  validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const { find } = require("../../models/User");
require('../../config/google')
require("dotenv").config();

// @route  GET   api/users/register
// @desc   Register users route
// @access Public

//email regex check
const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

router.post("/users/register", (req, res) => {
  const { errors } = validateRegisterInput(req.body);

  // Check regex for the email
  if (!emailRegex.test(req.body.email)) {
    errors.message = "Email is invalid !";
    return res.status(504).json(errors);
  }

  if (!req.body.password || req.body.password === "") {
    errors.message = "Password is invalid !"
    return res.status(504).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.message = "Email already exists";
      return res.status(504).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        wallet: req.body.wallet,
      });

      Profile.findOne({ user: newUser._id }).then(profile => {
        if (profile) {
          errors.message = "Profile already exists";
          return res.status(504).json(errors);
        } else {
          const newProfile = new Profile({
            user: newUser._id,
            avatar: avatar,
            pre_registration_status: false
          });
          newProfile.save();
        }
      });


      emailclient.sendsignupemail(req.body.first_name, req.body.email)

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then()
            .catch(err => console.log(err));
        });
      });

      //add profile id to user model





      //Create jt payload
      const payload = {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        role: newUser.role
      };
      //Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) console.log(err);
          res.json({
            success: true,
            token: "Bearer " + token,
            user: newUser
          });
        }
      );
    }
  });
});


// @route  GET   api/users/login
// @desc   Login users route => returning jwt token
// @access Public

router.post("/users/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation for the email and password from regex
  if (!emailRegex.test(req.body.email)) {
    errors.message = "Email is invalid !";
    return res.status(504).json(errors);
  }

  if (!isValid) {
    errors.message = "SOMETHING WENT WRONG !"
    return res.status(504).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.message = "User not found";
      return res.status(504).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Match

        //Create jt payload
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          role: user.role
        };
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              first_name: user.first_name,
              last_name: user.last_name,
              user_id: user._id
            });
          }
        );
      } else {
        errors.message = "Password incorrect";
        return res.status(504).json(errors);
      }
    });
  });
});

// @route  GET   api/users/current
// @desc   Return/retrive the current user from the token
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.user);
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email
    });
  }
);

// route to get all the users 
router.get("/users", (req, res) => {
  User.find()
    .then(doc => {
      // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
      res.setHeader('Content-Range', 'users 0-5/5');
      res.json(doc)

    })
    .catch(err => {
      res.status(500).json(err)
    })


});

// get reqest for completed lectures of course of a user

router.get('/user/completed', (req, res) => {
  User.findOne({ _id: req.query.userId })
    .then(user => {
      let completedLec = 0
      const temp = user.courses.find(course => course.courseId == req.query.courseId);
      if (temp) {
        completedLec = temp.completedLectures.length
      }
      res.json({ "completed_lectures": completedLec });
    })
});

router.patch("/users/wallets", (req, res) => {
  User.findOne({ _id: req.body.user_id })
    .then(user => {
      if (!user.wallet_address.includes(req.body.address)) user.wallet_address.push(req.body.address)
      user.save()
        .then(() => {
          res.json({ message: "Wallet address added successfully!!" })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    })
})

router.delete('/user', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOneAndRemove({
    _id: req.query.id
  })
    .then(doc => {

      res.json(doc)

    })
    .catch(err => {
      res.status(500).json(err)
    })
})


//create a route for google login and oauth screen and store the user in the database in the user model
router.post(' /users/googlelogin', (req, res) => {
  res.status(200).json({ message: "google login" })

})

//forgot password route for the user and update the password in the database
router.post('/users/forgetpassword', (req, res) => {

  if (req.headers.secretkey == process.env.SECRET_KEY) {
    User.findOne({ email: req.body.email })
      .then(async user => {
        if (!user) {
          return res.status(404).json({ email: "Email not found" });
          //const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' });

        }
        else {
          try {
            let token = await Token.findOne({ userId: user._id })
            if (token) {
              token.deleteOne()
            }
            let resetToken = crypto.randomBytes(32).toString('hex');
            const hash = await bcrypt.hash(resetToken, 10)
            let newToken = new Token({
              userId: user._id,
              token: hash,
              createdAt: Date.now()
            })
            await newToken.save();
            const username = user.first_name + " " + user.last_name;
            const useremail = user.email;
            const link = `http://localhost:3000/resetpassword/${resetToken}&id=${user._id}`;
            console.log(link)
            console.log(hash)
            emailclient.sendtokenemail(username, useremail, link);
            return res.status(200).json({ message: "Email sent successfully" });

          }
          catch (err) {
            console.log(err)
          }
        }
      }
      )
  }
  else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post('/users/verifytoken', async (req, res) => {

  //Addition to be made
  // 1. Create a JWT Wrapper and check the JWT token recieved from the frontend and then decode and extract the data with the secret key for JWT (JWT_SECRET_KEY)
  if (req.headers.secretkey == process.env.SECRET_KEY) {
    let passwordresetotken = await Token.findOne({ userId: req.body.userId })
    if (!passwordresetotken) {
      return res.status(404).json({ message: "Token not found" });
    }

    const isValid = await bcrypt.compare(req.body.token, passwordresetotken.token)
    if (!isValid) {
      return res.status(401).json({ message: "Invalid token" });
    }
    else {
      const hash = await bcrypt.hash(req.body.password, 10)
      await User.updateOne(
        { _id: req.body.userId },
        { $set: { password: hash } },
        { new: true }
      );

      //Changes to be made
      // 1. Create a Delete option to delete the token from the database
      // 2. Don't let user change password if the token is expired
      // 3. Compare the last updated and don't let it run if the user has changed the password in the last 5 minutes and set a timer for 30 mins
      const user = await User.findById(req.body.userId)
      const username = user.first_name + " " + user.last_name;
      const useremail = user.email;
      emailclient.sendsuccesspassword(username, useremail);

      return res.status(200).json({ message: "Password has been reset" });
    }

  }
  else {
    return res.status(401).json({ message: "Unauthorized" });
  }

});

//Google Login and register API 

router.post('/users/googlelogin', async (req, res) => {
  if (req.body.token && req.body.source == "google") {
    const decoded = jwt.decode(req.body.token);
    const { email, name, } = decoded;

    //login with google
    if (decoded.email) {
      const userdata = await User.findOne({ email: decoded.email })
      if (!userdata) {
        console.log("User not found")
        return res.status(404).json({ message: "User not found / Please register" });
      }
      const payload = {
        id: userdata.id,
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        avatar: userdata.avatar,
        role: userdata.role
      };
      //Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          res.status(200).json({
            success: true,
            token: "Bearer " + token,
            first_name: userdata.first_name,
            last_name: userdata.last_name,
            user_id: userdata._id
          });
        }
      )


    }

    //register


  }
})

router.post("/users/googleregister", async (req, res) => {
  if (req.body.token && req.body.source == "google") {
    const decoded = jwt.decode(req.body.token);
    const { email, given_name, family_name } = decoded;
    const userdata = await User.findOne({ email: decoded.email })
    console.log(userdata)

    if (!userdata) {
      try {
        const newUser = new User({
          first_name: decoded.given_name,
          last_name: decoded.family_name,
          email: decoded.email,
          role: "user",
          source: req.body.source,
        });
        newUser.save();

        Profile.findOne({ user: newUser._id }).then(profile => {
          if (profile) {
            errors.message = "Profile already exists";
            return res.status(504).json(errors);
          } else {
            const newProfile = new Profile({
              user: newUser._id,
            });
            newProfile.save();
          }
        });

        const payload = {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          role: newUser.role
        };
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) console.log(err);
            res.status(200).json({
              success: true,
              token: "Bearer " + token,
              user: newUser
            });
          }
        );
        emailclient.sendsignupemail(newUser.first_name, newUser.email)
        ///console.log(newUser.first_name, newUser.email)

      }
      catch (err) {
        console.log(err)
      }

    }
    else {
      console.log("User already exists")
      return res.status(500).json({ message: "User already exists" });
    }
  }
})




module.exports = router;