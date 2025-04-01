const Messages = {
    USER: {
        LOGIN_SUCCESS: "Logged in successfully",
        LOGIN_FAILED: "Login failed! Invalid credentials",
        NOT_FOUND: "User not found. Please check your email or register first.",
        SIGNUP_SUCCESS: "User registered successfully",
        SIGNUP_EXIST: "User already exists",
        SIGNUP_FAILED: "User registration failed",
    },
    AUTH: {
        TOKEN_MISSING: "Authorization token is missing",
        TOKEN_INVALID: "Invalid or expired token",
        ACCESS_DENIED: "Access denied! Unauthorized user",
    },
    VALIDATION: {
        REQUIRED_FIELDS: "Please fill in all required fields",
        INVALID_INPUT: "Invalid input data",
        INVALID_FULL_NAME: "Full name must only contain alphabets and spaces, and be 3-50 characters long.",
        INVALID_EMAIL: "Invalid email format. Please enter a valid email address.",
        INVALID_PASSWORD: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
        EMAIL_EXISTS: "Email already in use",
        INCORRECT_PASSWORD: "Incorrect password",
    },
    SYSTEM: {
        SERVER_ERROR: "An unexpected error occurred. Please try again later",
    },
    ADMIN: {
        USER_RETRIVED: "Users retrieved successfully",
        USER_RETRIVED_Fail: "Failed to retrieve users",
        USER_BY_ID: "User retrieved successfully",
        USER_BY_ID_FAIL: "Failed to retrieve user",
        ROLE_UPDATED: (role) => `User role changed to ${role} successfully.`,
    DELETE_SUCCESS: "User deleted successfully.",
    DELETE_FORBIDDEN: "Only Super Admin can delete users.",
    },
    MOVIES: {
        REQUIRED_FIELDS: "All required fields must be filled.",
        INVALID_CATEGORY: "Invalid category. Category must be either 'Now Playing' or 'Upcoming'.",
        INVALID_RATING: "Rating must be between 0 and 10.",
        MOVIE_ADDED: "Movie added successfully!",
        MOVIE_FETCH_SUCCESS: "Movies fetched successfully.",
        MOVIE_NOT_FOUND: "Movie not found in the database.",
        MOVIE_DELETED: "Movie deleted successfully.",
        ERROR_ADDING_MOVIE: "Error adding movie.",
        ERROR_FETCHING_MOVIES: "Error fetching movies.",
        ERROR_DELETING_MOVIE: "Error deleting movie.",
        AUTH_FORBIDDEN: "Only Super Admin can change status.",
        MOVIE_STATUS_UPDATED: "Movie status updated successfully.",
        MOVIE_STATUS_UPDATED_ERROR: "Error updating movie status.",
        MOVIE_UPDATED: "Movie updated successfully.",
        MOVIE_UPDATED_ERROR: "Error updating movie.",

    },
    ORDERS: {
        REQUIRED_FIELDS: "All required fields must be filled.",
        USER_NOT_FOUND: "User not found. Please check the user details.",
        MOVIE_NOT_FOUND: "Movie not found. Please check the movie ID.",
        INVALID_TICKET_NUMBER: "Number of tickets must be at least 1.",
        INVALID_PAYMENT_STATUS: "Invalid payment status. Status must be 'Pending', 'Completed', or 'Failed'.",
        ORDER_PLACED: "Movie booked successfully!",
        ORDER_FETCH_SUCCESS: "Orders fetched successfully.",
        COMPLETED_ORDERS_FOUND: "Completed orders found.",
        ORDER_NOT_FOUND: "No orders found.",
        NO_COMPLETED_ORDERS: "No completed orders found.",
        PAYMENT_UPDATED: "Payment status updated successfully.",
        ERROR_BOOKING: "Error booking movie.",
        ERROR_FETCHING_ORDERS: "Error fetching orders.",
        ERROR_UPDATING_PAYMENT: "Error updating payment status.",
        BOOKING_SUCCESS: "Movie booked successfully!",
        BOOKING_FAILED: "Failed to book movie.",
    }
    
};

module.exports = Messages;
    