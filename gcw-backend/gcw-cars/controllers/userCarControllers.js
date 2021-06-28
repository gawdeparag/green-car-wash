const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserCar = require('../models/UserCar');

router.use(bodyParser.json());

const getUserCar = (req, res) => {
    UserCar.find({}).then((userCars) => {
        res.render('userCars', { userCars: userCars });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const addUserCar = (req, res) => {
    UserCar.create(req.body).then((car) => {
        res.send(car);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const updateUserCar = (req, res) => {
    UserCar.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        UserCar.findOne({ _id: req.params.id }).then((car) => {
            res.send(car);
        }).catch((err) => {
            res.json({ message: err.message });
        });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const deleteUserCar = (req, res) => {
    UserCar.findByIdAndRemove({ _id: req.params.id }).then((car) => {
        if (car && car !== null) {
            res.json({ message: "User's Car successfully deleted" });
        } else {
            res.json({ message: "Couldn't find the requested car" });
        }
    }).catch((err) => {
        res.json({ message: err.message });
    });
}

module.exports = { getUserCar, addUserCar, updateUserCar, deleteUserCar }