const User = require("../models/userModel")


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

// delete user
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};


module.exports = {
    getAllUser,
    getUserById,
    updateUserRole,
    deleteUser,
}