const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Car = require('../models/Car');
const carController = require('../controllers/carControllers');

router.use(bodyParser.json());

router.get('/', carController.getCars);

router.post('/', carController.addCar);

router.put('/:id', carController.updateCar);

router.delete('/:id', carController.deleteCar);

module.exports = router;