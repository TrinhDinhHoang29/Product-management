const rolesModels = require("../../models/roles.model");

module.exports.index =async (req,res)=>{
    const find = {deleted:false};
    const records = await rolesModels.find(find);
     res.render("admin/pages/roles/index",{records:records});
}
module.exports.create = async (req,res)=>{
    res.render("admin/pages/roles/create");
}
module.exports.createPost = async ( req,res)=>{
    try{
    const roles = new rolesModels(req.body);
    await roles.save();
    req.flash("success","Thêm quyền thành công !!!");
    res.redirect("back");
    }catch(err){
        req.flash("error","Thêm quyền thất bại !!!");
        res.redirect("back");
    }
}
module.exports.edit = async(req,res)=>{
    const find = {deleted:false,_id:req.params.id};
    const records = await rolesModels.findOne(find);
    res.render("admin/pages/roles/edit",{records:records});
}
module.exports.editPatch = async(req,res)=>{
    const find = {deleted:false,_id:req.params.id};
    try{
        await rolesModels.updateOne(find,req.body);
        req.flash("success","Update thành công");
        res.redirect("back");
    }catch(err){
        req.flash("error","Update không thành công");
        res.redirect("back");
    }
}