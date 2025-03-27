import { userMovies } from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { getLocalStorage, removeLocalStorage } from "../utils/localStorageUtil"; // Import local storage utils

// ✅ Fetch user details from token
export const getUserDetails = () => {
  const token = getLocalStorage("token"); // Using local storage utility

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return { username: decodedToken.username || "Guest", userId: decodedToken._id };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return { username: "Guest", userId: null };
};


// ✅ Fetch movies
export const fetchMoviesService = async () => {
  try {
    return await userMovies();
  } catch (error) {
    throw new Error("Failed to load movies. Please try again later.");
  }
};

// ✅ Logout function
export const logoutUser = (navigate) => {
  removeLocalStorage("token"); // Using local storage utility
  removeLocalStorage("role");
  navigate("/login");
};
