const Order = require('../models/Order');

const getOrders = (req, res) => {
    Order.find({}).then((orders) => {
        res.send(orders);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const createOrder = (req, res) => {
    Order.create(req.body).then((order) => {
        res.send(order);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
};

const updateOrder = (req, res) => {
    Order.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Order.findById({ _id: req.params.id }).then((order) => {
            res.send(order);
        }).catch((err) => {
            res.json({ message: err.message });
        });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const deleteOrder = (req, res) => {
    Order.findByIdAndRemove({ _id: req.params.id }).then((order) => {
        res.json({ message: "Order deleted successfully" });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };