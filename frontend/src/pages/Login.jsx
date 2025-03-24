
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/axiosInstance';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dataSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await loginUser({ email, password });
            console.log("Login response:", response);
    
            // Extract token and role safely
            const token = response?.data?.token;
            const role = response?.data?.user?.role;
    
            if (token) {
                localStorage.setItem("token", token);
                console.log("Token stored:", token);
    
                if (role) {
                    localStorage.setItem("userRole", role);
                    console.log("User role stored:", role);
                }
    
                alert("Login Successful!");
    
                // Clear form fields
                setEmail("");
                setPassword("");
    
                // Redirect based on role
                if (role === "superadmin" || role === "admin") {
                    navigate("/AdminDashboard"); // Admin and Super Admin go to Admin Dashboard
                } else {
                    navigate("/UserDashboard"); // Regular users go to User Dashboard
                }
            } else {
                alert("Invalid login response. Please try again.");
            }
        } catch (err) {
            console.error("Login Error:", err.response?.data || err);
            alert(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
                <h2 className="text-center mb-3">Login</h2>
                <form onSubmit={dataSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
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
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
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
