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
    }
});

const UserCar = mongoose.model('user-cars', UserCarSchema);

module.exports = UserCar;