const Movie = require("../models/movieModel")

// add movies
const addMovie = async (movieData) => {
    return await Movie.create(movieData);
};

//get all movies
const getAllMovies = async ()=>{
    return await Movie.find();
};

// get movie by id
const getMovieById = async (id) => {
    return await Movie.findById(id);
};

//  movie status
const updateMovieStatus = async (id, status) => {
    return await Movie.findByIdAndUpdate(id, {status}, { new: true});
};

// edit movie 
const editMovie = async (id, movieData) => {
    try {
      // Find movie by ID and update the fields provided in movieData
      const updatedMovie = await Movie.findByIdAndUpdate(id, movieData, { new: true });
      if (!updatedMovie) {
        throw new Error('Movie not found');
      }
      return updatedMovie; // Return updated movie data
    } catch (err) {
      throw new Error(err.message || 'Error updating movie');
    }
  };


module.exports = {
    addMovie,
    getAllMovies,
    getMovieById,
    updateMovieStatus,
    editMovie
}