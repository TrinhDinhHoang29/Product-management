const treeCategory = require("../helper/treeCategory");

// const rolesModel = require("../../models/roles.model");

const productCategoryModel = require("../models/products-category.model");
module.exports.menuProductsCategory = async (req,res,next)=>{
    const productCategory = await productCategoryModel.find({deleted:false});
    res.locals.menuProductsCategory = treeCategory(productCategory);
    next();
}