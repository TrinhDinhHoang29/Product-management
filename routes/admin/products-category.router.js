const express = require("express");
const router = express.Router();
const productCategoryController = require("../../controller/admin/products-category.controller");



router.get("/",productCategoryController.index);


module.exports = router;


