import { getUsersByStatus, deactivateUser, updateUserRole } from "../utils/axiosInstance";

// Fetch all users
export const fetchUsers = async (status = "active") => {
  try {
    const users = await getUsersByStatus(status);
    return users || [];
  } catch (error) {
    console.error(`❌ Error fetching ${status} users:`, error);
    return [];
  }
};


// Update user role (admin or user)
export const toggleUserRole = async (userId, currentRole) => {
  const newRole = currentRole === "admin" ? "user" : "admin"; // Toggle the role

  try {
    const response = await updateUserRole(userId, newRole);
    return response;
  } catch (error) {
    console.error("❌ Error updating user role:", error);
    return { error: "Failed to update user role. Please try again." };
  }
};

// Delete a user
// export const deleteUser = async (userId) => {
//   try {
//     const response = await removeUser(userId);
//     return response;
//   } catch (error) {
//     console.error("❌ Error deleting user:", error);
//     return { error: "Failed to delete user. Please try again." };
//   }
// };
export const deactivateUserService = async (userId) => {
  try {
    const response = await deactivateUser(userId);
    return response;
  } catch (error) {
    console.error("❌ Error deactivating user:", error);
    return { error: "Failed to deactivate user. Please try again." };
  }
};

