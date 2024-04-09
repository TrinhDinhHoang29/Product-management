const express = require("express");
const router = express.Router();
const rolesController = require("../../controller/admin/roles.controller");


router.get("/",rolesController.index);
router.get("/create",rolesController.create);
router.post("/create",rolesController.createPost);
router.get("/edit/:id",rolesController.edit);
router.patch("/edit/:id",rolesController.editPatch);
router.get("/detail/:id",rolesController.detail);
router.delete("/deleteItem/:id",rolesController.deleted);
router.get("/permission",rolesController.permission);
router.patch("/permission",rolesController.permissionPatch);

module.exports = router;