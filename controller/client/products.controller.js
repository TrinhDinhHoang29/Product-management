const Product = require("../../models/products.model");


module.exports.index=async (req,res)=>{
    
    const products = await Product.find({
        deleted:true
    });
    res.render("client/pages/products/index",{products:products});

}
module.exports.detail = async(req,res)=>{
    const product = await Product.findOne({slug:req.params.slug,status:"active"});
    console.log(product);
    res.render("client/pages/products/detail",{product:product})
}