const express = require("express");
const {register,login} = require("../controllers/authController"); // importing register and login functions from authController.js file.
const {ROUTES} = require("./routes");
const router = express.Router(); // creating router

router.post(ROUTES.REGISTER,  register); // calling register function
router.post(ROUTES.LOGIN,  login); // calling login function
module.exports = router;    // exporting router