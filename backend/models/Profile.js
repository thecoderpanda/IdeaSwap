
/* eslint-disable no-undef */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  //Basic Info
  first_name: {
    type: String
  },
  last_name: {
    type: String,
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  phone_number: {
    type: String
  },
  status: {
    type: Boolean,
  },
  Date_of_birth: {
    type: Date,
  },
  Wallet_address: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
