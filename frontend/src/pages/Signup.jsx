import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import "../style/Auth.css";
import { registerUser } from '../services/authService';

// Validation regex patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const fullNameRegex = /^[a-zA-Z\s]{3,50}$/;

function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    }
  };

  return (
    <>
      <Toaster position="top-right" /> {/* Ensure Toaster is present */}
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
          <h2 className="text-center mb-3">Sign Up</h2>
          <form onSubmit={dataSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter name" 
                value={username}
                onChange={(e) => setName(e.target.value)} 
              />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
