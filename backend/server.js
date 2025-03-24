const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./v1/config/dbConnect"); // imported dbConnect function from dbConnect.js file.
const authRoutes = require("./v1/routes/authRoutes"); // imported authRoutes from routes folder.
const cors = require("cors"); // imported cors from cors package.
const User = require("./v1/models/userModel"); // imported User model from models folder.
const bcrypt = require("bcryptjs"); // imported bcrypt from bcrypt package.
const adminRoutes = require("./v1/routes/adminRoutes");
const userRoutes = require("./v1/routes/userRoutes")

dotenv.config();
dbConnect().then(() => {
    console.log("🔥 Connected to MongoDB");
    createSuperadmin(); // ✅ Call the function AFTER connecting to DB
  });
const app = express();

//cors 
app.use(cors({
  origin: ["http://localhost:3000","https://book-karo-liard.vercel.app/"], // Allow both local & deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes); // using authRoutes from routes folder.
app.use("/api/admin", adminRoutes); // using authRoutes from routes folder.
app.use("/api/user", userRoutes); // using authRoutes from routes folder.
//Super Admin
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


//Start the Server
const PORT = process.env.PORT || 8002;
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
});
