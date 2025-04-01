// backend url
export const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8002/api";


// Page routes
export const LOGIN = "/login";
export const SIGNUP = "/";
export const ADMIN_DASHBOARD = "/AdminDashboard";
export const USERS_LIST = "/users-list";
export const MOVIES_LIST = "/movies-list";
export const USER_DASHBOARD = "/UserDashboard";
export const MOVIE_DETAILS = "/movie-details/:_id";
export const ORDERS = "/orders";
export const PROFILE = "/profile";

export const URLS = {
    
     API_VERSION : "/v1",

// auth apis
 AUTH:
{ 
    AUTH_REGISTER : "/auth/register",
    AUTH_LOGIN : "/auth/login",
},

ADMIN :
 {
    ALL_USERS: "/admin/allusers",
    ALL_MOVIES: "/admin/allmovies",
    GET_ALL_ORDERS: "/admin/getAllOrders",
    UPDATE_USER: "/admin/updateuser",
    DELETE_USER: "/admin/deleteuser",
    ADD_MOVIES: "/admin/addmovies",
    UPDATE_MOVIE_STATUS: "/admin/deletemovies",
    EDIT_MOVIES: "/admin/updatemovie",
},
USER :
{
    ALL_MOVIES: "/user/allmovies",
    MOVIE_DETAIL: "/user/movie",
    BOOK_MOVIE: "/user/bookmovie",
    UPDATE_STATUS: "/user/updatestatus",
    GET_BOOKED_MOVIES: "/user/getbookedmovies",
    EDIT_PROFILE: "/user/updateprofile",
},

}