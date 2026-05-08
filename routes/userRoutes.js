const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const { userRegisterSchema } = require("../validators/userSchema");

router.post("/register", validateRequest(userRegisterSchema), createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
// router.post("/logout", authMiddleware, logoutUser);

module.exports = router;