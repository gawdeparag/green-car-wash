const Washer = require('../models/Washer');

const getWasherDetails = (req, res) => {
    res.send('Hello from Washer Service!');
};

module.exports = { getWasherDetails };