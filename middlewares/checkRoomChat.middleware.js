const userModel = require("../models/customer.model");
module.exports = async (req,res,next)=>{
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.customerInfo;
    const user = await userModel.findOne({
        _id:userId,
    })
    const checkRoomChatId = user.listFriend.find((item)=>item.room_chat_id==roomChatId);
    if(checkRoomChatId){
        next();
    }else{
        res.redirect("back");
    }
}