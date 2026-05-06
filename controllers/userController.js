const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { RESPONSES } = require("../utils/responses");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(RESPONSES.USER_NOT_FOUND.code).json(RESPONSES.USER_NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(RESPONSES.INVALID_CREDENTIALS.code).json(RESPONSES.INVALID_CREDENTIALS);
    }

    // 🔥 SESSION CREATE
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.json({
      message: "Login successful (session created)",
      user: req.session.user,
    });

  } catch (error) {
    res.status(RESPONSES.SERVER_ERROR.code).json(RESPONSES.SERVER_ERROR);
  }
};

const getProfile = (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user
  });
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(RESPONSES.SERVER_ERROR.code).json(RESPONSES.SERVER_ERROR);
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(RESPONSES.VALIDATION_ERROR.code).json(RESPONSES.VALIDATION_ERROR);
    }

    // check if user exists
    const existingUser = await User.findOne({ where: { email } });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      return res.status(RESPONSES.VALIDATION_ERROR.code).json(RESPONSES.VALIDATION_ERROR);
    }

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(RESPONSES.USER_CREATED.code).json(RESPONSES.USER_CREATED);

  } catch (error) {
    res.status(RESPONSES.SERVER_ERROR.code).json(RESPONSES.SERVER_ERROR);
  }
};



module.exports = { createUser, loginUser, getProfile, logoutUser };