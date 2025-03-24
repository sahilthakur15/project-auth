import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Moviedetail.css";
import { bookMovie, getMovieDetail, userPayment } from "../utils/axiosInstance";

const MovieDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
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

console.log(orderId,"rim")
  useEffect(() => {
    fetchMovieDetail();
  }, []);

  useEffect(() => {
    if (movie) {
      setTotalPrice(movie.price * numTickets);
    }
  }, [numTickets, movie]);

  const fetchMovieDetail = async () => {
    setLoading(true);
    try {
      const movieData = await getMovieDetail(_id);
      setMovie(movieData);
    } catch (error) {
      setError("Failed to load movie details. Please try again.");
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
        const orderID = await bookMovie(movie._id, numTickets, totalPrice);
        
        if (orderID) {
            setOrderId(orderID);
            alert(`🎉 Booking Successful! Order ID: ${orderID}`);
            setShowForm(false);
            setShowPaymentModal(true); // Open payment modal after booking
        }
    } catch (error) {
        setMessage("❌ Booking failed. Please try again.");
    }
};

  const handlePayment = async () => {
    try {
      
  
      if (!orderId) {
        alert("Order ID not found! Please book a ticket first.");
        return;
      }
      const isSuccess = await userPayment(orderId);
      if (isSuccess) {
        alert(`🎉 Payment Successful! Order ID: ${orderId}`);
        setShowPaymentModal(false);
      } else {
        alert("❌ Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Payment update error:", error.response?.data || error.message);
      alert("❌ Payment update failed. Please try again.");
    }
  };
  

  if (loading) return <p>Loading...</p>;
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
            {expiryDate && !/^\d{2}\/\d{2}$/.test(expiryDate) && (
              <p className="error-message">❌ Format: MM/YY</p>
            )}

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
