import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Userslist.css";
import { FaUserShield, FaUser, FaTrash } from "react-icons/fa";
import { fetchUsers, toggleUserRole, deactivateUserService } from "../services/adminUserService"; // Updated function name

export default function UsersList() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const usersData = await fetchUsers();
      // Separate active and inactive users
      const active = usersData.filter(user => user.status === "active");
      const inactive = usersData.filter(user => user.status === "inactive");
      
      setActiveUsers(active);
      setInactiveUsers(inactive);
    } catch (error) {
      console.error("Error fetching users", error);
      setActiveUsers([]);
      setInactiveUsers([]);
    }
  };

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    if (window.confirm(`Are you sure you want to change role to ${newRole}?`)) {
      try {
        const response = await toggleUserRole(userId, currentRole);
        if (response?.error) {
          alert(response.error);
        } else {
          alert(`Role updated successfully to ${newRole}!`);
          fetchUsersData();
        }
      } catch (error) {
        console.error("❌ Error updating user role:", error);
        alert("Failed to update role. Please try again.");
      }
    }
  };

  const handleDeactivate = async (userId) => {
    if (window.confirm("Are you sure you want to deactivate this user?")) {
      try {
        const response = await deactivateUserService(userId);
        if (response?.error) {
          alert(response.error);
        } else {
          alert("User deactivated successfully!");
          fetchUsersData();
        }
      } catch (error) {
        console.error("❌ Error deactivating user:", error);
        alert("Failed to deactivate user. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      {/* Go Back to Dashboard Button */}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/AdminDashboard")}>
          ← Go Back to Dashboard
        </button>
      </div>

      <h1 className="users-title text-center mb-4">Users List</h1>

      {/* Active Users */}
      <h2 className="text-success mb-4">Active Users</h2>
      <div className="users-grid">
        {activeUsers.map((user) => {
          let avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`;

          return (
            <div key={user._id} className="user-card">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <img src={avatarUrl} alt={user.username} className="user-avatar" />

                  <h5 className="card-title mt-2">{user.username}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Role:</strong> {user.role}
                  </p>
                  <div className="action-buttons">
                    <button
                      className={`btn ${user.role === "admin" ? "btn-secondary" : "btn-warning"} me-2`}
                      onClick={() => handleRoleToggle(user._id, user.role)}
                    >
                      {user.role === "admin" ? <FaUser /> : <FaUserShield />}{" "}
                      {user.role === "admin" ? "Make User" : "Make Admin"}
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDeactivate(user._id)}>
                      <FaTrash /> Deactivate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inactive Users */}
      <h2 className="text-danger mt-5">Inactive Users</h2>
      <div className="users-grid">
        {inactiveUsers.length > 0 ? (
          inactiveUsers.map((user) => {
            let avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`;

            return (
              <div key={user._id} className="user-card">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <img src={avatarUrl} alt={user.username} className="user-avatar" />

                    <h5 className="card-title mt-2">{user.username}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="card-text">
                      <strong>Status:</strong> <span className="text-danger">Inactive</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No inactive users</p>
        )}
      </div>
    </div>
  );
}
