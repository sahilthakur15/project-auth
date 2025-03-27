const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router(); // creating router
const { ROUTES } = require("./routes");
const {getAllMovies, getMovieById} = require("../controllers/movieController")
const {bookMovie, updateStatus, compOrders} = require("../controllers/orderController")


router.get(ROUTES.USER_MOVIES,authMiddleware, getAllMovies); // creating route for register and login
router.get(ROUTES.USER_GET_MOVIE, authMiddleware, getMovieById) // creating route for register and login
router.post(ROUTES.USER_MOVIE_BOOKING, authMiddleware, bookMovie) // creating route for register and login
router.put(ROUTES.USER_PAYMENT_STATUS, authMiddleware, updateStatus) // creating route for register and login
router.get(ROUTES.USER_BOOKED_MOVIES, authMiddleware, compOrders) // creating route for register and login


module.exports = router;    // exporting router