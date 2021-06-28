const express = require('express');
const router = express.Router();
const washerController = require('../controllers/washerController');

router.use(express.json());

router.get('/signup', washerController.getSignup);
router.post('/signup', washerController.signup);
router.get('/login', washerController.getLogin);
router.post('/login', washerController.login);
router.get('/logout', washerController.logout);

module.exports = router;