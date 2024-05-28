const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const usersController = require("../../controller/client/users.controller");
const uploadFileMiddleware = require("../../middlewares/admin/uploadCloud.middleware");
const customerValidate = require("../../validate/client/customer.validate");



router.get("/not-friends",usersController.notFriends);
router.get("/Request-Add-Friends",usersController.requestAddFriends);
router.get("/Appcept-Add-Friends",usersController.appceptAddFriends);
router.get("/Friends",usersController.friends);
router.get("/Create-Group-Chat",usersController.createGroupChat);
router.post("/Create-Group-Chat",upload.single('avatar'),uploadFileMiddleware.uploadCloud,customerValidate.checkCreateGroupChat,usersController.createGroupChatPost);
module.exports = router;
