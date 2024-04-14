const userModel = require("../../models/users.model");
const roleModel = require("../../models/roles.model");
const md5 = require('md5');
module.exports.index =async (req,res)=>{
    const records = await userModel.find({deleted:false}).select("-userName -password");
    
    for(let item of records){
    if(item.createdBy.id){
            const user = await userModel.findOne({_id:item.createdBy.id});
            item.fullNameCreate = user.fullName;
            item.dateCreated = item.createdBy.createAt.getDay()+"/"+item.createdBy.createAt.getMonth()+"/"+item.createdBy.createAt.getFullYear();
        }
    }
    res.render("admin/pages/users/index",{records:records});
}
module.exports.create = async (req,res)=>{
    const roles = await roleModel.find({deleted:false});
    res.render("admin/pages/users/create",{roles:roles});
}
module.exports.createPost = async(req,res)=>{

    if(req.body.roleId===""){
        req.flash("error","Vui long chon quyen !!");
        res.redirect("back");
        return;
    }
    const users =await userModel.find({email:req.body.email,deleted:false});
    if(users.length>0){
        req.flash("error","Email đã tồn tại !!");
        res.redirect("back");
        return;
    }

    req.body.createdBy = {id:res.locals.user._id}
    // const fullName = await 
    req.body.password = md5(req.body.password);
    const user = new userModel(req.body);
    await user.save();
    req.flash("success","Tạo tài khoản thành công !!")
    res.redirect("back");

}
module.exports.deleted = async(req,res)=>{
    const id = req.params.id;
    try {
        if(id){
            await userModel.updateOne({_id:id},{deleted:true});
            req.flash("success","Xóa thành công !!!");
            res.redirect("back");
        }
    } catch (error) {
        req.flash("error","Xóa không thành công !!!");
        res.redirect("back");
    }
}
module.exports.edit = async(req,res)=>{



    const roles = await roleModel.find({deleted:false});
    const find = {deleted:false,_id:req.params.id};
    const records = await userModel.findOne(find);
    res.render("admin/pages/users/edit",{record:records,roles:roles});
}
module.exports.editPatch = async(req,res)=>{
    const records = await userModel.find({deleted:false,_id:{$ne:req.params.id},email:req.body.email});
    if(records.length>0){
        req.flash("error","Email đã tồn tại !!");
        res.redirect("back");
        return;
    }
    // req.body.password
    if(req.body.password){
            req.body.password = md5(req.body.password);
    }else{
        const user = await userModel.findOne({_id:req.params.id});
        req.body.password = user.password;
    }

    try{
         await userModel.updateOne({_id:req.params.id},req.body);
        req.flash("success","Update thành công !!");
        res.redirect("back");
    }catch(err){
        req.flash("err","Update không thành công !!");
        res.redirect("back");
    }

}
module.exports.login = async(req,res)=>{
    res.render("admin/pages/auth/login/index");
}
module.exports.loginPost = async (req,res)=>{
    const user = await userModel.findOne({deleted:false,email:req.body.email,userName:req.body.userName});
    // console.log(user);
    if(!user){
        req.flash("error","Account not found !!");
        res.redirect("back");
        return;
    }
    if(user.status == "unactive"){
        req.flash("error","Account was block !!");
        res.redirect("back");
        return;
    }
    if(user.password == md5(req.body.password)){
        req.flash("success","Login successful !!");
        res.cookie("token",user.token);
        res.redirect("/admin/dashboard");
    }else{
        req.flash("error","Password not found!!");
        res.redirect("back");
    }
}
module.exports.logout = async (req,res)=>{
    res.clearCookie("token");
    res.redirect("/admin/auth/login");
}