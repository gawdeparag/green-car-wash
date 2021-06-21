const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Car = require('../models/Car');

router.use(bodyParser.json());

const getCars = (req, res) => {
    Car.find({}).then((cars) => {
        res.render('cars', { cars: cars });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const addCar = (req, res) => {
    Car.create(req.body).then((car) => {
        res.send(car);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const updateCar = (req, res) => {
    Car.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Car.findOne({ _id: req.params.id }).then((car) => {
            res.send(car);
        }).catch((err) => {
            res.json({ message: err.message });
        });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const deleteCar = (req, res) => {
    Car.findByIdAndRemove({ _id: req.params.id }).then((car) => {
        if (car && car !== null) {
            res.json({ message: "Car successfully deleted" });
        } else {
            res.json({ message: "Couldn't find the requested car" });
        }
    }).catch((err) => {
        res.json({ message: err.message });
    });
}

module.exports = { getCars, addCar, updateCar, deleteCar }