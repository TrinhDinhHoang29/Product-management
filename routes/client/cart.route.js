const express = require("express");
const router = express.Router();
const cartController = require("../../controller/client/cart.controller");
router.post("/add/:id",cartController.add);


module.exports = router;