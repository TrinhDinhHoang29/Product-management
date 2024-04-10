const express = require("express");
const router = express.Router();
const usersController = require("../../controller/admin/users.controller");


router.get("/login",usersController.login);
router.post("/login",usersController.loginPost);
router.get("/logout",usersController.logout);
module.exports = router;