const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Importing user model
const { generateToken } = require("../utilites/jwtUtility");
const { hashPassword } = require("../utilites/passHandler");
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");

require("dotenv").config(); // Load environment variables

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return APIResponse.error(res, {
        status: 400,
        message: Messages.USER.SIGNUP_EXIST,
      });
    }

    // Hash password
    const hashedPass = await hashPassword(password);

    // Create new user
    const newUser = new User({ username, email, password: hashedPass, role });
    await newUser.save();

    return APIResponse.success(res, {
      status: 201,
      message: Messages.USER.SIGNUP_SUCCESS,
    });
  } catch (err) {
    return APIResponse.error(res, {
      status: 500,
      message: Messages.USER.SIGNUP_FAILED,
      err,
    });
  }
};


// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("Password matched");

    // Generate token
    const token = await generateToken(user);

    // Send response
    return APIResponse.success(res, {
      status: 200,
      message: Messages.USER.LOGIN_SUCCESS,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (err) {
    return APIResponse.error(res, {
      status: 500,
      message: "Error logging in user",
      err,
    });
  }
};


// Exporting the functions
module.exports = { register, login };
