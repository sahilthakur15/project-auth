import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import "../style/Auth.css";
import { registerUser } from '../services/authService';
import Loader from '../utils/Loader';
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Validation regex patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const fullNameRegex = /^[a-zA-Z\s]{3,50}$/;

function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // ✅ Fixed
  const [showPassword, setShowPassword] = useState(false); // ✅ Fixed
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

   // Handle input changes ✅ Fixed
// This function is used to handle changes in the input fields
   const handleChange = (e) => {
    // Destructure the event target to get the name and value of the input field
    const { name, value } = e.target;
    // If the name of the input field is "username", set the name state to the value of the input field
    if (name === "username") setName(value);
    // If the name of the input field is "email", set the email state to the value of the input field
    if (name === "email") setEmail(value);
    // If the name of the input field is "password", set the password state to the value of the input field
    if (name === "password") setPassword(value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fullNameRegex.test(username)) {
      newErrors.username = "Full name must be 3-50 characters and contain only letters and spaces.";
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dataSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;
    setLoading(true);  // ✅ Start loading
    try {
      const userData = { username, email, password };
      const response = await registerUser(userData);
      console.log("API Response:", response); // Debugging

      if (response.success) {
        toast.success(response.message || "Signup successful!");
        
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");

        // Delay navigation to show toast
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(response.message || "Signup failed! Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }finally {
      setLoading(false);  // ✅ Stop loading
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        {loading ? (
          <Loader />
        ) : (
          <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
            <h2 className="text-center mb-3">Sign Up</h2>
            <form onSubmit={dataSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter name"
                  value={username}
                  onChange={handleChange}
                />
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </div>
  
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleChange}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
  
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
  
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
  
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
  
}

export default Signup;
