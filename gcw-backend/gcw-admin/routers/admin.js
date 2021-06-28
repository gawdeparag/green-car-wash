const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.use(express.json());

router.get('/signup', adminController.getSignup);
router.post('/signup', adminController.signup);
router.get('/login', adminController.getLogin);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

module.exports = router;