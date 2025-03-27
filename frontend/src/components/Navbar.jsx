import { useNavigate } from "react-router-dom";
import "../style/Navbar.css"
import { logoutUser } from "../services/adminDashService";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(navigate("/login"));
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Admin Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}
