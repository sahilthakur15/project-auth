import { useNavigate } from "react-router-dom";
import "../style/Navbar.css"

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Admin Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}
