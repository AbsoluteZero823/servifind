const express = require("express");
const router = express.Router();
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");
// const { protect } = require("../middleware/authMiddleware");



router.route("/messages/:chatId").get(allMessages);
router.route("/message").post(sendMessage);

module.exports = router;