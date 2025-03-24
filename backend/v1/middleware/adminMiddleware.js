const Messages = require("../utilites/message.js");
const response = require("../utilites/apiResponse.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return response.error(res, { status: 403, message: Messages.AUTH.TOKEN_MISSING });
    }

    try {
        const token = authToken.split(" ")[1];

        if (!process.env.JWT_SECRET) {
            return response.error(res, { status: 500, message: "JWT_SECRET_KEY is missing in environment variables" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return response.error(res, { status: 401, message: Messages.AUTH.TOKEN_INVALID, error: error.message });
    }
};

module.exports = adminMiddleware;
