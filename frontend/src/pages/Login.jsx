import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser } from "../services/authService";

// Validation regex patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const dataSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const { success, role } = await authenticateUser(formData.email, formData.password);

      if (success) {
        alert("Login Successful!");
        setFormData({ email: "", password: "" });
        navigate(role === "superadmin" || role === "admin" ? "/AdminDashboard" : "/UserDashboard");
      }
    } catch (error) {
      alert(error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>

        {/* Show error message if login fails */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
  );
};

export default Login;
