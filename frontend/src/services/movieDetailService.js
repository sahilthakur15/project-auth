// services/movieService.js
import { getMovieDetail, bookMovie, userPayment } from "../utils/axiosInstance";

export const fetchMovieDetail = async (_id) => {
  try {
    return await getMovieDetail(_id);  // Call the function from axiosInstance
  } catch (error) {
    throw new Error("Failed to load movie details. Please try again.");
  }
};

export const bookMovieTickets = async (movieId, numTickets, totalPrice) => {
  try {
    return await bookMovie(movieId, numTickets, totalPrice); // Call bookMovie function from axiosInstance
  } catch (error) {
    throw new Error("Failed to book tickets. Please try again.");
  }
};

export const processPayment = async (orderId) => {
  try {
    return await userPayment(orderId); // Call userPayment function from axiosInstance
  } catch (error) {
    throw new Error("Payment failed. Try again.");
  }
};
