import { editProfile } from "../utils/axiosInstance";

export const updateUsername = async (userId, username) => {
  try {
    const updateData = { username }; // Only update the username
    const result = await editProfile(userId, updateData); // Call the axiosInstance function

    if (result.error) {
      // Handle failure if error exists
      return { error: result.error };
    } else {
      // Successfully updated profile
      return { success: "Username updated successfully.", user: result };
    }
  } catch (err) {
    console.error("Error in updateUsername service:", err);
    return { error: "An error occurred while updating username." };
  }
};

