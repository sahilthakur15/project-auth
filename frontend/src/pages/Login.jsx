import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const dataSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { success, role } = await authenticateUser(formData.email, formData.password);

      if (success) {
        alert("Login Successful!");
        setFormData({ email: "", password: "" });

        // Redirect based on role
        navigate(role === "superadmin" || role === "admin" ? "/AdminDashboard" : "/UserDashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>

        {/* ✅ Show error message if login fails */}
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
              required
            />
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Registration Link */}
        <p className="text-center mt-3">
          Don't have an account? <Link to="/">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
