import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../style/Movies.css";
import MoviesNavbar from "../components/Moviesbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilm, faTrash, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { getAllMovies, deleteMovie } from "../services/adminMovieService"; // Importing service functions
import Loader from "../utils/Loader"; // Import Loader

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
      if (response && response.data) {
        setMovies(response.data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await deleteMovie(movieId);
        if (response?.error) {
          alert(response.error);
        } else {
          alert("✅ Movie deleted successfully!");
          fetchMovies();
        }
      } catch (error) {
        console.error("❌ Error deleting movie:", error);
        alert("❌ Failed to delete movie. Please try again.");
      }
    }
  };

  const toggleMenu = (movieId) => {
    console.log(`Toggling menu for: ${movieId}`);
    setMenuOpen((prev) => (prev === movieId ? null : movieId));
  };

  const handleClickOutside = (event) => {
    if (menuOpen && menuRefs.current[menuOpen] && !menuRefs.current[menuOpen].contains(event.target)) {
      setMenuOpen(null);
    }
  };

  if (loading) return <div className="loader-container"><Loader /></div>;

  return (
    <>
      <MoviesNavbar fetchMovies={fetchMovies} />
      <div className="movies-container">
        <h2 className="movies-now-playing-title">Now Playing</h2>
        <div className="movies-grid">
          {movies.filter((movie) => movie.category === "Now Playing").map((movie) => (
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
              <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
              <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
            </div>
          ))}
        </div>

        <h2 className="movies-upcoming-title">Upcoming</h2>
        <div className="movies-grid">
          {movies.filter((movie) => movie.category === "Upcoming").map((movie) => (
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
              <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
              <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
