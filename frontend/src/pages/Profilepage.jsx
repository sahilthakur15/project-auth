import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader"; // Import the loader component
import "../style/Profile.css"; // Ensure you have this CSS file

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken); // Set user data from token
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="profile-body">
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-card">
          {user === null ? (
            <Loader /> // Show loader if user data is not available yet
          ) : (
            <div className="profile-details">
              {/* Avatar */}
              <img
                src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`}
                alt="User Avatar"
                className="profile-avatar"
              />
              <h3 className="profile-username">{user.username}</h3>
              <p className="profile-email">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="profile-role">
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
