import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../style/Movies.css";
import MoviesNavbar from "../components/Moviesbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilm, faSyncAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { editMovieDetails, getAllMovies, updateStatus } from "../services/adminMovieService";
import Loader from "../utils/Loader";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [updatedMovieData, setUpdatedMovieData] = useState({
    title: '',
    description: '',
    genre: '',
    posterUrl: '',
    rating: '',
    price: '',
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await getAllMovies();
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

  const handleMovieStatus = async (movieId, currentStatus) => {
    const newStatus = currentStatus === "inactive" ? "active" : "inactive";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This movie's status will be set to ${newStatus}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, set it to ${newStatus}!`,
    });

    if (result.isConfirmed) {
      try {
        const response = await updateStatus(movieId, newStatus);
        if (response?.error) {
          Swal.fire("Error", response.error, "error");
        } else {
          Swal.fire("Updated!", `The movie status has been set to ${newStatus}.`, "success");
          fetchMovies();
        }
      } catch (error) {
        console.error("Error updating movie status:", error);
        Swal.fire("Failed", "Failed to update movie. Please try again.", "error");
      }
    }
  };

  const handleEditMovie = (movieId) => {
    const movieToEdit = movies.find((movie) => movie._id === movieId);
    if (movieToEdit) {
      setSelectedMovie(movieToEdit);
      setUpdatedMovieData({
        title: movieToEdit.title,
        description: movieToEdit.description,
        genre: movieToEdit.genre,
        posterUrl: movieToEdit.posterUrl,
        rating: movieToEdit.rating,
        price: movieToEdit.price,
      });
      setIsModalOpen(true);
    }
  };

  const handleSaveMovie = async () => {
    try {
      const updatedMovie = await editMovieDetails(selectedMovie._id, updatedMovieData);
      if (updatedMovie?.error) {
        Swal.fire("Error", updatedMovie.error, "error");
      } else {
        Swal.fire("Updated!", "Movie details have been updated.", "success");
        fetchMovies();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      Swal.fire("Failed", "Failed to update movie. Please try again.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <div className="loader-container"><Loader /></div>;

  return (
    <>
      <MoviesNavbar fetchMovies={fetchMovies} />
      <div className="movies-container">
        <h2 className="movies-now-playing-title">Now Playing</h2>
        <div className="movies-grid">
          {movies.filter((movie) => movie.category === "Now Playing" && movie.status !== "inactive").map((movie) => (
            <div key={movie._id} className="movies-card">
              <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
              <h3>{movie.title}</h3>
              <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
              <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
              <div className="movie-buttons">
                <button className="update-btn" onClick={() => handleMovieStatus(movie._id, movie.status)}>
                  <FontAwesomeIcon icon={faSyncAlt} /> Update Status
                </button>
                <button className="edit-btn" onClick={() => handleEditMovie(movie._id)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="movies-upcoming-title">Upcoming</h2>
        <div className="movies-grid">
          {movies.filter((movie) => movie.category === "Upcoming" && movie.status !== "inactive").map((movie) => (
            <div key={movie._id} className="movies-card">
              <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
              <h3>{movie.title}</h3>
              <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
              <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
              <div className="movie-buttons">
                <button className="update-btn" onClick={() => handleMovieStatus(movie._id, movie.status)}>
                  <FontAwesomeIcon icon={faSyncAlt} /> Update Status
                </button>
                <button className="edit-btn" onClick={() => handleEditMovie(movie._id)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="movies-inactive-title">Deleted Movies</h2>
        <div className="movies-grid">
          {movies.filter((movie) => movie.status === "inactive").map((movie) => (
            <div key={movie._id} className="movies-card inactive-movie">
              <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
              <h3>{movie.title}</h3>
              <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
              <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Movie</h5>
              <button type="button" className="close" onClick={() => setIsModalOpen(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="edit-movie-form">
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={updatedMovieData.title}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={updatedMovieData.description}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
                <label>
                  Genre:
                  <input
                    type="text"
                    name="genre"
                    value={updatedMovieData.genre}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
                <label>
                  Poster URL:
                  <input
                    type="text"
                    name="posterUrl"
                    value={updatedMovieData.posterUrl}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
                <label>
                  Rating:
                  <input
                    type="number"
                    name="rating"
                    value={updatedMovieData.rating}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={updatedMovieData.price}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSaveMovie}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;