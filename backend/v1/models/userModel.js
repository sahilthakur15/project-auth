const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({     // creating a schema
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true,
    },
    status: {  // New field for user status
        type: String,
        enum: ["active", "inactive"],
        default: "active"  // All new users will be active by default
    },
    
    role:{
        type:String,
        required:true,
        enum:["superadmin", "admin", "user"],
        default:"user"
    }
},
{
    timestamps:true,   // adding timestamps to the schema
}
);

const User = mongoose.model("User", userSchema); //expotring the model
module.exports = User;