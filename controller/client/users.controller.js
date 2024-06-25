const customersModel = require("../../models/customer.model");
const userSocket = require("../../socket/client/user.socket");
const roomChatModel = require("../../models/roomChat.model");
module.exports.notFriends = async(req,res)=>{
    const myId = res.locals.customerInfo._id;
    const arrayRequest = await customersModel.findOne({_id:myId}).select("requestAddFriends appceptAddFriends listFriend");
    const arrCustomer_id = arrayRequest.listFriend.map(item=>item.customer_id)
    const users = await customersModel.find({
        $and:[
            {_id:{$ne:myId}},
            {_id:{$nin:arrayRequest.requestAddFriends}},
            {_id:{$nin:arrayRequest.appceptAddFriends}},
            {_id:{$nin:arrCustomer_id}}
        ],       
        status:"active",
        deleted:false
    }).select("_id fullName");
    // const users = await customersModel.find({_id:{$ne:myId}});
    // console.log(users);
    res.render("client/pages/users/not-friends",{users:users});
    userSocket(res);
}
module.exports.requestAddFriends = async(req,res)=>{
    const myId = res.locals.customerInfo._id;
    const arrayRequest = await customersModel.findOne({_id:myId}).select("requestAddFriends appceptAddFriends listFriend");
    const users = await customersModel.find({
        _id:{$in:arrayRequest.requestAddFriends},    
        status:"active",
        deleted:false
    }).select("_id fullName");
    res.render("client/pages/users/Request-Add-Friends",{users:users});
    userSocket(res);
}
module.exports.appceptAddFriends = async (req,res)=>{
    const myId = res.locals.customerInfo._id;
    const arrayRequest = await customersModel.findOne({_id:myId}).select("requestAddFriends appceptAddFriends listFriend");
    const users = await customersModel.find({
        _id:{
            $in:arrayRequest.appceptAddFriends
        },          
        status:"active",
        deleted:false
    }).select("_id fullName");
    
    res.render("client/pages/users/Appcept-Add-Friends",{users:users});
    userSocket(res);
}
module.exports.friends = async(req,res)=>{
    const myId = res.locals.customerInfo._id;
    const arrayRequest = await customersModel.findOne({_id:myId}).select("requestAddFriends appceptAddFriends listFriend");
    const arrCustomer_id = arrayRequest.listFriend.map(item=>item.customer_id);

    //users là danh sách friends hiển thị ra ->Trong này có roomChatId
    //Điều kiện cần làm là xuất ra các roomChatId có trong
    //Bỏ roomChatId lên danh sách bạn bè xuất ra 
    const users = await customersModel.find({
        _id :{
            $in:arrCustomer_id
        },
        status:"active",
        deleted:false
    }).select("_id fullName statusOnline listFriend").lean();
    for(let user of users){
        const roomChat = user.listFriend.find((item)=>item.customer_id==myId);
        user.roomChatId = roomChat.room_chat_id;
    }
    res.render("client/pages/users/Friends",{users:users}); 
}
module.exports.createGroupChat = async (req,res)=>{
    const arrIdUserFriend = res.locals.customerInfo.listFriend.map(item=>item.customer_id);
    const friends = await customersModel.find({
        _id:{
            $in:arrIdUserFriend
        }
    }).select("id fullName");
    res.render("client/pages/users/create-group-chat",{friends:friends});
}
module.exports.createGroupChatPost = async (req,res)=>{
    const idMemberRoomChats = req.body.chkIdFriend;
    let users = [{
        user_id:res.locals.customerInfo.id,
        role:"admin"
    }];
    idMemberRoomChats.forEach((item)=>{
        let objUser = {
            user_id:item,
            role:"member"
        }
        users.push(objUser);
    });
    const objectRoomChat = {
        title:req.body.title,
        typeRoom:"Group",
        avatar:req.body.avatar,
        users:users
     
    }
    const roomChat  = new roomChatModel(objectRoomChat);
    await roomChat.save();
    res.redirect(`/chat/${roomChat.id}`);    
}