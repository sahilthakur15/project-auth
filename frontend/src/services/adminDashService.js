// src/services/adminDashService.js
import { getUserCount, getMoviesCount, getTotalRevenue } from "../utils/axiosInstance";
import { removeLocalStorage } from "../utils/localStorageUtil";

// Admin Dashboard Service Functions
export const fetchUserCount = async () => {
  try {
    const count = await getUserCount();
    return count;
  } catch (error) {
    console.error("❌ Error fetching user count:", error);
    return 0;
  }
};

export const fetchMovieCount = async () => {
  try {
    const count = await getMoviesCount();
    return count;
  } catch (error) {
    console.error("❌ Error fetching movie count:", error);
    return 0;
  }
};

export const fetchTotalRevenue = async () => {
  try {
    const revenue = await getTotalRevenue();
    return revenue;
  } catch (error) {
    console.error("❌ Error fetching revenue:", error);
    return 0;
  }
};


export const logoutUser = () => {
  removeLocalStorage("token");
  removeLocalStorage("userRole");
  
};