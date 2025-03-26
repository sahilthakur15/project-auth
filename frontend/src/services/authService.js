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
    const token = response?.data?.token;
    const role = response?.data?.user?.role;

    if (token) {
      setLocalStorage("token", token);
      setLocalStorage("userRole", role);
      console.log("Token & role stored:", token, role);

      return { success: true ,role };
    } else {
      throw new Error(MESSAGES.AUTH.invalidLoginResponse);
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || MESSAGES.AUTH.loginFailure);
  }
};


