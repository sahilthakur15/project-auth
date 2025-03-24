import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilm, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode"; // Correct import
import "swiper/css";
import "swiper/css/pagination";
import "../style/Userdash.css";
import { userMovies } from "../utils/axiosInstance";

const UserDash = () => {
  const [movies, setMovies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [userId, setUserId] = useState(null); // Add userId state
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    fetchUserName(); // Fetch username and userId from token
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const movies = await userMovies();
      setMovies(movies);
    } catch (error) {
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserName = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.username || "Guest");
        setUserId(decodedToken._id); // Set userId
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingMovies = filteredMovies.filter((movie) => movie.category === "Upcoming");
  const nowPlayingMovies = filteredMovies.filter((movie) => movie.category === "Now Playing");

  return (
    <div className="userdash-container">
      <nav className="userdash-navbar">
      <h1 className="movies-navbar-title">
  <img 
    src="https://media.licdn.com/dms/image/v2/D4D3DAQExvhSHO7vvhQ/image-scale_191_1128/image-scale_191_1128/0/1706972400034/book_karo_cover?e=2147483647&v=beta&t=-UDjCOjg-Qd1EcfVG5q0BZYCWGK_etLmtaywvf-mQ6c" 
    alt="Book-Karo Logo" 
    className="movies-navbar-logo"
  />
</h1>

        <div className="navbar-right">
          <div className="profile-container">
            <button
              className="profile-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
              <span className="user-name">{userName}</span>
            </button>

            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
              <button onClick={() => navigate("/profile")}>
                <FontAwesomeIcon icon={faUser} className="dropdown-icon" /> Profile
              </button>
              <button onClick={() => navigate("/orders")}>
                <FontAwesomeIcon icon={faFilm} className="dropdown-icon" /> Orders
                </button>
              <button onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="dropdown-icon" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Swiper
        className="userdash-carousel mt-3"
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <img src="https://static1.squarespace.com/static/56a1633ac21b86f80ddeacb4/t/66bf5d4014d6d3745b72d72e/1723817280771/the+substance+banner.jpg?format=1500w" alt="Movie 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://streamcoimg-a.akamaihd.net/000/390/615/390615-Banner-L2-5910462c50979976730b358bb59c3ec1.jpg" alt="Movie 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ytimg.com/vi/1s-Ko4J3mWs/maxresdefault.jpg" alt="Movie 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.heavenofhorror.com/wp-content/uploads/2025/02/Counterattack-Counterstrike-Netflix-Review.jpg" alt="Movie 4" />
        </SwiperSlide>
      </Swiper>

      <div className="userdash-filters">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Movies</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Now Playing">Now Playing</option>
        </select>
      </div>

      <div className="userdash-movies">
        {loading && <p>Loading movies...</p>}
        {error && <p className="error">{error}</p>}

        {(selectedCategory === "All" || selectedCategory === "Upcoming") && upcomingMovies.length > 0 && (
          <div className="movie-section">
            <h2 className="section-heading">Upcoming Movies</h2>
            <div className="movie-grid">
              {upcomingMovies.map((movie) => (
                <div key={movie._id} className="movie-card" onClick={() => navigate(`/movie-details/${movie._id}`)}>
                  <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                  <h3>{movie.title}</h3>
                  <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
                  <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(selectedCategory === "All" || selectedCategory === "Now Playing") && nowPlayingMovies.length > 0 && (
          <div className="movie-section">
            <h2 className="section-heading">Now Playing</h2>
            <div className="movie-grid">
              {nowPlayingMovies.map((movie) => (
                <div key={movie._id} className="movie-card" onClick={() => navigate(`/movie-details/${movie._id}`)}>
                  <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                  <h3>{movie.title}</h3>
                  <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
                  <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {orders.length > 0 && (
          <div className="orders-section">
            <h2>Your Orders</h2>
            {loadingOrders ? <p>Loading orders...</p> : orders.map((order) => (
              <div key={order._id} className="order-card">
                <h3>{order.movieId.title}</h3>
                <p>Status: {order.paymentStatus}</p>
              </div>
            ))}
          </div>
        )}
        {ordersError && <p className="error">{ordersError}</p>}
      </div>
    </div>
  );
};

export default UserDash;
