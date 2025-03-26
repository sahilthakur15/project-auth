import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL, ADMIN, USER, AUTH } from "../routes/routes";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });
  

  

// Helper function to get token
const getToken = () => localStorage.getItem("token");

// Helper function to get role safely
const getUserRole = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.role; // Assuming JWT contains a `role` field
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

// Request Interceptor - Adds Token & User Role to Headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const role = getUserRole();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (role) {
      config.headers["User-Role"] = role; // Send role as custom header
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Unauthorized (401) Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "/login"; // Redirect to login on 401
    }
    return Promise.reject(error);
  }
);





// signup user function
export const signupUser = async (userData) => {
    try {
      const response = await axiosInstance.post(AUTH.AUTH_REGISTER, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  
  // login user function
  export const loginUser = async (credentials) => {
    try {
      const response = await axiosInstance.post(AUTH.AUTH_LOGIN, credentials);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };
  
  // admin user count function
  export const getUserCount = async () => {
    try {
      const response = await axiosInstance.get(ADMIN.ALL_USERS);
      return response.data?.data?.length || 0; // Ensure it returns a count
    } catch (err) {
      console.error("❌ Error fetching user count:", err.response?.data || err.message);
      return 0; // Return 0 in case of an error
    }
  };
  
  // admin movie count function
  export const getMoviesCount = async () => {
    try {
      const response = await axiosInstance.get(ADMIN.ALL_MOVIES);
  
      if (Array.isArray(response.data.data)) {
        return response.data.data.length; // ✅ Correctly returning the count
      } else {
        console.error("⚠ Unexpected API response format:", response.data);
        return 0;
      }
    } catch (err) {
      console.error("❌ Error fetching movies count:", err.response?.data || err.message);
      return 0;
    }
  };
  
  // admin total revenue function
  export const getTotalRevenue = async () => {
    try {
      const response = await axiosInstance.get(ADMIN.GET_ALL_ORDERS);
  
      if (Array.isArray(response.data?.data)) {
        // Filter only completed orders
        const completedOrders = response.data.data.filter(order => order.paymentStatus === "Completed");
  
        // Calculate total revenue
        return completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
      } else {
        console.error("⚠️ Unexpected orders response:", response.data);
        return 0;
      }
    } catch (err) {
      console.error("❌ Error fetching total revenue:", err.response?.data || err.message);
      return 0; // Return 0 in case of an error
    }
  };
  
  // admin get all users
  export const getallUsers = async () => {
    try {
      const response = await axiosInstance.get(ADMIN.ALL_USERS);
      return response.data?.data || []; // Ensure it returns a count
    } catch (err) {
      console.error("❌ Error fetching user count:", err.response?.data || err.message);
      return []; // Return 0 in case of an error
    }
  };
  
  //update roles
  export const updateUserRole = async (userId, currentRole) => {
    const role = getUserRole();
  
    if (role !== "superadmin") {
      console.warn("⛔ Access Denied: Only superadmins can update roles.");
      return { error: "Unauthorized action" };
    }
  
    try {
      const response = await axiosInstance.put(`${ADMIN.UPDATE_USER}/${userId}`);
      return response.data;
    } catch (err) {
      console.error("❌ Error updating user role:", err.response?.data || err.message);
      return { error: err.response?.data?.message || "Failed to update role" };
    }
  };
  
  // Admin delete user function (Only allowed for superadmin)
  export const removeUser = async (userId) => {
    const role = getUserRole();
  
    if (role !== "superadmin") {
      console.warn("⛔ Access Denied: Only superadmins can delete users.");
      return { error: "Unauthorized action" };
    }
  
    try {
      const response = await axiosInstance.delete(`${ADMIN.DELETE_USER}/${userId}`);
      return response.data;
    } catch (err) {
      console.error("❌ Error deleting user:", err.response?.data || err.message);
      return { error: err.response?.data?.message || "Failed to delete user" };
    }
  };
  
  // admin fetch all movies
  export const fetchAllMovies = async () => {
    try {
      const response = await axiosInstance.get(ADMIN.ALL_MOVIES);
      return response.data || [];
    } catch (err) {
      console.error("❌ Error fetching movies:", err.response?.data || err.message);
      return []; // Return an empty array in case of an error
    }
  };
  
  // Admin delete movie function (with role-based protection)
  export const removeMovie = async (movieId) => {
    try {
      const userRole = localStorage.getItem("userRole");
  
      if (userRole !== "superadmin") {
        alert("❌ You are not authorized to delete movies!");
        return { error: "Unauthorized action" };
      }
  
      const response = await axiosInstance.delete(`${ADMIN.DELETE_MOVIE}/${movieId}`);
      return response.data;
    } catch (err) {
      console.error("❌ Error deleting movie:", err.response?.data || err.message);
      return { error: "Failed to delete movie" };
    }
  };
  
  // Admin add movie function
  export const addMovie = async (movieData) => {
    try {
      const response = await axiosInstance.post(ADMIN.ADD_MOVIES, movieData);
      return response.data;
    } catch (err) {
      if (err.response?.status === 403) {
        return { error: "You are not authorized to add movies!" };
      }
      console.error("❌ Error adding movie:", err.response?.data || err.message);
      return { error: "Failed to add movie. Please try again." };
    }
  };
  
  // user movies
  export const userMovies = async () => {
    try {
      const response = await axiosInstance.get(USER.ALL_MOVIES);
      return response.data?.data || [];
    } catch (err) {
      console.error("❌ Error fetching movies:", err.response?.data || err.message);
      return []; // Return an empty array in case of an error
    }
  };
  
  // user get movie detail function
  export const getMovieDetail = async (movieId) => {
    try {
      const response = await axiosInstance.get(`${USER.MOVIE_DETAIL}/${movieId}`);
      return response.data?.data || null;
    } catch (err) {
      console.error("❌ Error fetching movie details:", err.response?.data || err.message);
    }
  };
  
  // user book movie function
  export const bookMovie = async (movieId, numTickets) => {
    try {
      const response = await axiosInstance.post(USER.BOOK_MOVIE, {
        movieId,
        numTickets,
        paymentStatus: "Pending",
      });
  
      console.log("✅ Booking Response:", response.data); // Debugging log
  
      return response.data?.data?.orderId || null;
    } catch (err) {
      console.error("❌ Error booking movie:", err.response?.data || err.message);
    }
  };
  
  // user payment function
  export const userPayment = async (orderId) => {
    try {
      const response = await axiosInstance.put(USER.UPDATE_STATUS, {
        orderId,
        paymentStatus: "Completed",
      });
  
      console.log("📢 API Response:", response); // Debugging log
  
      if (response.data?.status === 200) {
        console.log("✅ Payment status successfully updated!");
        return true;
      } else {
        console.log("❌ Unexpected response status:", response.data?.status);
        return false;
      }
    } catch (err) {
      console.error("❌ Error updating payment status:", err.response?.data || err.message);
      return false;
    }
  };
  
  // user all orders function
  export const getUserOrders = async () => {
    try {
      const response = await axiosInstance.get(USER.GET_BOOKED_MOVIES); // No userId needed
      return response.data?.data || []; // Return user's orders
    } catch (error) {
      console.error("❌ Error fetching user orders:", error.response?.data || error.message);
      throw error;
    }
  };
  

export default axiosInstance;