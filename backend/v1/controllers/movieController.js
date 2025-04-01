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

// movie status
const movieStatus = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return APIResponse.error(res, {
        status: 401,
        message: Messages.MOVIES.AUTH_FORBIDDEN,
      });
    }

    const { id } = req.params;

    // Check if movie exists before updating
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return APIResponse.error(res, {
        status: 404,
        message: Messages.MOVIES.MOVIE_NOT_FOUND,
      });
    }

    const response  = await movieService.updateMovieStatus(id, "inactive");

    return APIResponse.success(res, {
      status: 200,
      message: Messages.MOVIES.MOVIE_STATUS_UPDATED,
      data: response,
    });
  } catch (err) {
    console.error("Error updating movie status:", err);
    return APIResponse.error(res, {
      status: 500,
      message: Messages.MOVIES.MOVIE_STATUS_UPDATED_ERROR,
      data: err.message,
    });
  }
};

// edit movie 
const updateMovie = async (req, res) => {
  try {
    // Ensure the user has 'superadmin' role to update movie
    if (req.user.role !== 'superadmin') {
      return APIResponse.error(res, {
        status: 401,
        message: Messages.MOVIES.AUTH_FORBIDDEN,
      });
    }

    const { id } = req.params;
    const updateData = req.body; // Assuming the movie data to be updated comes in the body

    // Check if the movie exists before editing
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      return APIResponse.error(res, {
        status: 404,
        message: Messages.MOVIES.MOVIE_NOT_FOUND,
      });
    }

    // Call the service function to edit the movie
    const updatedMovie = await movieService.editMovie(id, updateData);
    
    // Return the success response with the updated movie data
    return APIResponse.success(res, {
      status: 200,
      message: Messages.MOVIES.MOVIE_UPDATED,
      data: updatedMovie,
    });
  } catch (err) {
    // Error handling
    return APIResponse.error(res, {
      status: 500,
      message: Messages.MOVIES.MOVIE_UPDATED_ERROR,
      data: err.message,
    });
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
    movieStatus,
    getMovieById,
    updateMovie,
}