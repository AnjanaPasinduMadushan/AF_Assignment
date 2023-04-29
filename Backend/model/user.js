const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//const {roles}= require("./roles")

const userSchema = new Schema({


    name:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    NIC:{
        type:Number,
        required:true,
        unique:true
    },

    mobile:{
        type:Number,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    role: {
        type: String,
        enum: ["admin", "moderator", "citizen"],
        default: "citizen"  
       },

    checkingIn:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model("user", userSchema)

