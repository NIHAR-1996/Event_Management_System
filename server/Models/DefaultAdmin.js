const bcrypt = require('bcrypt');
const User = require('./User'); //User Schema

async function DefaultAdmin() {
    try {
        // Check if the admin user already exists
        const adminEmail = 'admin@example.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            // If admin doesn't exist, create a new one
            const hashedPassword = await bcrypt.hash('admin123', 10); // Admin password (hashed)

            const adminUser = new User({
                name: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin', // Role as admin
            });

            await adminUser.save();
            console.log('Default admin created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating default admin:', error);
    }
}

module.exports={DefaultAdmin};
