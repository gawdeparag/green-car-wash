const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const serviceController = require('../controllers/serviceController');
const userAuthMiddleware = require('../../gcw-user/middleware/authMiddleware');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', userAuthMiddleware, serviceController.getServices);

router.post('/', userAuthMiddleware, serviceController.addService);

router.put('/:id', userAuthMiddleware, serviceController.updateService);

router.delete('/:id', userAuthMiddleware, serviceController.deleteService);

module.exports = router;