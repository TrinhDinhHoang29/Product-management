const productsController = require("../../controller/admin/products.controller");
const express = require("express");
const routes = express.Router();        

routes.get("/",productsController.products);
routes.patch("/change-status/:status/:id",productsController.changeStatus);
module.exports = routes;