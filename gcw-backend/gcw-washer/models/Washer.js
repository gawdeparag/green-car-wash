const mongoose = require('mongoose');

const Schema = new mongoose.Schema();

const WasherSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Washer = mongoose.model('washer', WasherSchema);

module.exports = Washer;