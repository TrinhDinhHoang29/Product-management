const express = require("express");
const router = express.Router();
const productController = require("../../controller/client/products.controller");

router.get("/",productController.index);
router.get("/detail/:slug",productController.detail);
router.get("/:productsSlug",productController.productsSlug);

module.exports = router;