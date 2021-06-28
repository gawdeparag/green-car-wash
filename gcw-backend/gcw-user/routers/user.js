const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.use(express.json());

router.get('/signup', userController.getSignup);
router.post('/signup', userController.signup);
router.get('/login', userController.getLogin);
router.post('/login', userController.login);

module.exports = router;