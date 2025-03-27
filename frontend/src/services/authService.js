import { signupUser, loginUser } from "../utils/axiosInstance";
import { setLocalStorage } from "../utils/localStorageUtil";
import MESSAGES from "../utils/message";

// ✅ Function to handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await signupUser(userData);
    console.log("Signup Response:", response);

    if (response.status === 201) {
      return { success: true, message: MESSAGES.AUTH.SIGNUP_SUCCESS };
    } else {
      throw new Error(MESSAGES.AUTH.SIGNUP_ERROR);
    }
  } catch (error) {
    console.error("Signup Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || MESSAGES.AUTH.SIGNUP_ERROR);
  }
};

// ✅ Function to handle user login
export const authenticateUser = async (email, password) => {
  try {
    const response = await loginUser({ email, password });
    console.log("🔍 Full login response:", response); // Debugging

    if (response?.status === 403) {
      throw new Error(response.message || "Your account is inactive. Please contact support.");
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
    console.error("❌ Login Error:", error.message);
    throw new Error(error.message || "Login failed. Please try again.");
  }
};




