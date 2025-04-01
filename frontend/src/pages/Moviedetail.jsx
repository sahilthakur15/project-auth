import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/Moviedetail.css";
import { fetchMovieDetail, bookMovieTickets, processPayment } from "../services/movieDetailService";
import Loader from "../utils/Loader"; // Importing the loader
import toast from "react-hot-toast"; // Import HotToast


const MovieDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    fetchMovieDetailData();
  }, []);

  useEffect(() => {
    if (movie) {
      setTotalPrice(movie.price * numTickets);
    }
  }, [numTickets, movie]);

  const fetchMovieDetailData = async () => {
    setLoading(true);
    try {
      const movieData = await fetchMovieDetail(_id);  // Use the service to fetch movie details
      setMovie(movieData);
    } catch (error) {
      setError("Failed to load movie details. Please try again.");
      toast.error("Failed to load movie details. Please try again."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  const increaseTickets = () => setNumTickets((prev) => (prev < 15 ? prev + 1 : prev));
  const decreaseTickets = () => setNumTickets((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        const calculatedTotalPrice = movie.price * numTickets;

        const orderID = await bookMovieTickets(movie._id, numTickets, calculatedTotalPrice);  // Use the service to book movie
        if (orderID) {
            setOrderId(orderID);
            toast.success(`Booking Successful! Order ID: ${orderID}`);  // Show success toast
            setShowForm(false);
            setTimeout(() => setShowPaymentModal(true), 500);
        } else {
            setMessage("Booking failed. Please try again.");
            toast.error("Booking failed. Please try again."); // Show error toast
        }
    } catch (error) {
        setMessage("Booking failed. Please try again.");
        toast.error("Booking failed. Please try again."); // Show error toast
    }
  };

  const handlePayment = async () => {
    try {
        if (!orderId) {
            setError("Order ID not found! Please book a ticket first.");
            toast.error("Order ID not found! Please book a ticket first."); // Show error toast
            return;
        }

        const isSuccess = await processPayment(orderId);  // Use the service to process payment

        if (isSuccess) {
            toast.success(`Payment Successful! Order ID: ${orderId}`);  // Show success toast
            setShowPaymentModal(false);
        } else {
            toast.error("Payment failed. Try again."); // Show error toast
        }
    } catch (error) {
        setError("Payment update failed. Please try again.");
        toast.error("Payment update failed. Please try again."); // Show error toast
    }
  };

  // Show the loader while fetching movie details
  if (loading) return <Loader />;

  if (error) return <p className="moviedetail-error-message">{error}</p>;

  return (
    <div className="moviedetail-container">
      <button className="moviedetail-go-back-btn" onClick={() => navigate(-1)}>⬅ Go Back</button>

      <div className="moviedetail-content">
        <img src={movie.posterUrl} alt={movie.title} className="moviedetail-poster" />

        <div className="moviedetail-info">
          <h1 className="moviedetail-title">{movie.title}</h1>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Description:</strong> {movie.description}</p>

          {movie.category === "Now Playing" && (
            <button className="moviedetail-book-btn" onClick={() => setShowForm(true)}>
              Book Now
            </button>
          )}
          {movie.category === "Upcoming" && (
            <button className="moviedetail-coming-soon-btn" disabled>
              Coming Soon
            </button>
          )}

          {message && <p className="moviedetail-message">{message}</p>}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <div className="moviedetail-booking-modal">
          <div className="moviedetail-booking-content">
            <h2>Book Your Ticket</h2>
            <img src={movie.posterUrl} alt={movie.title} className="moviedetail-booking-poster" />

            <form onSubmit={handleBooking}>
              <label>Number of Tickets:</label>
              <div className="moviedetail-ticket-selector">
                <button type="button" className="moviedetail-ticket-btn" onClick={decreaseTickets}>-</button>
                <span className="moviedetail-ticket-count">{numTickets}</span>
                <button type="button" className="moviedetail-ticket-btn" onClick={increaseTickets}>+</button>
              </div>

              <p className="moviedetail-total-price"><strong>Total Price:</strong> ₹{totalPrice}</p>

              <div className="moviedetail-booking-buttons">
                <button type="submit" className="confirm-booking-btn">Confirm</button>
                <button type="button" className="cancel-booking-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h2>Complete Your Payment</h2>
            <p><strong>Amount:</strong> ₹{totalPrice}</p>

            <div className="payment-card">
              <p className="payment-amount">PAYING: ₹{totalPrice}</p>
              <div className="card-fields">
                
                {/* Card Number Input */}
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength="16"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                {cardNumber && !/^\d{16}$/.test(cardNumber) && (
                  <p className="error-message">❌ only numbers & must be 16 digits.</p>
                )}

                {/* Card Holder Name Input */}
                <input
                  type="text"
                  placeholder="Card Holder"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                />
                {cardHolder && !/^[A-Za-z\s]{3,}$/.test(cardHolder) && (
                  <p className="error-message">❌ Enter a valid name (only letters, min. 3 characters).</p>
                )}

                <div className="small-fields">
                 {/* Expiry Date Input */}
                 <input
                  type="text" 
                   placeholder="MM/YY"
                    maxLength="5"
                     value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      />
                      {/* Validation Messages */}
                      {expiryDate && !/^\d{2}\/\d{2}$/.test(expiryDate) && (
                        <p className="error-message">❌ Format: MM/YY</p>
                        )}

{expiryDate && /^\d{2}\/\d{2}$/.test(expiryDate) && (() => {
  const [month, year] = expiryDate.split("/").map(Number);
  const isValid = (year > 25) || (year === 25 && month > 3);

  return !isValid ? (
    <p className="error-message">❌ Expiry must be after March 2025</p>
  ) : null;
})()}


                  {/* CVC Input */}
                  <input
                    type="text"
                    placeholder="CVC"
                    maxLength="3"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                  {cvc && !/^\d{3}$/.test(cvc) && (
                    <p className="error-message">❌ CVC must be exactly 3 digits.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              className="complete-order-btn"
              onClick={handlePayment}
              disabled={
                !/^\d{16}$/.test(cardNumber) ||
                !/^[A-Za-z\s]{3,}$/.test(cardHolder) ||
                !/^\d{2}\/\d{2}$/.test(expiryDate) ||
                !/^\d{3}$/.test(cvc)
              }
            >
              Complete Order
            </button>
            <button className="cancel-order-btn" onClick={() => setShowPaymentModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
