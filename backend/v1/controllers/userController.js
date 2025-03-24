require("dotenv").config();
const APIResponse = require("../utilites/apiResponse");
const Movie = require("../models/movieModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");


// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch movies

    return APIResponse.success(res, {
      status: 200,
      message: "Movies retrieved successfully",
      data: movies, // Include movies in response
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: "Error retrieving movies",
      data: error.message, // Fix: 'err' → 'error'
    });
  }
};


// get movie by id
const getMovieById = async (req, res) => {
  const {id} = req.params;
  try{
    const movies = await Movie.findById(id);
    return APIResponse.success(res,{status: 200, message: "Movie retrieved successfully", data: movies})

  } catch(err){
    return APIResponse.error(res,{status: 500, message: "Error retrieving movie", data: err.message})

  }
};

// Create a new booking (book a movie)
const bookMovie = async (req, res) => {
  try {
      const { movieId, numTickets, paymentStatus } = req.body;
      const userId = req.user.id;

      // Validate user
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Validate movie
      const movie = await Movie.findById(movieId);
      if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
      }

      // Validate number of tickets
      if (!numTickets || numTickets < 1) {
          return res.status(400).json({ message: "Number of tickets must be at least 1" });
      }

      // Calculate total price based on the number of tickets
      const totalPrice = movie.price * numTickets;

      // Create a new order
      const newOrder = new Order({
          userId,
          movieId,
          totalPrice,
          paymentStatus
      });

      await newOrder.save();

      return res.status(201).json({ 
          message: "Booking successful", 
          orderId: newOrder._id,  
          numTickets,  
          order: newOrder 
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update payment status
const updateStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;

    console.log("Received request to update status:", { orderId, paymentStatus });

    // Validate input
    if (!orderId || !paymentStatus || !['Pending', 'Completed', 'Failed'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: "Invalid order ID or payment status" });
    }

    // Find and update booking
    const booking = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    console.log(`Payment status updated for Order ID ${orderId}: ${paymentStatus}`);

    res.json({ success: true, message: `Payment status updated to ${paymentStatus}`, booking });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Get all completed orders

const compOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the decoded JWT
    console.log(userId, "id");
    if (!userId) {
      return APIResponse.error(res, { status: 400, message: "User ID is required" });
    }

    const completedOrders = await Order.find({
      paymentStatus: "Completed",
      userId: userId,
    })
      .populate("userId", "username email")
      .populate("movieId", "title posterUrl")
      .exec();

    if (completedOrders.length === 0) {
      return APIResponse.error(res, { status: 404, message: "No completed orders found" });
    }

    // Calculate the ticket count from the total price (totalPrice / ticketPrice)
    const ticketPrice = 250; // Define the ticket price
    const ordersWithTicketCount = completedOrders.map((order) => {
      const ticketCount = Math.floor(order.totalPrice / ticketPrice);  // Calculate the ticket count
      return {
        ...order.toObject(),
        ticketCount,  // Add calculated ticket count to the order
      };
    });

    return APIResponse.success(res, {
      status: 200,
      success: true,
      data: ordersWithTicketCount,
    });
  } catch (error) {
    console.error("❌ Error fetching completed orders:", error);
    return APIResponse.error(res, { status: 500, message: "Server error", error: error.message });
  }
};









module.exports = {
    getAllMovies,
    getMovieById,
    bookMovie,
    updateStatus,
    compOrders,
}