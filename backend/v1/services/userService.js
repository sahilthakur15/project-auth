const User = require("../models/userModel");
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");


// get all users
const getAllUser = async () => {
    return await User.find({role:{$in:["user","admin"]}});
};

// get user by id
const getUserById = async (id) => {
    return await User.findById(id);
};

// update user role
const updateUserRole  = async (id, newRole) => {
    return await User.findByIdAndUpdate(id, {role:newRole}, {new : true});
};

// Soft delete user by updating status to "inactive"
const updateUserStatus = async (id, status) => {
    return await User.findByIdAndUpdate(id, { status }, { new: true });
};

// edit profile
const updateUserProfile = async (userId, updateData) => {
       // Find the user by ID
        const user = await User.findByIdAndUpdate(userId, updateData ,{new:true});
        return user;
};
  



module.exports = {
    getAllUser,
    getUserById,
    updateUserRole,
    updateUserStatus,
    updateUserProfile,
}