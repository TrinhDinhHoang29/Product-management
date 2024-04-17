const express = require("express");
const routes = express.Router();
const blogController = require("../../controller/admin/blog.controller");




routes.get("/",blogController.index);


module.exports = routes;
