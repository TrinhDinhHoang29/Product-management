const userModel = require("../../models/users.model");
const roleModel = require("../../models/roles.model");
module.exports.checkToken = async (req,res,next)=>{
    if(!req.cookies.token){
        res.redirect("/admin/auth/login");
        return;
    }
    const user = await userModel.findOne({deleted:false,token:req.cookies.token}).select("-password");   
    if(!user){
        res.redirect("/admin/auth/login");
        return;
    }
    res.locals.user = user;
    res.locals.role = await roleModel.findOne({_id:user.roleId,deleted:false});
    next();
}