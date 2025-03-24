const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (user) => {  
    // Check if JWT_SECRET is set in environment variables
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }

    // Generate a token
    const token = jwt.sign(
        { id: user._id, role: user.role, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
    );

    console.log("✅ Token generated:", token); // Debug log

    return token; // ✅ Return the token
};

module.exports = { generateToken };
