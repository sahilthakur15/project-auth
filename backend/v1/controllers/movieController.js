require("dotenv").config();
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");
const movieService = require("../services/movieService");


// Add a new movie
const addMovie = async (req, res) => {
    try {
        const { title, description, category, releaseDate, posterUrl, genre, rating, price } = req.body;

        // Validate required fields
        if (!title || !genre || !category || !releaseDate || !posterUrl || !price) {
            return APIResponse.error(res,{status:400, message: Messages.MOVIES.REQUIRED_FIELDS});
        }

        // Check if category is valid
        if (!["Now Playing", "Upcoming"].includes(category)) {
            return APIResponse.error(res,{status:400, message: Messages.MOVIES.INVALID_CATEGORY});
        }

        // Validate rating (must be between 0 and 10)
        if (rating < 0 || rating > 10) {
            return APIResponse.error(res,{status:400, message: Messages.MOVIES.INVALID_RATING});
        }

        // Create a new movie document
        const newMovie = await movieService.addMovie({ title, genre, rating, description, category, releaseDate, posterUrl, price });

        // Respond with success
        return APIResponse.success(res,{status:201, message: Messages.MOVIES.MOVIE_ADDED, data: newMovie});
      
    } catch (error) {
      return APIResponse.error(res,{status:500, message: Messages.MOVIES.ERROR_ADDING_MOVIE, error: error.message});
    }
};

  

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    return APIResponse.success(res,{status:200, message: Messages.MOVIES.MOVIE_FETCH_SUCCESS, data: movies});
  } catch (error) {
    return APIResponse.error(res,{status:500, message: Messages.MOVIES.ERROR_FETCHING_MOVIES, error: error.message});
  }
};

// Delete Movies
const deleteMovies = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting movie with ID:", id);  // ✅ Debugging log
        
        const deletedMovie = await movieService.deleteMovieById(id);  // ✅ Fix variable name
        if (!deletedMovie) {
            return APIResponse.error(res,{status:404, message: Messages.MOVIES.MOVIE_NOT_FOUND});
        }
        return APIResponse.success(res,{status:200, message: Messages.MOVIES.MOVIE_DELETED, data: deletedMovie});

    } catch (err) {
        return APIResponse.error(res,{status:500, message: Messages.MOVIES.ERROR_DELETING_MOVIE, error: err.message});
    }
};

//get movies by id
const getMovieById = async (req, res) => {
  const {id} = req.params;
  try{
    const movies = await movieService.getMovieById(id);
    return APIResponse.success(res,{status: 200, message: Messages.MOVIES.MOVIE_FETCH_SUCCESS, data: movies})

  } catch(err){
    return APIResponse.error(res,{status: 500, message: Messages.MOVIES.ERROR_FETCHING_MOVIES, data: err.message})
  }
};

module.exports= {
    addMovie,
    getAllMovies,
    deleteMovies,
    getMovieById,
}