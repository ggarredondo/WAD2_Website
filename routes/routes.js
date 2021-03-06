
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const {login} = require("../auth/auth");
const {verify} = require("../auth/auth");

router.get("/", controller.root);
router.get("/menu", controller.menu);
router.get("/newDish", verify, controller.newDish);
router.post("/newDish", verify, controller.post_newDish);
router.get("/update/:_id", verify, controller.updateDish);
router.post("/update/:_id", verify, controller.post_updateDish);
router.get("/avail/:_id", verify, controller.availDish);
router.get("/unavail/:_id", verify, controller.unavailDish);

// login
router.get("/staff", controller.staff);
router.post("/staff", login, controller.post_login);
router.get("/logout", verify, controller.logout);

// errors
router.use(controller.notfound_error);
router.use(controller.internal_error);

module.exports = router;