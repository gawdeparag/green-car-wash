const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const bodyParser = require('body-parser');
const userAuthMiddleware = require('../../gcw-user/middleware/authMiddleware');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', userAuthMiddleware, orderController.getOrdersByUserId);

router.get('/pending-orders/', userAuthMiddleware, orderController.getPendingOrders);

router.get('/all-orders/', userAuthMiddleware, orderController.getOrders);

router.post('/', userAuthMiddleware, orderController.createOrder);

router.put('/:id', userAuthMiddleware, orderController.updateOrder);

router.put('/assign-order/:id', userAuthMiddleware, orderController.assignOrder);

router.delete('/:id', userAuthMiddleware, orderController.deleteOrder);

module.exports = router;