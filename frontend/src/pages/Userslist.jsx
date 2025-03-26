import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../style/Userslist.css";
import { FaUserShield, FaUser, FaTrash } from "react-icons/fa"; // Added FaUser icon
import { fetchUsers, toggleUserRole, deleteUser } from "../services/adminUserService"; // Import the service functions

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([]);
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

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await deleteUser(userId);
        if (response?.error) {
          alert(response.error);
        } else {
          alert("User deleted successfully!");
          fetchUsersData();
        }
      } catch (error) {
        console.error("❌ Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
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

      <div className="users-grid">
        {users.map((user) => {
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
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
