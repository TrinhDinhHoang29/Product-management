const chatModel = require("../../models/chat.model");
const customerModel = require("../../models/customer.model");
module.exports.index = async(req,res)=>{
      const chats = await chatModel.find({deleted:false});
      const customers = await customerModel.find({deleted:false});
      chats.forEach(element=>{
         element.fullName = customers.find(item=>item._id==element.customer_id).fullName; 
      })

   res.render("client/pages/chat/index",{chats:chats});
   _io.once('connection', (socket) => {
      socket.on('CLIENT_SEND_MESSAGE',async (msg)=> {
          //socket.emit("SEVER_SEND_MESSAGE",msg);
          const objMSG = {
            customer_id:res.locals.customerInfo._id,
            content:msg,
            fullName:res.locals.customerInfo.fullName
         };

         const chat = new chatModel(objMSG);
         await chat.save();
        
          _io.emit("SEVER_SEND_MESSAGE",objMSG);
      });
  });

}