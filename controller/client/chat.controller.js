const chatModel = require("../../models/chat.model");
const customerModel = require("../../models/customer.model");
const cloud = require("../../helper/uploadCloud.helper");
const chatSocket = require("../../socket/client/chat.socket");
module.exports.index = async(req,res)=>{
      const chats = await chatModel.find({deleted:false});
      const customers = await customerModel.find({deleted:false});
      chats.forEach(element=>{
         element.fullName = customers.find(item=>item._id==element.customer_id).fullName; 
      })
   res.render("client/pages/chat/index",{chats:chats});
   chatSocket(res);
}