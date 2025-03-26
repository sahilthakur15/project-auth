// services/orderService.js
import { getLocalStorage } from "../utils/localStorageUtil"; // Importing localStorage utility
import { getUserOrders } from "../utils/axiosInstance";  // Assuming this function is already defined


// Function to fetch orders based on userId
export const fetchOrdersByUserId = async () => {
    try {
      const token = getLocalStorage("token");  // Use getLocalStorage to retrieve the token
      if (!token) {
        throw new Error("Authorization token is missing.");
      }
  
      const ordersData = await getUserOrders(token);  // Make API call with token
      return ordersData;
    } catch (error) {
      throw new Error("Failed to fetch orders. Please try again.");
    }
  };