import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (!allowedRoles.includes(decodedToken.role)) {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Invalid Token:", error);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
