const express = require('express');
const { getUserProfile } = require('../controllers/userController');

const router = express.Router();

// Route to get user profile by ID
router.get('/user/:userId', getUserProfile);

module.exports = router;
