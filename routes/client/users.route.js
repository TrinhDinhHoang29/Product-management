const express = require("express");
const router = express.Router();
const usersController = require("../../controller/client/users.controller");


router.get("/not-friends",usersController.notFriends);
router.get("/Request-Add-Friends",usersController.requestAddFriends);
router.get("/Appcept-Add-Friends",usersController.appceptAddFriends);
router.get("/Friends",usersController.friends);

module.exports = router;