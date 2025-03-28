import { signupUser, loginUser } from "../utils/axiosInstance";
import { setLocalStorage } from "../utils/localStorageUtil";
import MESSAGES from "../utils/message";

// ✅ Function to handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await signupUser(userData);
    console.log("Signup Response:", response);

    if (response.status === 201) {
      return { success: true, message: MESSAGES.AUTH.signupSuccess };
    } else {
      throw new Error(MESSAGES.AUTH.signupFailure);
    }
  } catch (error) {
    console.error("Signup Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || MESSAGES.AUTH.signupFailure);
  }
};

// ✅ Function to handle user login
export const authenticateUser = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    console.log("🔍 Full login response:", response); // Debugging

    // Check if loginUser returned an error message
    if (response.error) {
      throw new Error(response.message || "Login failed. Please try again.");
    }

    const user = response?.data?.user;
    if (!user) {
      throw new Error("Invalid login response: User not found.");
    }

    const token = response?.data?.token;
    if (!token) {
      throw new Error("Invalid login response: Token missing.");
    }

    setLocalStorage("token", token);
    setLocalStorage("userRole", user.role);

    return { success: true, role: user.role };
  } catch (error) {
    console.error("❌ Login Error:", error);
    throw new Error(error.message || "Login failed. Please try again.");
  }
};





