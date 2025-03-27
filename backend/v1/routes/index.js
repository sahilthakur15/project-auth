const express = require("express");
const authRoutes = require("../routes/authRoutes");
const adminRoutes = require("../routes/adminRoutes");
const userRoutes = require("../routes/userRoutes");
const {ROUTES} = require("../routes/routes")

const router = express.Router();

//API versioning 
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}${ROUTES.AUTH}`, authRoutes);
router.use(`${API_VERSION}${ROUTES.ADMIN}`,adminRoutes);
router.use(`${API_VERSION}${ROUTES.USER}`, userRoutes);

module.exports = router;
