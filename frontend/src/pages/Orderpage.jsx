import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import "../style/OrderPage.css"; // Ensure this file includes the appropriate styles
import { jwtDecode } from "jwt-decode";  // Correct named import
import { getuserOrders } from "../utils/axiosInstance";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  // Decode token and set userId when token is available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        setError("Failed to decode token.");
        setLoading(false);
      }
    } else {
      setError("Authorization token is missing.");
      setLoading(false);
    }
  }, []);

  // Fetch orders when userId is set
  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  // Function to fetch orders based on userId
  const fetchOrders = async () => {
    try {
      const ordersData = await getuserOrders();
      setOrders(ordersData);
    } catch (error) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-page-container">
      <h1>Your Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <img src={order.movieId.posterUrl} alt={order.movieId.title} className="order-poster" />
                <h2>{order.movieId.title}</h2>
              </div>
              <div className="order-details">
                <p>
                  <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} className="icon" /> Time: {new Date(order.createdAt).toLocaleTimeString()}
                </p>
                <p>Total Price: ₹{order.totalPrice}</p>
                <p>No. of Tickets: {order.ticketCount}</p> {/* Display ticket count */}
                <p>Status: {order.paymentStatus}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
