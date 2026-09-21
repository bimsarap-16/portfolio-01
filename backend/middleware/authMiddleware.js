const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // 1. Check if the token exists in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Get the token from the string "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token using your Secret Key from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Add the user info to the request object so the controller can use it
            req.admin = decoded;

            // 5. Everything is good! Move to the next function
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };