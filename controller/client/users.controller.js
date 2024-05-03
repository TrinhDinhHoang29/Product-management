const customersModel = require("../../models/customer.model");
const userSocket = require("../../socket/client/user.socket");
module.exports.notFriends = async(req,res)=>{
    const myId = res.locals.customerInfo._id;
    const arrayRequest = await customersModel.findOne({_id:myId}).select("requestAddFriends appceptAddFriends");
    const users = await customersModel.find({
        $and:[
            {_id:{$ne:myId}},
            {_id:{$nin:arrayRequest.requestAddFriends}},
            {_id:{$nin:arrayRequest.appceptAddFriends}}
        ],       
        status:"active",
        deleted:false
    }).select("_id fullName");
    res.render("client/pages/users/not-friends",{users:users});
    userSocket(res);
}
module.exports.requestAddFriends = async(req,res)=>{
    const myId = res.locals.customerInfo._id;
    const arrayRequest = await customersModel.findOne({_id:myId}).select("requestAddFriends acceptAddFriends");
    const users = await customersModel.find({
        $and:[
            {_id:{$ne:myId}},
            {_id:{$in:arrayRequest.requestAddFriends}},
            {_id:{$nin:arrayRequest.acceptAddFriends}}
        ],       
        status:"active",
        deleted:false
    }).select("_id fullName");
    res.render("client/pages/users/Request-Add-Friends",{users:users});
    userSocket(res);

}