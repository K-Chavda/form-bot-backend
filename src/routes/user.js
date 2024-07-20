const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/", verifyToken, userController.updateUserDetails);

module.exports = router;
