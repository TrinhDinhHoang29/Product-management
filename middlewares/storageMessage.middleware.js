const customerModel = require("../models/customer.model");
const roomChatModel = require("../models/roomChat.model");
module.exports.storageMessage = async (req,res,next)=>{
    const myId = res.locals.customerInfo.id;
    const roomChats = await roomChatModel.find({
        deleted:false,
    }).lean();
    const myRoomChats = roomChats.filter(itemRoomChat=>{
         return itemRoomChat.users.find((user)=>user.user_id==myId);
            
    })
    for(let myRoomChat of myRoomChats){
        if(myRoomChat.typeRoom=="Friends"){
            for(let user of myRoomChat.users){
                if(user.user_id!=myId){
                    const fullName = await customerModel.findOne({_id:user.user_id}).select("fullName");
                    myRoomChat.title = fullName.fullName;
                }        
            }     
        }          
    }  
    res.locals.storageMessage = myRoomChats;
    next();
}