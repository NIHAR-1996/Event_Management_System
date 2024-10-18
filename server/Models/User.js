const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String },  // Google ID
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // Default is 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;