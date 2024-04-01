const productsController = require("../../controller/admin/products.controller");
const express = require("express");
const routes = express.Router();        

routes.get("/",productsController.products);
routes.patch("/change-status/:status/:id",productsController.changeStatus);
routes.patch("/change-multi",productsController.changeMulti);
routes.delete("/deleteItem/:id",productsController.deleteItem);
routes.get("/restores",productsController.restores);
routes.patch("/restores/:id",productsController.restoresId);
routes.patch("/restoreMulti",productsController.restoreMulti);
module.exports = routes;