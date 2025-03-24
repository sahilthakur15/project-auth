require("dotenv").config();
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");
const User = require("../models/userModel");
const Movie = require("../models/movieModel");
const Order = require("../models/orderModel");
 

// Get all users
const allUsers = async (req, res) =>{
    try{
        const user = await User.find({ role: { $in: ["user", "admin"] } });

        return APIResponse.success(res,{
            status: 200,
            message: "All users",data: user
          })

    } catch(err){
        return APIResponse.error(res,{
            status: 500,
            message: Messages.error
          })

    };
}

// Get user by ID
const getUserByID = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        return APIResponse.success(res,{
            status: 200,
            message: "User found", data: user
        })

    } catch(err){
        return APIResponse.error(res,{
            status: 500,
            message: Messages.error,
            data: err
          })
    };

}


// update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return APIResponse.error(res, { status: 404, message: "User not found" });
        }

        // Toggle role between "admin" and "user"
        const newRole = user.role === "admin" ? "user" : "admin";

        // Update user role
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { role: newRole }, 
            { new: true }
        );

        return APIResponse.success(res, {
            status: 200, 
            message: `User role changed to ${newRole} successfully`, 
            data: updatedUser
        });

    } catch (err) {
        return APIResponse.error(res, {
            status: 500, 
            message: "Internal Server Error", 
            data: err
        });
    };
};


// delete user
const deleteUser = async (req, res) => {
    try {
        // Ensure only superadmin can delete users
        if (req.user.role !== "superadmin") {
            return APIResponse.error(res, { status: 403, message: "Only Super Admin can delete users" });
        }

        const { id } = req.params;

        // Check if user exists before deleting
        const user = await User.findById(id);
        if (!user) {
            return APIResponse.error(res, { status: 404, message: "User not found" });
        }

        // Delete user
        await User.findByIdAndDelete(id);

        return APIResponse.success(res, { status: 200, message: "User deleted successfully" });
    } catch (err) {
        return APIResponse.error(res, { status: 500, message: "Error deleting user", data: err.message });
    };
};




// Add a new movie
const addMovie = async (req, res) => {
    try {
        const { title, description, category, releaseDate, posterUrl, genre, rating, price } = req.body;

        // Validate required fields
        if (!title || !genre || !category || !releaseDate || !posterUrl || !price) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        // Check if category is valid
        if (!["Now Playing", "Upcoming"].includes(category)) {
            return res.status(400).json({ message: "Invalid category." });
        }

        // Validate rating (must be between 0 and 10)
        if (rating < 0 || rating > 10) {
            return res.status(400).json({ message: "Rating must be between 0 and 10." });
        }

        // Create a new movie document
        const newMovie = new Movie({ title, genre, rating, description, category, releaseDate, posterUrl, price });

        // Save the movie to the database
        await newMovie.save();

        // Respond with success
        res.status(201).json({ message: "Movie added successfully!", movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: "Error adding movie", error: error.message });
    }
};

  

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error: error.message });
  }
};

// Delete Movies
const deleteMovies = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting movie with ID:", id);  // ✅ Debugging log
        
        const deletedMovie = await Movie.findByIdAndDelete(id);  // ✅ Fix variable name
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found in database" });
        }

        res.status(200).json({ message: "Movie deleted successfully", deletedMovie });

    } catch (err) {
        res.status(500).json({ message: "Error deleting movie", error: err.message });
    }
};


// Get all users orders
const getAllCompletedOrders = async (req, res) => {
    try {
      const completedOrders = await Order.find({ paymentStatus: "Completed" })
        .populate("userId", "username email")
        .populate("movieId", "title posterUrl")
        .exec();
  
      if (completedOrders.length === 0) {
        return APIResponse.error(res, { status: 404, message: "No completed orders found" });
      }
  
      return APIResponse.success(res, {
        status: 200,
        success: true,
        data: completedOrders,
      });
    } catch (error) {
      console.error("❌ Error fetching all completed orders:", error);
      return APIResponse.error(res, { status: 500, message: "Server error", error: error.message });
    }
  };
  



module.exports = {
    allUsers,
    getUserByID,
    updateUser,
    deleteUser,
    addMovie, 
    getAllMovies,
    deleteMovies,
    getAllCompletedOrders
}