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
const Team = require("../../models/team");
const passport = require("passport");
const emailclient = require("../../controllers/emailclient")
//Load input  validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const cookieSession = require('cookie-session');
const { find } = require("../../models/User");
require('../../config/google')
require("dotenv").config();


//@route POST Create a team with the user from th usrt token
router.post("/create",  passport.authenticate("jwt", { session: false }), async (req, res) => {
 
   
        const token = req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, keys.secretOrKey);
        const userid = decoded.id;
        
        Userdata = await User.findOne({ id: userid }).then(user => {
        
        if(user.team_status == true){
            return res.status(400).json({team: "User already has a team"})
        }

        const team_members_array = req.body.team_members
        const team_members_ids = User.find({ email: { $in: team_members_array } }).then(users => {
            return users.map(user => user.id)
        })

        const team = new Team({
            teamName: req.body.teamName,
            no_team_members: req.body.no_team_members,
            team_members: team_members_ids,
            team_description: req.body.team_description,
            //team_track: req.body.team_track,
            team_active: true,
        });
        team.save()
            .catch(err => console.log(err));
            User.findOneAndUpdate(
                { id: userid },
                { $set: { team_status: true, team: team._id  }},
                { new: true }
            )
            return res.status(200).json("team created successfully")
})

});

module.exports = router;