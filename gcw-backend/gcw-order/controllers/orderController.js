const Order = require('../models/Order');
const axios = require('axios');

const getOrders = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        Order.find({}).then((orders) => {
            res.send(orders);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid Request" });
    }
};

const paymentURL = "http://localhost:3003/add-payment/";

const createOrder = (req, res) => {
    if (req.userType && req.userType === "User") {
        const newOrder = {
            carName: req.body.carName,
            carBrand: req.body.carBrand,
            serviceName: req.body.serviceName,
            serviceCost: req.body.serviceCost,
            addOns: req.body.addOns || [],
            totalCost: req.body.totalCost,
            bookedForDate: req.body.bookedForDate,
            createdBy: req.userId
        };
        Order.create(newOrder).then((order) => {
            let newPaymentDetails = {
                orderId: order._id.toString(),
                totalAmount: order.totalCost,
                userId: req.userId,
                userType: req.userType
            }
            axios.post(paymentURL, newPaymentDetails).then((response) => {
                console.log("Payment Details Created successfully for this order");
            }).catch((err) => {
                console.log(err);
            });
            res.json({ message: "Order created successfully" });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid Request" });
    }
};

const updateOrder = (req, res) => {
    if (req.userType && req.userType === "Washer" && req.body.isDone) {
        Order.findOneAndUpdate({ _id: req.params.id, assignedTo: req.userId }, req.body).then(() => {
            Order.findOne({ _id: req.params.id, assignedTo: req.userId }).then((order) => {
                res.send(order);
            }).catch((err) => {
                res.json({ error: err.message });
            });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid Request" });
    }
};

const deleteOrder = (req, res) => {
    if (req.userType && req.userType === "User") {
        Order.findByIdAndRemove({ _id: req.params.id }).then((order) => {
            res.json({ message: "Order deleted successfully" });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid Request" });
    }
};

const getOrdersByUserId = (req, res) => {
    if (req.userType && req.userType === "User") {
        Order.find({ createdBy: req.userId }).then((orders) => {
            res.send(orders);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid Request" });
    }
};

const getPendingOrders = (req, res) => {
    if (req.userType && req.userType === "Washer") {
        Order.find({ isDone: false }).then((orders) => {
            res.send(orders);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid Request" });
    }
};

const assignOrder = (req, res) => {
    if (req.userType && req.userType === "Washer") {
        const washer = {
            assignedTo: req.userId
        };
        Order.findByIdAndUpdate({ _id: req.params.id }, washer).then(() => {
            Order.findById({ _id: req.params.id }).then((order) => {
                res.send(order);
            }).catch((err) => {
                res.json({ error: err.message });
            });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid Request " })
    }
};

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    getPendingOrders,
    assignOrder
};