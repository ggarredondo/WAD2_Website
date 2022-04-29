
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

router.get("/", controller.root);
router.get("/staff", controller.staff);
router.get("/menus", controller.menus);
router.get("/newDish", controller.newDish);
router.get("/editDish", controller.editDish);

router.use(controller.notfound_error);
router.use(controller.internal_error);

module.exports = router;