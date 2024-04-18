const express = require("express");
const router = express.Router();
const customerValidate = require("../../validate/client/customer.validate");
const customercartController = require("../../controller/client/customer.controller");


router.get("/register",customercartController.register);
router.post("/register",customerValidate.register,customercartController.registerPost);
router.get("/login",customercartController.login);
router.post("/login",customerValidate.login,customercartController.loginPost);
router.get("/logout",customercartController.logout);
router.get("/forgotPassword",customercartController.forgotPassword);
router.post("/forgotPassword",customercartController.forgotPasswordPost);

module.exports = router;