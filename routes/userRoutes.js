const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/userController");
const { loginUser, getProfile, logoutUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;