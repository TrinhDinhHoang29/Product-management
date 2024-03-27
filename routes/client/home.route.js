const express = require("express");
const router = express.Router();
const homeController = require("../../controller/client/home.controller");
router.get("/",homeController.home);


module.exports = router;