import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../style/Movies.css";
import MoviesNavbar from "../components/Moviesbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilm, faTrash, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { getAllMovies, deleteMovie } from "../services/adminMovieService"; // Importing service functions

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRefs = useRef({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchMovies();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await getAllMovies();
      console.log("Movies fetched:", response);
      // Access the movies from the 'data' key
      if (response && response.data) {
        setMovies(response.data);  // Set movies to the array inside 'data'
      } else {
        setMovies([]);  // In case response doesn't have 'data' or is invalid
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Default to empty array on error
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await deleteMovie(movieId); // Use the deleteMovie service

        if (response?.error) {
          alert(response.error); // Alert if unauthorized
        } else {
          alert("✅ Movie deleted successfully!");
          fetchMovies(); // Refresh movie list
        }
      } catch (error) {
        console.error("❌ Error deleting movie:", error);
        alert("❌ Failed to delete movie. Please try again.");
      }
    }
  };

  const toggleMenu = (movieId) => {
    console.log(`Toggling menu for: ${movieId}`); // ✅ Debug log
    setMenuOpen((prev) => (prev === movieId ? null : movieId));
  };

  const handleClickOutside = (event) => {
    if (menuOpen && menuRefs.current[menuOpen] && !menuRefs.current[menuOpen].contains(event.target)) {
      setMenuOpen(null);
    }
  };

  if (loading) return <p className="movies-loading-text">Loading movies...</p>;

  return (
    <>
      <MoviesNavbar fetchMovies={fetchMovies} />
      <div className="movies-container">
        {/* Now Playing Section */}
        <h2 className="movies-now-playing-title">Now Playing</h2>
        <div className="movies-grid">
          {movies
            .filter((movie) => movie.category === "Now Playing")
            .map((movie) => (
              <div key={movie._id} className="movies-card">
                <div className="menu-container" ref={(el) => (menuRefs.current[movie._id] = el)}>
                  <button className="menu-btn" onClick={() => toggleMenu(movie._id)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {menuOpen === movie._id && (
                    <div className="menu-dropdown">
                      <button className="delete-btn" onClick={() => handleDeleteMovie(movie._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                <h3>{movie.title}</h3>
                <p>
                  <FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}
                </p>
                <p>
                  <FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}
                </p>
              </div>
            ))}
        </div>

        {/* Upcoming Section */}
        <h2 className="movies-upcoming-title">Upcoming</h2>
        <div className="movies-grid">
          {movies
            .filter((movie) => movie.category === "Upcoming")
            .map((movie) => (
              <div key={movie._id} className="movies-card">
                <div className="menu-container" ref={(el) => (menuRefs.current[movie._id] = el)}>
                  <button className="menu-btn" onClick={() => toggleMenu(movie._id)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {menuOpen === movie._id && (
                    <div className="menu-dropdown">
                      <button className="delete-btn" onClick={() => handleDeleteMovie(movie._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                <h3>{movie.title}</h3>
                <p>
                  <FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}
                </p>
                <p>
                  <FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
