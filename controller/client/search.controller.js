const ProductsModel = require("../../models/products.model");

module.exports.index= async(req,res)=>{
   
    const keywork = new RegExp(req.query.keywork,"i");

    const products = await ProductsModel.find({title:keywork});
    res.render("client/pages/search/index",{products:products});
}