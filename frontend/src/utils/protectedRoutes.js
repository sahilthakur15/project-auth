// src/components/ProtectedRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { LOGIN } from "../routes/routes"; // Importing the LOGIN constant

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token is found, redirect to login
    return <Navigate to={LOGIN} />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (!allowedRoles.includes(decodedToken.role)) {
      // If the role is not authorized, redirect to login
      return <Navigate to={LOGIN} />;
    }
  } catch (error) {
    console.error('Invalid Token:', error);
    // If token decoding fails, redirect to login
    return <Navigate to={LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
