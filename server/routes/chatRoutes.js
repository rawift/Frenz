const express = require("express")
const chatController = require("../controller/chatController")

const router = express.Router();

router.route("/create").post(chatController.createChat);
router.route("/:userId").get(chatController.userChats)
router.route("/find/:firstId/:secondId").get(chatController.findChats)






module.exports = router;
