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
    },
    deletedBy:{
        id:String,
        deleteAt:Date
    },
    createdBy:{
        id:String,
        createAt:{
            type:Date,
            default:Date.now
        }
    }
},{
    timestamps:true
});

const Users = mongoose.model("users",userSchema,"users");
module.exports = Users;