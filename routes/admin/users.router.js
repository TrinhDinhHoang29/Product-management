const express = require("express");
const router = express.Router();
const usersController = require("../../controller/admin/users.controller");
const userValiDate = require("../../validate/user.validate"); 


router.get("/",usersController.index);
router.get("/create",usersController.create);
router.post("/create",userValiDate.createPost,usersController.createPost);
router.delete("/deleteItem/:id",usersController.deleted);
router.get("/edit/:id",usersController.edit);
router.patch("/edit/:id",userValiDate.createPost,usersController.editPatch);
module.exports = router;
