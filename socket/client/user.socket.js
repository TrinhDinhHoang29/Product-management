const usersModel = require("../../models/customer.model");
const chatRoomModel = require("../../models/roomChat.model");

module.exports = (res)=>{
    const cancelAdd = async(myId,idUserCancelAdd)=>{
        const checkRequestA = await usersModel.findOne({_id:myId,requestAddFriends:idUserCancelAdd});
            if(checkRequestA){
                await usersModel.updateOne({_id:myId},{
                    $pull:{
                        requestAddFriends:idUserCancelAdd
                    }
                })
            }
            const checkAcceptB = await usersModel.findOne({_id:idUserCancelAdd,appceptAddFriends:myId});
            if(checkAcceptB){
                await usersModel.updateOne({_id:idUserCancelAdd},{
                    $pull:{
                        appceptAddFriends:myId
                    }
                })
            }
    }
    _io.once('connection', (socket) => {
        socket.on("CLIENT_ADD_FRIEND",async (idUserAdd)=>{
            const myId = res.locals.customerInfo.id;
            //Kiểm tra trong acceptFriends ông b có ông a không
            const checkAcceptAinB = await usersModel.findOne({_id:idUserAdd,appceptAddFriends:myId})
            if(!checkAcceptAinB){
                await usersModel.updateOne({_id:idUserAdd},{
                    $push:{appceptAddFriends:myId}
                })            
            }
            // Hiển thị realTime lời mời kết bạn của ông A qua ông B
            const AcceptFriends = await usersModel.findOne({_id:idUserAdd}).select("appceptAddFriends");
            const lengthAcceptFriends = {
                userId:idUserAdd,
                lengthAcceptFriends:AcceptFriends.appceptAddFriends.length
            }
            socket  ("SERVER_RETURN_LENGTH_ACCEPT_FRIENDS",lengthAcceptFriends);
            const infoB = await usersModel.findOne({_id:myId}).select("fullName").lean();
            infoB.userId = idUserAdd;
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIENDS",infoB);
            // End Hiển thị realTime lời mời kết bạn của ông A qua ông B
            const checkRequestBinA = await usersModel.findOne({_id:myId,requestAddFriends:idUserAdd})
            if(!checkRequestBinA){
                await usersModel.updateOne({_id:myId},{
                    $push:{requestAddFriends:idUserAdd}
                })
            }
            const unserInfo = await usersModel.findOne({_id:idUserAdd}).select("id fullName");
            socket.emit('SERVER_RETURN_ADD_FRIEND',unserInfo);

        })
        socket.on("CLIENT_CANCEL_ADD_FRIEND",async (idUserCancelAdd)=>{
            const myId = res.locals.customerInfo.id;
            await cancelAdd(myId,idUserCancelAdd);
            // Hiển thị realTime lời cancel kết bạn của ông A qua ông B
            const AcceptFriends = await usersModel.findOne({_id:idUserCancelAdd}).select("appceptAddFriends");
            const lengthAcceptFriends = {
                userId:idUserCancelAdd,
                lengthAcceptFriends:AcceptFriends.appceptAddFriends.length
            }
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIENDS",lengthAcceptFriends);   
            const infoB = await usersModel.findOne({_id:myId}).select("fullName").lean();
            infoB.userId = idUserCancelAdd;
            socket.broadcast.emit("SERVER_RETURN_CANCEL_INFO_ACCEPT_FRIENDS",infoB);
            //End Hiển thị realTime lời cancel kết bạn của ông A qua ông B
 
        })

        socket.on("CLIENT_APPCEPT_ADD_FRIEND",async (idAppceptUserAdd)=>{
            //Kiểm tra trong list bạn bè của a có B chưa
            // và ngược lại
            // =>Thêm
            const myId = res.locals.customerInfo.id;
            const checkListFriendA = await usersModel.findOne({id:myId,listFriend:idAppceptUserAdd});
            const checkListFriendB = await usersModel.findOne({id:idAppceptUserAdd,listFriend:myId});
            //Tạo ra room chat khi chấp nhận kết bạn
            let roomChat;
            if(!checkListFriendA&&!checkListFriendB){
                const objectRoomChat = {
                    typeRoom:"Friends",
                    users:[
                        {
                            user_id:myId,
                            role:"admin",
                        }, {
                            user_id:idAppceptUserAdd,
                            role:"admin",
                        }
                    ]
                 
                }
                 roomChat  = new chatRoomModel(objectRoomChat);
                 await roomChat.save();
            }
                //END Tạo ra room chat khi chấp nhận kết bạn

            if(!checkListFriendA){
                await usersModel.updateOne({_id:myId},{
                    $push:{
                        listFriend:{
                            customer_id:idAppceptUserAdd,
                            room_chat_id:roomChat.id,
                    }
                },
                    $pull:{appceptAddFriends:idAppceptUserAdd}
                })
            }
            //Hiển thị số lượng lời chấp nhận khi chấp nhận kết bạn
            const AcceptFriends = await usersModel.findOne({_id:myId}).select("appceptAddFriends");
            const lengthAcceptFriends = {
                userId:myId,
                lengthAcceptFriends:AcceptFriends.appceptAddFriends.length
            }
            socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIENDS",lengthAcceptFriends);
            // End hiển thị số lượng lời chấp nhận khi chấp nhận kết bạn

            if(!checkListFriendB){
                await usersModel.updateOne({_id:idAppceptUserAdd},{
                    $push:{
                        listFriend:{
                            customer_id:myId,
                            room_chat_id:roomChat.id, 
                        }
                    },
                    $pull:{
                        requestAddFriends:idAppceptUserAdd
                    }
                })
            }
           await cancelAdd(idAppceptUserAdd,myId);                   
        })
        socket.on("CLIENT_CANCEL_APPCEPT_ADD_FRIEND",async (idCancelAppceptUserAdd)=>{
            const myId = res.locals.customerInfo.id;
            await cancelAdd(idCancelAppceptUserAdd,myId);
            //Hiển thị số lượng lời chấp nhận khi chấp nhận kết bạn
            const AcceptFriends = await usersModel.findOne({_id:myId}).select("appceptAddFriends");
            const lengthAcceptFriends = {
                userId:myId,
                lengthAcceptFriends:AcceptFriends.appceptAddFriends.length
            }
            socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIENDS",lengthAcceptFriends);
            // End hiển thị số lượng lời chấp nhận khi chấp nhận kết bạn
                            
        })
    })
}