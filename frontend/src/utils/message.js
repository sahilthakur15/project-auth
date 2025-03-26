const MESSAGES = {
    // ✅ Authentication Messages
    AUTH: {
      LOGIN_SUCCESS: "✅ Login successful! Redirecting...",
      LOGIN_ERROR: "❌ Invalid email or password. Please try again.",
      SIGNUP_SUCCESS: "✅ Signup successful! You can now log in.",
      SIGNUP_ERROR: "❌ Signup failed. Please check your details and try again.",
      LOGOUT_SUCCESS: "✅ Logout successful.",
      UNAUTHORIZED: "⚠️ You are not authorized to access this page.",
      SESSION_EXPIRED: "⚠️ Session expired. Please log in again.",
    },
  
    // ✅ User Management Messages (Admin Actions)
    USERS: {
      FETCH_SUCCESS: "✅ Users fetched successfully.",
      FETCH_ERROR: "❌ Error fetching users. Please try again.",
      DELETE_SUCCESS: (userId) => `✅ User ${userId} deleted successfully.`,
      DELETE_ERROR: "❌ Error deleting user. Please try again.",
      UPDATE_SUCCESS: "✅ User updated successfully.",
      UPDATE_ERROR: "❌ Error updating user. Please check the details.",
    },
  
    // ✅ Movie Management Messages (Admin Actions)
    MOVIES: {
      FETCH_SUCCESS: "✅ Movies fetched successfully.",
      FETCH_ERROR: "❌ Error fetching movies. Please try again.",
      FETCH_ONE_SUCCESS: "✅ Movie details fetched successfully.",
      FETCH_ONE_ERROR: "❌ Error fetching movie details. Please try again.",
      ADD_SUCCESS: "🎬 Movie added successfully!",
      ADD_ERROR: "❌ Error adding movie. Please check the details.",
      DELETE_SUCCESS: "✅ Movie deleted successfully.",
      DELETE_ERROR: "❌ Error deleting movie. Please try again.",
      UPDATE_SUCCESS: "✅ Movie updated successfully.",
      UPDATE_ERROR: "❌ Error updating movie. Please check the details.",
    },
  
    // ✅ Booking Messages (User Actions)
    BOOKING: {
      SUCCESS: "🎟 Booking successful! Enjoy your movie!",
      ERROR: "❌ Booking failed. Please check your details and try again.",
      PAYMENT_UPDATE_SUCCESS: "✅ Payment status updated successfully.",
      PAYMENT_UPDATE_ERROR: "❌ Error updating payment status. Please try again.",
      INSUFFICIENT_TICKETS: "⚠️ Not enough tickets available. Please choose fewer seats.",
    },
  
    // ✅ Order Messages (User Actions)
    ORDERS: {
      FETCH_SUCCESS: "✅ Orders fetched successfully.",
      FETCH_ERROR: "❌ Error fetching user orders. Please try again.",
      CANCEL_SUCCESS: "✅ Order canceled successfully.",
      CANCEL_ERROR: "❌ Error canceling order. Please try again.",
    },
  
    // ✅ Authorization Messages (Restricted Access)
    AUTHORIZATION: {
      ACCESS_DENIED: "🚫 Access denied. You do not have permission for this action.",
      ADMIN_REQUIRED: "⚠️ Admin access required.",
      USER_REQUIRED: "⚠️ User access required.",
      SUPERADMIN_REQUIRED: "⚠️ Super Admin access required.",
    },
  
    // ✅ System-Level Messages (Errors, Unknown Issues)
    SYSTEM: {
      SERVER_ERROR: "❌ A server error occurred. Please try again later.",
      UNKNOWN_ERROR: "⚠️ Something went wrong. Please refresh and try again.",
      CONNECTION_ERROR: "❌ Unable to connect to the server. Check your internet connection.",
      INVALID_RESPONSE: "⚠️ Unexpected server response. Please try again.",
    },
  };
  
  export default MESSAGES;
  