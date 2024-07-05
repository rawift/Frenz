const express = require("express")
const userController = require("../controller/userController")

const router = express.Router();

router.route("/profile").get(userController.profile);
router.route("/:userId").get(userController.user)






module.exports = router;
