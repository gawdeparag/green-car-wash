const PaymentDetails = require('../models/PaymentDetails');

const getPaymentDetails = (req, res) => {
    PaymentDetails.find({}).then((paymentDetails) => {
        res.send(paymentDetails);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const addPaymentDetails = (req, res) => {
    PaymentDetails.create(req.body).then((paymentDetails) => {
        res.send(paymentDetails);
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
};

const updatePaymentDetails = (req, res) => {
    PaymentDetails.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        PaymentDetails.findById({ _id: req.params.id }).then((paymentDetails) => {
            res.send(paymentDetails);
        }).catch((err) => {
            res.status(400).json({ message: err.message });
        })
    }).catch((err) => {
        res.status(404).json({ message: err.message });
    });
};

const deletePaymentDetails = (req, res) => {
    PaymentDetails.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res.json({ message: "Payment Details Deleted Successfully" });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

module.exports = { getPaymentDetails, addPaymentDetails, updatePaymentDetails, deletePaymentDetails };