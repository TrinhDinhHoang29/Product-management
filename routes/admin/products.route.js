const productsController = require("../../controller/admin/products.controller");
const express = require("express");
const multer  = require('multer');
const validate = require("../../validate/product.validate");
const storageMulter = require('../../helper/storageMulter');
const upload = multer({ storage:storageMulter()}) // Đường dẫn file được lấy bên helper storegeMulter
const routes = express.Router();        

routes.get("/",productsController.products);
routes.patch("/change-status/:status/:id",productsController.changeStatus);
routes.patch("/change-multi",productsController.changeMulti);
routes.delete("/deleteItem/:id",productsController.deleteItem);
routes.get("/restores",productsController.restores);
routes.patch("/restores/:id",productsController.restoresId);
routes.patch("/restoreMulti",productsController.restoreMulti);
routes.get("/create",productsController.create);
routes.post("/create",upload.single('thumbnail'),validate.createPost,productsController.createPost)
module.exports = routes;