const usersModel = require("../../models/customer.model");
module.exports = (res)=>{
    _io.once('connection', (socket) => {
        socket.on("CLIENT_ADD_FRIEND",async (idUserAdd)=>{
            const myId = res.locals.customerInfo._id;
            //Kiểm tra trong acceptFriends ông b có ông a không
            const checkAcceptAinB = await usersModel.findOne({_id:idUserAdd,appceptAddFriends:myId})
            if(!checkAcceptAinB){
                await usersModel.updateOne({_id:idUserAdd},{
                    $push:{appceptAddFriends:myId}
                })            
            }
            const checkRequestBinA = await usersModel.findOne({_id:myId,requestAddFriends:idUserAdd})
            if(!checkRequestBinA){
                await usersModel.updateOne({_id:myId},{
                    $push:{requestAddFriends:idUserAdd}
                })
            }

        })
        socket.on("CLIENT_CANCEL_ADD_FRIEND",async (idUserCancelAdd)=>{
            const myId = res.locals.customerInfo._id;
            //Ông A hủy lời mời kết bạn ông B
            //Kiểm tra trong request Ông A có ông B =>Hủy
            //Kiểm tra tring accept Ông B có ông A => Hủy
            //Không có cho qua
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
        })
    })
}