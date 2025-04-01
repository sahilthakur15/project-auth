const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./v1/config/dbConnect"); // imported dbConnect function
const authRoutes = require("./v1/routes/authRoutes"); // imported authRoutes
const cors = require("cors"); // imported cors package
const User = require("./v1/models/userModel"); // imported User model
const bcrypt = require("bcryptjs"); // imported bcrypt
const adminRoutes = require("./v1/routes/adminRoutes");
const userRoutes = require("./v1/routes/userRoutes");
const { ROUTES } = require("./v1/routes/routes");
const routes = require("./v1/routes/index");

dotenv.config();
dbConnect().then(() => {
  console.log("🔥 Connected to MongoDB");
  createSuperadmin(); // ✅ Call the function AFTER connecting to DB
});

const app = express();

// ✅ Fix CORS Issue - Keep Only One CORS Configuration
app.use(
  // cors({
  //   origin: "https://book-karo-liard.vercel.app", // Allow frontend only
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ["Content-Type", "Authorization", "user-role"],
  //   credentials: true,
  // })

  cors({
    origin: "http://localhost:3000", // Allow frontend only
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "user-role"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use(routes);

// ✅ Super Admin Creation Function
async function createSuperadmin() {
  try {
    const superadminExists = await User.findOne({ role: "superadmin" });

    if (!superadminExists) {
      const hashedPassword = await bcrypt.hash("SuperAdmin@123", 10); // ✅ Hash password

      const superadmin = new User({
        username: "Sahil",
        email: "sahilth@gmail.com",
        password: hashedPassword, // ✅ Store hashed password
        role: "superadmin",
      });

      await superadmin.save();
      console.log("✅ Superadmin created successfully!");
    } else {
      console.log("⚡ Superadmin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating superadmin:", error);
  }
}

// Start the Server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at port ${PORT}`);
});

module.exports = app;
