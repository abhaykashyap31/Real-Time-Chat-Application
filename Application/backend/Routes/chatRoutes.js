const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const accessChat = require("../controllers/chatControllers");
router.route('/').post(protect, accessChat);
// router.route('/').post(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

module.export = router;

