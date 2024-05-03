const express = require("express");
const router = express.Router();
const usersController = require("../../controller/client/users.controller");


router.get("/not-friends",usersController.notFriends);
router.get("/Request-Add-Friends",usersController.requestAddFriends);
module.exports = router;