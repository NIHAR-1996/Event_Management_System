const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Initialize Google login process
router.post("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Generate JWT after successful login
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Redirect back to  frontend with the JWT token
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

module.exports = router;
