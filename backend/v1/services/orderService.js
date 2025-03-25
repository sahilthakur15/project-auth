const Order = require("../models/orderModel")
const Movie = require("../models/movieModel")
const User = require("../models/userModel")
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");

//book movie
const bookMovie = async (userId, movieId, numTickets, paymentStatus) => {
    try {
        // Validate movieId
        if (!movieId) {
            throw new Error(Messages.ORDERS.INVALID_MOVIE_ID);
        }

        // Fetch movie from DB
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new Error(Messages.MOVIES.MOVIE_NOT_FOUND);
        }

        // Validate number of tickets
        if (!numTickets || numTickets < 1) {
            throw new Error(Messages.ORDERS.INVALID_TICKET_NUMBER);
        }

        // Calculate total price
        const totalPrice = movie.price * numTickets;

        // Create and save order
        const newOrder = new Order({ userId, movieId, totalPrice, paymentStatus });
        await newOrder.save();

        return newOrder;
    } catch (error) {
        console.error("❌ Error in bookMovie service:", error.message);
        throw error;  // Throw error instead of using res
    }
};



//update payment status
const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { paymentStatus }, { new: true });

        if (!updatedOrder) {
            throw new Error(Messages.ORDERS.ORDER_NOT_FOUND);
        }

        return updatedOrder;
    } catch (error) {
        console.error("❌ Error in updatePaymentStatus service:", error.message);
        throw error;
    }
};


//get completed order by id
const getCompletedOrders = async (userId) => {
    try {
        const completedOrders = await Order.find({ paymentStatus: "Completed", userId })
            .populate("userId", "username email")
            .populate("movieId", "title posterUrl")
            .exec();

        if (completedOrders.length === 0) {
            throw new Error(Messages.ORDERS.NO_COMPLETED_ORDERS);
        }

        return completedOrders;
    } catch (error) {
        console.error("❌ Error in getCompletedOrders service:", error.message);
        throw error;
    }
};


// get all completed orders
const getAllCompletedOrders = async () => {
    try {
        const completedOrders = await Order.find({ paymentStatus: "Completed" })
            .populate("userId", "username email")
            .populate("movieId", "title posterUrl")
            .exec();

        if (completedOrders.length === 0) {
            throw new Error(Messages.ORDERS.NO_COMPLETED_ORDERS);
        }

        return completedOrders;
    } catch (error) {
        console.error("❌ Error in getAllCompletedOrders service:", error.message);
        throw error;
    }
};



module.exports = {
    bookMovie,
    updatePaymentStatus,
    getCompletedOrders,
    getAllCompletedOrders
}