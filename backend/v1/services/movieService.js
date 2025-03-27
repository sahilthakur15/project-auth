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

// delete movie by id
const deleteMovieById = async (id) => {
    return await Movie.findByIdAndDelete(id);
};


module.exports = {
    addMovie,
    getAllMovies,
    getMovieById,
    deleteMovieById,
}