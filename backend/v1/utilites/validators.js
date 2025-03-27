
// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation regex (at least 8 characters, one uppercase, one lowercase, one number, one special character)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Full name validation regex (only alphabets and spaces, 3-50 characters)
const fullNameRegex = /^[a-zA-Z\s]{3,50}$/;

module.exports = { 
    emailRegex, 
    passwordRegex,
    fullNameRegex 

};
