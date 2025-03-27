import { fetchAllMovies, removeMovie } from "../utils/axiosInstance"; // Importing the existing functions from axiosInstance

// Service for fetching all movies
export const getAllMovies = async () => {
  try {
    const movies = await fetchAllMovies(); // Call the fetchAllMovies function from axiosInstance
    return movies;
  } catch (err) {
    console.error('❌ Error fetching movies from service:', err);
    return [];
  }
};

// Service for deleting a movie
export const deleteMovie = async (movieId) => {
  try {
    const result = await removeMovie(movieId); // Call the removeMovie function from axiosInstance
    return result;
  } catch (err) {
    console.error('❌ Error deleting movie from service:', err);
    return { error: 'Failed to delete movie' };
  }
};
