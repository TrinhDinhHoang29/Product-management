const mongoose = require("mongoose");
const random = require("../public/js/tokenRandom");

const customerSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    userName:String,
    password:String,
    requestAddFriends:Array,
    appceptAddFriends:Array,
    listFriend:Array,
    status:{
        type:String,
        default:"active"
    },
    tokenCustomer:{
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

const customer = mongoose.model("customer",customerSchema,"customers");
module.exports = customer;