const mongoose = require('mongoose');

const AddOnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serviceId: {
        type: String,
        required: true
    },
    carId: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    }
});

const AddOn = mongoose.model('add-ons', AddOnSchema);

module.exports = AddOn;