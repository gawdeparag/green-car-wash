const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userCarController = require('../controllers/userCarControllers');

router.use(bodyParser.json());

router.get('/', userCarController.getUserCar);

router.post('/', userCarController.addUserCar);

router.put('/:id', userCarController.updateUserCar);

router.delete('/:id', userCarController.deleteUserCar);

module.exports = router;