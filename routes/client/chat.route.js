const express = require("express");
const router = express.Router();
const chatController = require("../../controller/client/chat.controller");
const checkRoomChat = require("../../middlewares/checkRoomChat.middleware");


router.get("/:roomChatId",checkRoomChat,chatController.index);

module.exports = router;