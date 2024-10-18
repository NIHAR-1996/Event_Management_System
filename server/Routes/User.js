const express = require('express');
const { createNewUser, getUserByEmailAndPassword } = require('../Controller/User');

const router = express.Router();

// Route to create a new user (sign-up)
router.post('/signup', createNewUser);

// Route to get user by email and password (login)
router.post('/login', getUserByEmailAndPassword);

module.exports = router;
