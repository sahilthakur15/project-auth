import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaFilm, FaRupeeSign } from "react-icons/fa";
import Navbar from "../components/Navbar";
import "../style/AdminDash.css";
import { fetchUserCount, fetchMovieCount, fetchTotalRevenue } from "../services/adminDashService";
import Loader from "../utils/Loader";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [users, movies, revenue] = await Promise.all([
          fetchUserCount(),
          fetchMovieCount(),
          fetchTotalRevenue(),
        ]);
        setUserCount(users);
        setMovieCount(movies);
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="dashboard-container">
          <div className="dashboard-cards">
            <div className="stat-card" onClick={() => navigate("/users-list")}>
              <div className="icon-container">
                <FaUser size={40} color="#ff758c" />
              </div>
              <div className="stat-details">
                <h3>Total Users</h3>
                <p>{userCount}</p>
              </div>
            </div>

            <div className="stat-card" onClick={() => navigate("/movies-list")}>
              <div className="icon-container">
                <FaFilm size={40} color="#4CAF50" />
              </div>
              <div className="stat-details">
                <h3>Total Movies</h3>
                <p>{movieCount}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon-container">
                <FaRupeeSign size={40} color="#FFC107" />
              </div>
              <div className="stat-details">
                <h3>Total Revenue</h3>
                <p>{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
