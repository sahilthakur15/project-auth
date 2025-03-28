import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

      if (response.success) {
        alert(response.message);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-200 bg-light">
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
  );
}

export default Signup;