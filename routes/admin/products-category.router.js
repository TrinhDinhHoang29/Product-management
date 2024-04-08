const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const validate = require("../../validate/product.validate");
const cloudinary = require("../../middlewares/admin/uploadCloud.middleware");
const productCategoryController = require("../../controller/admin/products-category.controller");

router.get("/",productCategoryController.index);
router.get("/create",productCategoryController.create);
router.post("/create",upload.single("thumbnail"),cloudinary.uploadCloud,validate.createPost,productCategoryController.createPost);
router.patch("/change-status/:statusChange/:idChange",productCategoryController.indexPatch);
router.patch("/change-multi",productCategoryController.changeMulti);
router.get("/edit/:id",productCategoryController.edit);
router.patch("/edit/:id",upload.single("thumbnail"),cloudinary.uploadCloud,validate.createPost,productCategoryController.editPatch);

module.exports = router;


