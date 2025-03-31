import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { authenticateUser } from "../services/authService";

// Validation regex patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {
  // Declare state variables
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form inputs but DON'T block API call
  const validateForm = () => {
    const newErrors = {};

    // Check if email is in correct format
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    // Check if password is in correct format
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.";
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const dataSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
  
    // Validate form (but don't block API call)
    validateForm();
  
    try {
      const response = await authenticateUser(formData.email, formData.password);
      console.log("API Response:", response);
  
      if (response?.success) {
        toast.success(response.message || "Login Successful!");
        setFormData({ email: "", password: "" });
  
        setTimeout(() => {
          navigate(response.role === "superadmin" || response.role === "admin" ? "/AdminDashboard" : "/UserDashboard");
        }, 1500);
      } else {
        throw new Error(response.message || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
  
      // Handle different error cases
      let errorMessage = "Something went wrong! Please try again.";
      if (error.response) {
        // Backend responded with an error
        errorMessage = error.response.data?.message || "Invalid credentials.";
      } else if (error.request) {
        // Request made but no response received
        errorMessage = "Server is not responding. Please try again later.";
      } else {
        // Other errors
        errorMessage = error.message || "An unknown error occurred.";
      }
  
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
       {/* Ensures toast notifications appear */}
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Toaster position="top-right" />
        <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
          <h2 className="text-center mb-3">Login</h2>

          <form onSubmit={dataSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
