const express = require("express");
const router = express.Router();
const cartController = require("../../controller/client/cart.controller");


router.get("/",cartController.index);
router.post("/add/:id",cartController.add);
router.get("/delete/:productId",cartController.delete);
router.get("/updateQuantity/:productId/:quantity",cartController.updateQuantity);

module.exports = router;