const userModel = require("../models/customer.model");
const roomChatModel = require("../models/roomChat.model");
module.exports = async (req,res,next)=>{
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.customerInfo._id;
    const roomChat = await roomChatModel.findOne({_id:roomChatId});
    const usersInRoomChat = roomChat.users;
    const isUserInRoomChat = usersInRoomChat.find(item=>item.user_id==userId);
    if(isUserInRoomChat){
        next();
    }else{
        res.redirect("back");
    }
}