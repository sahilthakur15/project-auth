import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaFilm, FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign instead of FaDollarSign
import Navbar from "../components/Navbar";
import "../style/AdminDash.css";
import { getMoviesCount, getTotalRevenue, getUserCount } from "../utils/axiosInstance";


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0); // State for total revenue

  useEffect(() => {
    fetchUserCount();
    fetchMovieCount();
    fetchTotalRevenue();
  }, []);

  
 // Function to fetch total users count
 const fetchUserCount = async () => {
  // const token = localStorage.getItem("token");
  // if (!token) return console.error("🚨 No token found!");

  try {
    const count = await getUserCount();
    setUserCount(count);

  } catch(error) {
      console.error("❌ Error fetching user count:", error);
  setUserCount(0);
  }
};

// Function to fetch total movies count
const fetchMovieCount = async () => {
  // const token = localStorage.getItem("token");
  // if (!token) return console.error("🚨 No token found!");

  try {
    const count = await getMoviesCount();
    setMovieCount(count);
} catch (error) {
    console.error("❌ Error fetching movie count:", error);
    setMovieCount(0);
}
};

  // Function to fetch total revenue from all completed orders
  const fetchTotalRevenue = async () => {
    // const token = localStorage.getItem("token");
    // if (!token) return console.error("🚨 No token found!");
    try {
      const revenue = await getTotalRevenue();
      setTotalRevenue(revenue);
  } catch (error) {
      console.error("❌ Error fetching revenue:", error);
      setTotalRevenue(0);
  }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-cards">
          
          {/* Total Users Card */}
          <div className="stat-card" onClick={() => navigate("/users-list")}>
            <div className="icon-container">
              <FaUser size={40} color="#ff758c" />
            </div>
            <div className="stat-details">
              <h3>Total Users</h3>
              <p>{userCount}</p>
            </div>
          </div>

          {/* Total Movies Card */}
          <div className="stat-card" onClick={() => navigate("/movies-list")}>
            <div className="icon-container">
              <FaFilm size={40} color="#4CAF50" />
            </div>
            <div className="stat-details">
              <h3>Total Movies</h3>
              <p>{movieCount}</p>
            </div>
          </div>

          {/* Total Revenue Card */}
<div className="stat-card">
  <div className="icon-container">
    <FaRupeeSign size={40} color="#FFC107" /> {/* Use FaRupeeSign here */}
  </div>
  <div className="stat-details">
    <h3>Total Revenue</h3>
    <p>{totalRevenue.toLocaleString()}</p> {/* Format currency */}
  </div>
</div>


        </div>
      </div>
    </>
  );
}
