const mongoose = require("mongoose");
const roomChatSchema = new  mongoose.Schema({
    title:String,
    avatar:String,
    typeRoom:String,
    status:String,
    users:[
        {
            user_id:String,
            role:String,
        }
    ],
    deleted:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
});

const RoomChat= mongoose.model("roomChat",roomChatSchema,"roomChat");
module.exports = RoomChat;