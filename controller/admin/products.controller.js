const productsModel = require("../../models/products.model");

module.exports.products =async (req,res)=>{
    let find = {deleted:true};
    if(req.query.status)
        find.status=req.query.status;
    let Products=await productsModel.find(find);
    console.log(Products);
    res.render("admin/pages/products/index",{products:Products});
}