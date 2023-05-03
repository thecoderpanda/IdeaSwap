const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("./emailclient");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

async  function forgetpassword(email, userid, first_name) {
 const user = await User.findOne({email: email});
 if(!user) {
   return {status: 404, message: "User not found"};
 }
 else{
  let token = await Token.findOne({userId: user._id});
  if(token) {
    await token.deleteOne();
  }
  let resetToken = crypto.randomBytes(32).toString("hex");
 }

}

module.exports = {forgetpassword};