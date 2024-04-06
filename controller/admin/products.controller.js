const productsModel = require("../../models/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
module.exports.products =async (req,res)=>{
    
    let filterStatus = filterStatusHelper(req.query);//Lấy từ helper
    let find = {deleted:true};
    if(req.query.status)//kiểm tra có status nào hay không
      find.status = req.query.status;//nếu có thêm vào đối tượng find 1 value status 

    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }



    // pagination start -----------------------------------
    let objPagination = {
        limiteItem:4,
        currentPage:1
    }
    const countProducts = await productsModel.find(find).count();
    objPagination.totalPage = Math.ceil(countProducts/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------
    let Products=await productsModel.find(find).limit(objPagination.limiteItem).skip(objPagination.skipItem);
    res.render("admin/pages/products/index",{products:Products,
                                            filterStatus:filterStatus,
                                            keyword:objectSearch.keyword,
                                            objPagination:resultPagination
                                        });
}
module.exports.changeStatus = async (req,res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await productsModel.updateOne({_id:id},{status:status});
    req.flash("success","Đã update thành công");
    res.redirect("back");
}
module.exports.changeMulti = async (req,res)=>{
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    
     console.log(type);
    switch (type){
        case "active":
            await productsModel.updateMany({_id:ids},{status:"active"});
            req.flash("success","Đã update thành công"+ids.length+"sản phẩm");
            break;
        case "unactive":
            await productsModel.updateMany({_id:ids},{status:"unactive"});
            req.flash("success","Đã update thành công"+ids.length+"sản phẩm");
            break;
        case "delete-all":
            await productsModel.updateMany({_id:ids},{deleted:false});
            req.flash("success","Đã xóa thành công"+ids.length+"sản phẩm");

            break;
    }
   res.redirect("back");
}
module.exports.deleteItem = async (req,res)=>{
    const idItem = req.params.id;
    await productsModel.updateOne({_id:idItem},{deleted:false,dateDeleted: new Date()});
    res.redirect("back");
}
module.exports.restores = async(req,res)=>{
    const productsDeleted = await productsModel.find({deleted:false});
    res.render("admin/pages/products/restore",{productsDeleted:productsDeleted});
}
module.exports.restoresId = async(req,res)=>{
    const idRestore = req.params.id;
    await productsModel.updateOne({_id:idRestore},{deleted:true});
    res.redirect("back");
}
module.exports.restoreMulti = async(req,res)=>{
    const ids = req.body.allIdRestore.split(", ");
    await productsModel.updateMany({_id:ids},{deleted:true});
    res.redirect("back");
}
module.exports.create =async (req,res)=>{
    res.render("admin/pages/products/create");
}
module.exports.createPost = async(req,res)=>{
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.rating = parseFloat(req.body.rating);
    req.body.stock = parseFloat(req.body.stock);
    const product= new productsModel(req.body);
    await product.save();
    req.flash("success","Tạo sản phẩm thành công");
    res.redirect("/admin/products"); 
}
module.exports.edit=async(req,res)=>{
    const find = {
        _id:req.params.id,
        deleted:true
    }
    const product = await productsModel.findOne(find);
    res.render("admin/pages/products/edit",{product:product});
}
module.exports.editPatch=async(req,res)=>{
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.rating = parseFloat(req.body.rating);
    req.body.stock = parseFloat(req.body.stock);
    if(req.file)
       req.body.thumbnail =`/uploads/${req.file.filename}`;
    const product= await productsModel.updateOne({_id:req.params.id},req.body);
    req.flash("success","Thêm sản phẩm thành công");
    res.redirect("back");
}
module.exports.detail = async (req,res)=>{
    const find = {
        _id:req.params.id,
        deleted:true
    }
    const product = await productsModel.findOne(find);
    res.render(`admin/pages/products/detail`,{product:product});
}