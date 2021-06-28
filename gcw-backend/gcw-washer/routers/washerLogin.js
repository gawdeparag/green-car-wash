const express = require('express');
const router = express.Router();
const washerLoginController = require('../controllers/washerLoginController');

router.get('/', washerLoginController.getWasherDetails);

module.exports = router;