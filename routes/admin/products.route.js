const productsController = require("../../controller/admin/products.controller");
const express = require("express");
const routes = express.Router();

routes.get("/",productsController.products);

module.exports = routes;