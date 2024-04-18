const mongoose = require("mongoose");
const random = require("../public/js/tokenRandom");

const forgotPasswordSchema = new mongoose.Schema({
    userName:String,
    email:String,
    expireAt:{
        type:Date,
        expires:10
    },
    otp:{
        type:String,
        default:random(5)
    }
},{
    timestamps:true
});
const forgotPassword = mongoose.model("forgotPassword",forgotPasswordSchema,"forgotPassword");
module.exports = forgotPassword;