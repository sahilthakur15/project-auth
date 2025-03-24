require('dotenv').config();
const mongoose = require("mongoose");

console.log("🔍 Checking Environment Variables...");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Found" : "❌ Not Found");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Found" : "❌ Not Found");

let cached = global.mongoose || { conn: null, promise: null }; // Cache connection for optimization

const dbconnect = async () => {
    if (cached.conn) {
        console.log("⚡ Using existing MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("🚀 Connecting to MongoDB...");
        cached.promise = mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout if MongoDB is unresponsive
        socketTimeoutMS: 45000,
        });
    }

    cached.conn = await cached.promise;
    console.log("🔥 Connected to MongoDB!");
    global.mongoose = cached; // Store connection globally

    return cached.conn;
};

module.exports = dbconnect;
