const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token received:', token); // Debug log

            // Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded); // Debug log

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'User not found' });
            }

            next();
        } catch (error) {
            console.error('Token verification error:', error.message);
            res.status(401).json({ success: false, message: 'Not authorized' });
        }
    } else {
        console.error('Authorization header missing or invalid'); // Debug log
        res.status(401).json({ success: false, message: 'No token provided' });
    }
};
module.exports = { protect };