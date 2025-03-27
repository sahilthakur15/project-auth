import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import "../style/OrderPage.css"; // Ensure this file includes the appropriate styles
import { jwtDecode } from "jwt-decode";  // Correct named import
import { fetchOrdersByUserId } from "../services/orderService";

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

  // Function to fetch orders based on userId using the service
  const fetchOrders = async () => {
    setLoading(true);

    try {
      const ordersData = await fetchOrdersByUserId();  // Use the service to fetch orders
      if (ordersData && ordersData.length > 0) {
        setOrders(ordersData);
      } else {
        setOrders([]);
        setError("No orders found.");
      }
    } catch (error) {
      console.error("❌ Error fetching user orders:", error.message);
      setError("Failed to fetch orders. Please try again.");
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
           <div key={order.orderId} className="order-card">

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
                <p>No. of Tickets: {order.numTickets}</p>

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
