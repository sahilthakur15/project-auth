const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")
const {addMovie, getAllMovies, deleteMovies,} = require("../controllers/movieController")
const {allUsers, getUserByID, updateUser, deleteUser} = require("../controllers/userController")
const {getAllCompletedOrders} = require("../controllers/orderController")
const { ROUTES } = require("./routes");


router.get(ROUTES.ADMIN_USERS, adminMiddleware, allUsers)
router.get(ROUTES.ADMIN_GET_USER, adminMiddleware, getUserByID)
router.put(ROUTES.ADMIN_UPDATE_USER, adminMiddleware, updateUser)
router.delete(ROUTES.ADMIN_DELETE_USER, adminMiddleware, deleteUser)
router.post(ROUTES.ADMIN_ADD_MOVIES, adminMiddleware, addMovie)
router.get(ROUTES.ADMIN_MOVIES, adminMiddleware, getAllMovies)
router.delete(ROUTES.ADMIN_DELETE_MOVIES, adminMiddleware, deleteMovies)
router.get(ROUTES.ADMIN_ORDERS, adminMiddleware, getAllCompletedOrders)







module.exports = router;