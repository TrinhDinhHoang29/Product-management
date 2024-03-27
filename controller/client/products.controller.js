const Product = require("../../models/products.model");


module.exports.index=(req,res)=>{
    res.render("client/pages/products/index",{});
    const products = Product.find({});
    console.log(products);
}