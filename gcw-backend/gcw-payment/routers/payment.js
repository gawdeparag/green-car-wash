const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const paymentController = require('../controllers/paymentController');

router.use(bodyParser.json());

router.get('/', paymentController.getPaymentDetails);

router.post('/', paymentController.addPaymentDetails);

router.put('/:id', paymentController.updatePaymentDetails);

router.delete('/:id', paymentController.deletePaymentDetails);

module.exports = router;