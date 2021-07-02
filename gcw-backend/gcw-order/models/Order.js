const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true
    },
    carBrand: {
        type: String,
        required: true
    },
    carModel: {
        type: String
    },
    serviceName: {
        type: String,
        required: true
    },
    serviceCost: {
        type: Number,
        required: true
    },
    addOns: {
        type: Array
    },
    isDone: {
        type: Boolean,
        default: false,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    assignedTo: {
        type: String
    },
    bookedForDate: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;