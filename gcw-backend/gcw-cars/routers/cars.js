const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const carController = require('../controllers/carControllers');
const userAuthMiddleware = require('../../gcw-user/middleware/authMiddleware');

router.use(bodyParser.json());

router.get('/', userAuthMiddleware, carController.getCars);

router.post('/', userAuthMiddleware, carController.addCar);

router.put('/:id', userAuthMiddleware, carController.updateCar);

router.delete('/:id', userAuthMiddleware, carController.deleteCar);

module.exports = router;