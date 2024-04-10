const dashboardController = require("../../controller/admin/dashboard.controller");
const express = require("express");
const router = express.Router();
router.get("/",dashboardController.dashboard);

module.exports = router;