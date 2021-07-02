const PaymentDetails = require('../models/PaymentDetails');

const getPaymentDetails = (req, res) => {
    if (req.userType && req.userType === "User") {
        PaymentDetails.find({ userId: req.userId }).then((paymentDetails) => {
            res.send(paymentDetails);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const addPaymentDetails = (req, res) => {
    if (req.userType && req.userType === "User") {
        let newPaymentDetails = req.body;
        newPaymentDetails.userId = req.userId;
        PaymentDetails.create(newPaymentDetails).then((paymentDetails) => {
            res.send(paymentDetails);
        }).catch((err) => {
            res.status(400).json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const updatePaymentDetails = (req, res) => {
    if (req.userType && req.userType === "User") {
        PaymentDetails.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body).then(() => {
            PaymentDetails.findOne({ _id: req.params.id, userId: req.userId }).then((paymentDetails) => {
                res.send(paymentDetails);
            }).catch((err) => {
                res.status(400).json({ error: err.message });
            })
        }).catch((err) => {
            res.status(404).json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const deletePaymentDetails = (req, res) => {
    if (req.userType && req.userType === "User") {
        PaymentDetails.findOneAndDelete({ _id: req.params.id, userId: req.userId }).then((paymentDetails) => {
            if (paymentDetails) {
                res.json({ message: "Payment Details Deleted Successfully" });
            } else {
                res.json({ error: "Request Payment Details Not Found" });
            }
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

module.exports = { getPaymentDetails, addPaymentDetails, updatePaymentDetails, deletePaymentDetails };