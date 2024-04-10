const mongoose = require("mongoose");
const random = require("../public/js/tokenRandom");

const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    userName:String,
    password:String,
    status:String,
    roleId:String,
    token:{
        type:String,
        default:random(20)
    },
    deleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Users = mongoose.model("users",userSchema,"users");
module.exports = Users;