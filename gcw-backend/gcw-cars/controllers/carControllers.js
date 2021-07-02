const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Car = require('../models/Car');

router.use(bodyParser.json());

const getCars = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        Car.find({}).then((cars) => {
            res.json({ cars: cars });
        }).catch((err) => {
            res.json({ message: err.message });
        });
    } else {
        res.json({ message: "Invalid User" });
    }
};

const addCar = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        let newCar = req.body;
        newCar.createdBy = req.userId;
        Car.create(newCar).then((car) => {
            res.send(car);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const updateCar = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        Car.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
            Car.findOne({ _id: req.params.id }).then((car) => {
                res.send(car);
            }).catch((err) => {
                res.json({ message: err.message });
            });
        }).catch((err) => {
            res.json({ message: err.message });
        });
    } else {
        res.json({ message: "Invalid User" });
    }
};

const deleteCar = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        Car.findByIdAndRemove({ _id: req.params.id }).then((car) => {
            if (car && car !== null) {
                res.json({ message: "Car successfully deleted" });
            } else {
                res.json({ message: "Couldn't find the requested car" });
            }
        }).catch((err) => {
            res.json({ message: err.message });
        });
    } else {
        res.json({ message: "Invalid User" });
    }
}

module.exports = { getCars, addCar, updateCar, deleteCar }