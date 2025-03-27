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
import { LOGIN, SIGNUP, ADMIN_DASHBOARD, USERS_LIST, MOVIES_LIST, USER_DASHBOARD, MOVIE_DETAILS, ORDERS, PROFILE } from "../src/routes/routes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGNUP} element={<Signup />} />

        {/* Protected Routes for Admin & Super Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "superadmin"]} />}>
          <Route path={ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={USERS_LIST} element={<UsersList />} />
          <Route path={MOVIES_LIST} element={<Movies />} />
        </Route>

        {/* Protected Routes for Only Users */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path={USER_DASHBOARD} element={<UserDash />} />
          <Route path={MOVIE_DETAILS} element={<MovieDetail />} />
          <Route path={ORDERS} element={<OrderPage />} />
          <Route path={PROFILE} element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
