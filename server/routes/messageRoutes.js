const express = require("express")
const messageController = require("../controller/messageController")

const router = express.Router();

router.route("/add").post(messageController.addMessage);
router.route("/:chatId").get(messageController.getMessage)
router.route("/recent/:chatId").get(messageController.recentMessage)




module.exports = router;
