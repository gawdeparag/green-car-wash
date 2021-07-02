const mongoose = require('mongoose');

const PaymentDetailsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentOption: {
        type: String,
        required: true
    },
    isPaymentDue: {
        type: Boolean,
        default: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const PaymentDetails = mongoose.model('payment-details', PaymentDetailsSchema);

module.exports = PaymentDetails;