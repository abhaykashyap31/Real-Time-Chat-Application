const express = require('express');
const protect = require("../middleware/authMiddleware");
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');

const router = express.Router();

// Define a POST route for user registratio/n
router.post('/', registerUser).get(protect,allUsers);

// Define a GET route for retrieving all users, protected by middleware
// Define a POST route for user authentication
router.post('/login', authUser);
// router.get('/', protect, allUsers);

module.exports = router;
