import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import "../style/Auth.css"
import { signupUser } from '../utils/axiosInstance';

function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dataSubmit = async (event) => {
    event.preventDefault(); // Prevents page reload

    const userData = {
      username,
      email,
      password
    };

    try {
      const response = await signupUser(userData);
      console.log(response);
      alert("User registered successfully");

      //reset fields
      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
      
    } catch (err) {
      console.log("Signup failed:",err);
      
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
