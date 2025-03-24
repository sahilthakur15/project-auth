const mongoose = require('mongoose');
const Movie = require("./v1/models/movieModel"); // Adjust this path based on your project structure

// MongoDB Atlas connection string
const CONNECTION_STRING = 'mongodb+srv://sahilthakurwins:T2Pjwk7bxJybPRYl@myprojectdb.k1jjh.mongodb.net/?retryWrites=true&w=majority&appName=MyProjectDB';

// Connect to MongoDB Atlas
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    // Fetch all movies from the collection
    const movies = await Movie.find();
    
    // Loop through each movie and update if necessary
    for (let movie of movies) {
      // Check if the price field exists, if not, set a default price
      if (!movie.price) {
        movie.price = 250; // Default price, you can change this to any value
        await movie.save();
        console.log(`Updated movie: ${movie.title}`);
      }
    }
    
    console.log('All movies have been updated with a price.');
    mongoose.disconnect(); // Disconnect after the operation
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
    mongoose.disconnect();
  });
