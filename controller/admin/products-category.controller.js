const productCategoryModel = require("../../models/products-category.model");
module.exports.index = async (req,res)=>{
    let find={deleted:false}
    const productsCategory = await productCategoryModel.find(find);

    res.render("admin/pages/products-category/index",{productsCategory:productsCategory});
}
module.exports.indexPatch = async(req,res)=>{
    const statusChange = req.params.statusChange;
    const id = req.params.idChange;
    try{
    const products = await productCategoryModel.updateOne({_id:id},{status:statusChange});
    req.flash("success","Update thành công");
    res.redirect("back");

    }catch(err){
        req.flash("success","Update không thành công");
        res.redirect("back");
    }
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
