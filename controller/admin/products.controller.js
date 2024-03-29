const productsModel = require("../../models/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
module.exports.products =async (req,res)=>{
    
    let filterStatus = filterStatusHelper(req.query);
    let find = {deleted:true};
    if(req.query.status)
      find.status = req.query.status;
    if(req.query.keyword){
        var keyword = req.query.keyword;
        const regex = new RegExp(keyword,"i");/// i để k phân biệt chữ hoa chữ thường
        find.title = regex;
    }
    let Products=await productsModel.find(find);
    res.render("admin/pages/products/index",{products:Products,filterStatus:filterStatus,keyword:keyword});
}