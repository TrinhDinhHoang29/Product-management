const cloud = require("../../helper/uploadCloud.helper");
const chatModel = require("../../models/chat.model");

module.exports = (res)=>{
    _io.once('connection', (socket) => {
        socket.on('CLIENT_SEND_MESSAGE',async (data)=> {
           //  socket.emit("SEVER_SEND_MESSAGE",msg);
           const images  = [];
  
           for (const image of data.images) {
              const link = await cloud.upload(image);
              images.push(link);
           }
            const objMSG = {
              customer_id:res.locals.customerInfo._id,
              content:data.content,
              images:images
           };
           const chat = new chatModel(objMSG);
           await chat.save();
           objMSG.fullName=res.locals.customerInfo.fullName;
            _io.emit("SEVER_SEND_MESSAGE",objMSG);
        });
        socket.on('CLIENT_SEND_TYPING',async (showTyping)=> {
           const objTyping = {
             customer_id:res.locals.customerInfo._id,
             content:showTyping,
             fullName:res.locals.customerInfo.fullName
          };
           _io.emit("SEVER_SEND_TYPING",objTyping);
       });
    });
  
}