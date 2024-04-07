const productCategoryModel = require("../../models/products-category.model");
module.exports.index = (req,res)=>{
    res.render("admin/pages/products-category/index");
}
module.exports.create = (req,res)=>{
    res.render("admin/pages/products-category/create");
}
module.exports.createPost = async (req,res)=>{
    if(req.body.posision=="")
    {
        count = await productCategoryModel.find({deleted:false}).count();
        req.body.posision = count+1;
    }else{
        req.body.posision = parseInt(req.body.posision);
    }
    req.body.parentId = parseInt(req.body.parentId);
    const productCategory = new productCategoryModel(req.body);
    await productCategory.save();
    req.flash("success","Thêm danh mục sản phẩm thành công");
    res.redirect("/admin/products-category");
}