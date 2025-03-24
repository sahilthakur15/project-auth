const Messages = require("../utilites/message.js");
const response = require("../utilites/apiResponse.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    console.log("Received Auth Header:", authToken); // Debugging line

    if (!authToken) {
        return response.error(res, { status: 403, message: Messages.AUTH.TOKEN_MISSING });
    }

    try {
        const token = authToken.split(" ")[1];
        console.log("Extracted Token:", token); // Debugging line

        if (!process.env.JWT_SECRET) {
            return response.error(res, { status: 500, message: "JWT_SECRET_KEY is missing in environment variables" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded User:", decoded); // Debugging line

        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Debugging line
        return response.error(res, { status: 401, message: Messages.AUTH.TOKEN_INVALID, error: error.message });
    }
};

module.exports = authMiddleware;
