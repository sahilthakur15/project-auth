import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/Admindash';
import UsersList from './pages/Userslist';
import Movies from './pages/Movieslist';
import UserDash from './pages/Userdash';
import MovieDetail from './pages/Moviedetail';
import OrderPage from './pages/Orderpage';
import ProfilePage from './pages/Profilepage';
import ProtectedRoute from './utils/protectedRoutes'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />

        {/* Protected Routes for Admin & Super Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "superadmin"]} />}>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/movies-list" element={<Movies />} />
        </Route>

        {/* Protected Routes for Only Users */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/UserDashboard" element={<UserDash />} />
          <Route path="/movie-details/:_id" element={<MovieDetail />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
