import { editMovie, fetchAllMovies,  updateMovieStatus } from "../utils/axiosInstance"; // Importing the existing functions from axiosInstance

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

// Service for updating movie status
export const updateStatus = async (movieId) => {
  try {
    const result = await updateMovieStatus(movieId); // Call the removeMovie function from axiosInstance
    return result;
  } catch (err) {
    console.error('❌ Error deleting movie from service:', err);
    return { error: 'Failed to delete movie' };
  }
};

//service for editing a movie 
export const editMovieDetails = async (movieId, movieData) => {
  try {
    const result = await editMovie(movieId, movieData); 
    return result;
  } catch (err) {
    console.error('Error updating movie from service:', err);
    return { error: 'Failed to delete movie' };
  }
  
};
