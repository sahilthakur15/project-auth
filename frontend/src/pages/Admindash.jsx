import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaFilm, FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign instead of FaDollarSign
import Navbar from "../components/Navbar";
import "../style/AdminDash.css";
import { fetchUserCount, fetchMovieCount, fetchTotalRevenue } from "../services/adminDashService"; // Import services


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchUserCountData();
    fetchMovieCountData();
    fetchTotalRevenueData();
  }, []);

  const fetchUserCountData = async () => {
    const count = await fetchUserCount(); // This will call the service
    setUserCount(count);
  };

  const fetchMovieCountData = async () => {
    const count = await fetchMovieCount(); // This will call the service
    setMovieCount(count);
  };

  const fetchTotalRevenueData = async () => {
    const revenue = await fetchTotalRevenue(); // This will call the service
    setTotalRevenue(revenue);
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
