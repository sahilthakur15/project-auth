// backend url
export const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001/api";

// pages routes
export const LOGIN = "/login";
export const SIGNUP = "/";
export const ADMIN_DASHBOARD = "/AdminDashboard";
export const USERS_LIST = "/users-list";
export const MOVIES_LIST = "/movies-list";
export const USER_DASHBOARD = "/UserDashboard";
export const MOVIE_DETAILS = "/movie-details/:_id";
export const ORDERS = "/orders";
export const PROFILE = "/profile";

//apis routes

// auth apis
export const AUTH =
{ 
    AUTH_REGISTER : "/v1/auth/register",
    AUTH_LOGIN : "/v1/auth/login",
};

export const ADMIN = {
    ALL_USERS: "/v1/admin/allusers",
    ALL_MOVIES: "/v1/admin/allmovies",
    GET_ALL_ORDERS: "/v1/admin/getAllOrders",
    UPDATE_USER: "/v1/admin/updateuser",
    DELETE_USER: "/v1/admin/deleteuser",
    ADD_MOVIES: "/v1/admin/addmovies",
    DELETE_MOVIE: "/v1/admin/deletemovies"
};

export const USER = {
    ALL_MOVIES: "/v1/user/allmovies",
    MOVIE_DETAIL: "/v1/user/movie",
    BOOK_MOVIE: "/v1/user/bookmovie",
    UPDATE_STATUS: "/v1/user/updatestatus",
    GET_BOOKED_MOVIES: "/v1/user/getbookedmovies"
};