const Product = require("../../models/products.model");

module.exports.home= async(req,res)=>{
    const productsFeatured = await Product.find({deleted:true,status:"active",featured:true});
    const productsNew = await Product.find({deleted:true,status:"active"}).limit(6);
    res.render("client/pages/home/index",{productsFeatured:productsFeatured,productsNew:productsNew});
}