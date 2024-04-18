const express = require("express");
const router = express.Router();
const checkoutController = require("../../controller/client/checkout.controller");
router.get("/",checkoutController.index);
router.post("/order",checkoutController.order);
router.get("/success/:productId",checkoutController.success);
module.exports = router;