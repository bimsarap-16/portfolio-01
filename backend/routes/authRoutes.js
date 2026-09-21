const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');


// Define the POST route for registration
// This maps to http://localhost:5000/api/auth/register
router.post('/register', register);
router.post('/login', login);

// Export the router so server.js can use it
module.exports = router;