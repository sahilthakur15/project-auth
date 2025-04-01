import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Moviesbar.css";
import { addMovie } from "../utils/axiosInstance";

export default function MoviesNavbar({ fetchMovies }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    category: "Now Playing",
    releaseDate: "",
    posterUrl: "",
    genre: "",
    rating: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (event) => {
    event.preventDefault();

    // Validate price range (200-1000)
    if (newMovie.price && (isNaN(newMovie.price) || newMovie.price < 200 || newMovie.price > 1000)) {
        alert("❌ Price must be a valid number between 200 and 1000.");
        return;
    }

    // Validate rating range (0-10)
    if (newMovie.rating && (isNaN(newMovie.rating) || newMovie.rating < 0 || newMovie.rating > 10)) {
        alert("❌ Rating must be a valid number between 0 and 10.");
        return;
    }

    try {
        setLoading(true);

        // Get the logged-in user's role from localStorage
        const userRole = localStorage.getItem("userRole");

        if (userRole !== "superadmin") {
            alert("❌ You are not authorized to add movies!");
            return;
        }

        const response = await addMovie(newMovie);

        if (response?.error) {
            alert(response.error); // Show alert for unauthorized action
        } else {
            alert("✅ Movie successfully added!");
            fetchMovies(); // Refresh the movie list
            setShowForm(false);
            setNewMovie({
                title: "",
                description: "",
                category: "Now Playing",
                releaseDate: "",
                posterUrl: "",
                genre: "",
                rating: "",
                price: "",
            });
        }
    } catch (error) {
        console.error("Error adding movie:", error);
        alert("Failed to add movie. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <>
      <nav className="movies-navbar">
        <h2 className="movies-navbar-title">Movies List</h2>
        <div className="movies-navbar-buttons">
          <button className="go-back-btn" onClick={() => navigate("/AdminDashboard")}>
            ← Go Back to Dashboard
          </button>
          <button className="movies-add-btn" onClick={() => setShowForm(true)}>
            + Add Movie
          </button>
        </div>
      </nav>

      {showForm && (
        <div className="movies-form-container">
          <div className="movies-form-popup">
            <h3 className="movies-form-title">Add New Movie</h3>
            <form onSubmit={handleAddMovie}>
              <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={newMovie.description} onChange={handleChange} required />
              <select name="category" value={newMovie.category} onChange={handleChange} required>
                <option value="Now Playing">Now Playing</option>
                <option value="Upcoming">Upcoming</option>
              </select>
              <input type="date" name="releaseDate" value={newMovie.releaseDate} onChange={handleChange} required />
              <input type="text" name="posterUrl" placeholder="Poster URL" value={newMovie.posterUrl} onChange={handleChange} required />
              <input type="text" name="genre" placeholder="Genre (e.g., Sci-Fi, Action)" value={newMovie.genre} onChange={handleChange} required />
              <input type="number" name="rating" placeholder="Rating (e.g., 8.5)" value={newMovie.rating} onChange={handleChange} required step="0.1" min="0" max="10" />
              <input type="number" name="price" placeholder="Price" value={newMovie.price} onChange={handleChange} min="200" max="1000" />

              <div className="movies-form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Movie"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
