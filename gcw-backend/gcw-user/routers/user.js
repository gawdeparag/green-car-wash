const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(express.json());

// URLs related to userType: "User"
router.post('/signup', userController.signupAsUser);
router.post('/login', userController.loginAsUser);

// URLs related to userType: "Admin"
router.post('/admin/signup', userController.signupAsAdmin);
router.post('/admin/login', userController.loginAsAdmin);
router.get('/all-users', authMiddleware, userController.getAllUsers);
router.get('/all-washers', authMiddleware, userController.getAllWashers);

// URLs related to userType: "Washer"
router.post('/washer/signup', userController.signupAsWasher);
router.post('/washer/login', userController.loginAsWasher);

// Common URL for Logout
router.get('/logout', userController.logout);

module.exports = router;