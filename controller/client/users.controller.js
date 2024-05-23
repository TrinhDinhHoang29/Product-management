const customersModel = require("../../models/customer.model");
const userSocket = require("../../socket/client/user.socket");
module.exports.notFriends = async(req,res)=>{
    const myId = res.locals.customerInfo._id;
    const arrayRequest = await customersModel.findOne({_id:myId}).select("requestAddFriends appceptAddFriends listFriend");
    //console.log(arrayRequest);
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
        _id:{$in:arrayRequest.appceptAddFriends},          
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
    const users = await customersModel.find({
        _id :{
            $in:arrCustomer_id
        },
        status:"active",
        deleted:false
    }).select("_id fullName statusOnline");
    res.render("client/pages/users/Friends",{users:users}); 
}