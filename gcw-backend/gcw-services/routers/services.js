const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const serviceController = require('../controllers/serviceController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', serviceController.getServices);

router.post('/', serviceController.addService);

router.put('/:id', serviceController.updateService);

router.delete('/:id', serviceController.deleteService);

module.exports = router;