const Messages = {
    USER: {
        LOGIN_SUCCESS: "Logged in successfully",
        LOGIN_FAILED: "Login failed! Invalid credentials",
        SIGNUP_SUCCESS: "User registered successfully",
        SIGNUP_EXIST: "User already exists",
        SIGNUP_FAILED: "User registration failed",
        EMAIL_EXISTS: "Email already in use",
        INVALID_EMAIL: "Invalid email format",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_WEAK: "Password must be at least 8 characters long",
    },
    AUTH: {
        TOKEN_MISSING: "Authorization token is missing",
        TOKEN_INVALID: "Invalid or expired token",
        ACCESS_DENIED: "Access denied! Unauthorized user",
    },
    VALIDATION: {
        REQUIRED_FIELDS: "Please fill in all required fields",
        INVALID_INPUT: "Invalid input data",
    },
    SYSTEM: {
        SERVER_ERROR: "An unexpected error occurred. Please try again later",
    }
};

module.exports = Messages;
    