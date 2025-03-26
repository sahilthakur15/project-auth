const ROUTES = {

      AUTH: "/api/v1/auth",
      ADMIN:"/api/v1/admin",
      USER:"/api/v1/user",







      // login and register routes
      LOGIN: "/login",
      REGISTER: "/register",

      // admin routes
      ADMIN_USERS: "/allusers",
      ADMIN_GET_USER: "/user/:id",
      ADMIN_DELETE_USER: "/deleteuser/:id",
      ADMIN_UPDATE_USER: "/updateuser/:id",
      ADMIN_MOVIES: "/allmovies",
      ADMIN_ADD_MOVIES: "/addmovies",
      ADMIN_DELETE_MOVIES: "/deletemovies/:id",
      ADMIN_ORDERS: "/getAllOrders",
      
      
      //user routes
      USER_MOVIES:"/allmovies",
      USER_GET_MOVIE:"/movie/:id", 
      USER_MOVIE_BOOKING:"/bookmovie",
      USER_PAYMENT_STATUS:"/updatestatus", 
      USER_BOOKED_MOVIES:"/getbookedmovies",

      
    }
  
  
  module.exports = {ROUTES};
  