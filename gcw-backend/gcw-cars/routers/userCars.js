const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userCarController = require('../controllers/userCarControllers');
const userAuthMiddleware = require('../../gcw-user/middleware/authMiddleware');

router.use(bodyParser.json());

router.get('/', userAuthMiddleware, userCarController.getUserCar);

router.post('/', userAuthMiddleware, userCarController.addUserCar);

router.put('/:id', userAuthMiddleware, userCarController.updateUserCar);

router.delete('/:id', userAuthMiddleware, userCarController.deleteUserCar);

module.exports = router;