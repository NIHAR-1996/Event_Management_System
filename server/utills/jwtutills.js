const jwt = require('jsonwebtoken');

// Hardcoded secret key
const secretKey = 'Login_Secret_Key'; 

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    console.log("user", user); // Debug: Log user details
    // Generate JWT token with a 1-hour expiration
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

module.exports = { generateToken, secretKey };