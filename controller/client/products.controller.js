const Product = require("../../models/products.model");
const ProductsCategoryModel = require("../../models/products-category.model");
const ProductsCategoryHelper = require("../../helper/products-category");

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
module.exports.productsSlug = async (req,res)=>{
    const productsCategory = await ProductsCategoryModel.findOne({deleted:false,status:"active",slug:req.params.productsSlug});


    
    const IdChildProductsCategory = await ProductsCategoryHelper.getSubProductsCategory(productsCategory._id);
    const IdsChild = IdChildProductsCategory.map(item=>item._id);

    //dùng $in{} để tìm các các sản phẩm thuộc id đã tìm
    const products = await Product.find({deleted:true,productCategoryId:{$in:[productsCategory._id,...IdsChild]}});
    res.render("client/pages/products/productsSlug",{title:productsCategory.title,products:products});
}