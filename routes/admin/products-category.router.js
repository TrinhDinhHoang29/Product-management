const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const productCategoryController = require("../../controller/admin/products-category.controller");
const validate = require("../../validate/product.validate");
const cloudinary = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/",productCategoryController.index);
router.get("/create",productCategoryController.create);
router.post("/create",upload.single("thumbnail"),cloudinary.uploadCloud,validate.createPost,productCategoryController.createPost);
router.patch("/change-status/:statusChange/:idChange",productCategoryController.indexPatch);

module.exports = router;


