const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
},

genre: {
  type: String,
  required: true
}, 

  rating: {
    type: Number,
    required: true,
    min: 0, max: 10
  },
  
  description: {
    type: String
},

  category: {
    type: String,
    enum: ["Now Playing", "Upcoming"],
    required: true
},

  releaseDate: {
    type: Date,
    required: true
},

  posterUrl: {
    type: String,
    required: true
},

price: {
  type: Number,
  required: true 
},

});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
