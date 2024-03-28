const productsModel = require("../../models/products.model");

module.exports.products =async (req,res)=>{
    let Products=await productsModel.find({});
    console.log(Products);
    res.render("admin/pages/products/index",{products:Products});
}