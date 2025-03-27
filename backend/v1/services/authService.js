const User = require("../models/userModel"); // Importing user model
const APIResponse = require("../utilites/apiResponse");

// Find user by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Create new user
const createUser = async (userData) => {
    return await User.create(userData); 
};

module.exports = {
    findUserByEmail,
    createUser,
};
