const express = require("express");
const routes = express.Router();
const orderController = require("../../controller/admin/order.controller");




routes.get("/",orderController.index);


module.exports = routes;
