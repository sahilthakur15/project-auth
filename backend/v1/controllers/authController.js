const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Importing user model
const { generateToken } = require("../utilites/jwtUtility");
const { hashPassword } = require("../utilites/passHandler");
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");
const authService = require("../services/authService")
const { emailRegex, passwordRegex, fullNameRegex } = require("../utilites/validators");


require("dotenv").config(); // Load environment variables

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

     // Validate required fields
     if (!username || !email || !password) {
      return APIResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.REQUIRED_FIELDS,
      });
    }
    // Validate username
    if(!fullNameRegex.test(username)){
      return APIResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_FULL_NAME,
      });
    }

    // Validate email
    if(!emailRegex.test(email)){
      return APIResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_EMAIL,
      });
    }

    // Validate password
    if(!passwordRegex.test(password)){
      return APIResponse.error(res, {
        status: 400,
        message: Messages.VALIDATION.INVALID_PASSWORD,
      });
    }

    // Check if user already exists
    const isUserExist = await authService.findUserByEmail(email);
    if (isUserExist) {
      return APIResponse.error(res, {
        status: 400,
        message: Messages.USER.SIGNUP_EXIST,
      });
    }

    // Hash password
    const hashedPass = await hashPassword(password);

    // Create new user
    const newUser = await authService.createUser({ username, email, password: hashedPass, role });
    return APIResponse.success(res, {
      status: 201,
      message: Messages.USER.SIGNUP_SUCCESS,
      data: newUser
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
    const user = await authService.findUserByEmail(email);

    if (!user) {
      return APIResponse.error(res, {
        status: 404,
        message: Messages.USER.NOT_FOUND,
      });
    }

    console.log("User found:", user);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return APIResponse.error(res, {
        status: 401,
        message: Messages.VALIDATION.INCORRECT_PASSWORD,
      });
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
      message: Messages.USER.LOGIN_FAILED,
      err,
    });
  }
};


// Exporting the functions
module.exports = { register, login };
