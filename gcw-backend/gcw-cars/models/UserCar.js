const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserCarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    isServicedEarlier: {
        type: Boolean
    },
    lastServicingDate: {
        type: Date
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
        type: Date
    }
});

const UserCar = mongoose.model('user-cars', UserCarSchema);

module.exports = UserCar;