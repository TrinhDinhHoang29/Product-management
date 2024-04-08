const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const treeCategory = require("../../helper/treeCategory");

const productCategoryModel = require("../../models/products-category.model");
module.exports.index = async (req,res)=>{
    let filterStatus = filterStatusHelper(req.query);//Lấy từ helper
    let find={deleted:false}
    if(req.query.status){
        find.status = req.query.status;
    }
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    const sort = {};
    if(req.query.keySort){
        sort[req.query.keySort] = req.query.valueSort;

    }else{
        sort.id = "asc";
    }
    const productsCategory = await productCategoryModel.find(find).sort(sort);
    res.render("admin/pages/products-category/index",{productsCategory:productsCategory,filterStatus:filterStatus});
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
module.exports.create =async (req,res)=>{
    const find = {deleted: false};
    const records = await productCategoryModel.find(find);
    const recordsNew = treeCategory(records);
    res.render("admin/pages/products-category/create",{records:recordsNew});
}
module.exports.createPost = async (req,res)=>{
    if(req.body.posision=="")
    {
        count = await productCategoryModel.find({deleted:false}).count();
        req.body.posision = count+1;
    }else{
        req.body.posision = parseInt(req.body.posision);
    }
    const productCategory = new productCategoryModel(req.body);
    await productCategory.save();
    req.flash("success","Thêm danh mục sản phẩm thành công");
    res.redirect("/admin/products-category");
}
module.exports.changeMulti = async(req,res)=>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    try{
   switch(type){
   case "active":
        await productCategoryModel.updateMany({_id:ids},{status:type});break;
    case "unactive":
        await productCategoryModel.updateMany({_id:ids},{status:type});break;
    case "delete-all":
        await productCategoryModel.updateMany({_id:ids},{deleted:true});break;
   }
        req.flash("success","Update thành công !!");
        res.redirect("back");
   }
    catch(err){
        req.flash("success","Update không thành công !!");
        res.redirect("back");
    }
}
module.exports.edit = async(req,res)=>{
    const id = req.params.id;
    const find = {deleted: false};
    const records = await productCategoryModel.find(find);
    const recordsNew = treeCategory(records);
    const productCategory = await productCategoryModel.findOne({deleted:false,_id:id});
    res.render("admin/pages/products-category/edit",{records:recordsNew,productCategory:productCategory});
}
module.exports.editPatch = async(req,res)=>{
    try{
        const id = req.params.id;
        await productCategoryModel.updateOne({_id:id},req.body);
        req.flash("success","Update thanh cong !!!");
        res.redirect("back");
    }catch(err){
        req.flash("error","Update khong thanh cong !!!");
        res.redirect("back");
    }
}