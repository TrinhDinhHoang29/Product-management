const productsController = require("../../controller/admin/products.controller");
const express = require("express");
const multer  = require('multer');
const validate = require("../../validate/product.validate");
const upload = multer();
const cloudinary = require("../../middlewares/admin/uploadCloud.middleware");
const routes = express.Router();        
routes.get("/",productsController.products);
routes.patch("/change-status/:status/:id",productsController.changeStatus);
routes.patch("/change-multi",productsController.changeMulti);
routes.delete("/deleteItem/:id",productsController.deleteItem);
routes.get("/restores",productsController.restores);
routes.patch("/restores/:id",productsController.restoresId);
routes.patch("/restoreMulti",productsController.restoreMulti);
routes.get("/create",productsController.create);
routes.post("/create",upload.single('thumbnail'),cloudinary.uploadCloud,validate.createPost,productsController.createPost)
routes.get("/edit/:id",productsController.edit);
routes.patch("/edit/:id",upload.single('thumbnail'),cloudinary.uploadCloud,validate.createPost,productsController.editPatch);
routes.get("/detail/:id",productsController.detail);
module.exports = routes;