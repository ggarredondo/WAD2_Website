
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const {login} = require("../auth/auth");

router.get("/", controller.root);
router.get("/menu", controller.menu);
router.get("/newDish", controller.newDish);
router.get("/updateDish", controller.updateDish);

// login
router.get("/staff", controller.staff);
router.post("/staff", login, controller.root);

// errors
router.use(controller.notfound_error);
router.use(controller.internal_error);

module.exports = router;