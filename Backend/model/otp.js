const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//const {roles}= require("./roles")

const OTPSchema = new Schema({

  userId: {
    type: String,
    required: true
  },

  otp: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date
  },

  expiredAt: {
    type: Date
  }

})

module.exports = mongoose.model("otp", OTPSchema)

