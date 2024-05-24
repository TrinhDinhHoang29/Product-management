const mongoose = require("mongoose");
const chatSchema = new  mongoose.Schema({
    customer_id:String,
    content:String,
    room_chat_id:String,
    images:Array,
    deleted:{
        type:Boolean, 
        default:false
    }
},{
    timestamps:true
});

const Chat= mongoose.model("chat",chatSchema,"chats");
module.exports = Chat;