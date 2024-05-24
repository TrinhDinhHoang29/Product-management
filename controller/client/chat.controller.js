 const chatModel = require("../../models/chat.model");
const customerModel = require("../../models/customer.model");
const cloud = require("../../helper/uploadCloud.helper");
const chatSocket = require("../../socket/client/chat.socket");
const roomChatModel = require("../../models/roomChat.model");


module.exports.index = async(req,res)=>{
      const roomChatId = req.params.roomChatId;
      //const roomChatCurrent = roomChatModel.findOne({room_chat_id:roomChatId});

      const chats = await chatModel.find({room_chat_id:roomChatId,deleted:false});
      const customers = await customerModel.find({deleted:false});
      chats.forEach(element=>{
         element.fullName = customers.find(item=>item._id==element.customer_id).fullName; 
      })
   res.render("client/pages/chat/index",{chats:chats});
   chatSocket(req,res);
}