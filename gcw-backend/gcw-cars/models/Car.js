const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    year: {
        type: Number
    }
});

const Car = mongoose.model('cars', CarSchema);

module.exports = Car;