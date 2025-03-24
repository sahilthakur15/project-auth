const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router(); // creating router

const { getAllMovies, getMovieById, bookMovie, updateStatus, compOrders }= require("../controllers/userController") 

router.get("/allmovies",authMiddleware, getAllMovies); // creating route for register and login
router.get("/movie/:id", authMiddleware, getMovieById) // creating route for register and login
router.post("/bookmovie", authMiddleware, bookMovie) // creating route for register and login
router.put("/updatestatus", authMiddleware, updateStatus) // creating route for register and login
router.get("/getbookedmovies", authMiddleware, compOrders) // creating route for register and login


module.exports = router;    // exporting router