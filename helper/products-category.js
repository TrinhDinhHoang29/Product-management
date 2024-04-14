const ProductsCategoryModel = require("../models/products-category.model");
module.exports.getSubProductsCategory = async  (parentId) => {
    async function childProductsCategoryId(parentId) {
        const childProductsCategory = await ProductsCategoryModel.find({ deleted: false, status: "active", parentId: parentId });
        let result = [...childProductsCategory];
        for (let item of childProductsCategory) {
            const childItem = await childProductsCategoryId(item._id);
            result = result.concat(childItem);
        }
        return result;
    }
    return await childProductsCategoryId(parentId);
}