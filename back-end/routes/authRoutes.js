const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
const cors = require('cors');
const { corsOptions } = require('../config/corsOptions'); // Ensure this path is correct

// Apply CORS options to all routes in this router
router.use(cors(corsOptions));

// Handle preflight requests
router.options('*', cors(corsOptions));

router.route('/login')
    .post(loginLimiter, authController.login);

router.route('/register')
    .post(authController.register);

router.route('/refresh')
    .get(authController.refresh);

router.route('/logout')
    .post(authController.logout);

router.route('/me')
    .get(authController.getCurrentUser);

module.exports = router;