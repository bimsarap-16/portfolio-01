const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Logic for Registering a new Admin
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // 2. Hash the password (security)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save to Database
        const newAdmin = new Admin({
            username,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

    // --- LOGIN LOGIC ---
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find the admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Invalid Credentials (User not found)" });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials (Wrong password)" });
        }

        // 3. Create and Send JWT Token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: "Login successful!",
            token,
            username: admin.username
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
 };