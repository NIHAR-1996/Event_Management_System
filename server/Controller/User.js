const bcrypt = require('bcrypt');
const User = require('../Models/User');
const {generateToken} = require ('../utills/jwtutills')

// Create new user
const createNewUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login user by email and password
const getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
       

        const user = await User.findOne({ email });
        console.log("User found in DB:", user);
        if (!user) {
            return res.status(404).json({ message: 'Invalid email ' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isPasswordMatch);
        if (!isPasswordMatch) {
            return res.status(404).json({ message: 'Invalid  password' });
        }
        

        // Create JWT token
        const token = generateToken(user);
        // return token;
       
        
        res.json({
            token,
            user: {
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
          });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = {
    createNewUser,
    getUserByEmailAndPassword
};
