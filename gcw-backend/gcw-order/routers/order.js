const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', orderController.getOrders);

router.post('/', orderController.createOrder);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

module.exports = router;