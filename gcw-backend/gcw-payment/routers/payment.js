const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const paymentController = require('../controllers/paymentController');
const userAuthMiddleware = require('../../gcw-user/middleware/authMiddleware');

router.use(bodyParser.json());

router.get('/', userAuthMiddleware, paymentController.getPaymentDetails);

router.post('/', userAuthMiddleware, paymentController.addPaymentDetails);

router.put('/:id', userAuthMiddleware, paymentController.updatePaymentDetails);

router.delete('/:id', userAuthMiddleware, paymentController.deletePaymentDetails);

module.exports = router;