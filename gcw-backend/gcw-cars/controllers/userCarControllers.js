const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserCar = require('../models/UserCar');

router.use(bodyParser.json());

const getUserCar = (req, res) => {
    if (req.userType && req.userType === "User") {
        UserCar.find({ createdBy: req.userId }).then((userCars) => {
            res.json({ userCars: userCars });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const addUserCar = (req, res) => {
    if (req.userType && req.userType === "User") {
        const newCar = {
            name: req.body.name,
            color: req.body.color || null,
            brand: req.body.brand,
            model: req.body.model || null,
            isServicedEarlier: req.body.isServicedEarlier || false,
            lastServicingDate: req.body.isServicedEarlier === true ? req.body.lastServicingDate : null,
            createdBy: req.userId
        };
        UserCar.create(newCar).then((car) => {
            res.send(car);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const updateUserCar = (req, res) => {
    if (req.userType && req.userType === "User") {
        let updatedUserCar = req.body;
        updatedUserCar.updatedAt = Date.now();
        UserCar.findOneAndUpdate({ _id: req.params.id, createdBy: req.userId }, req.body).then(() => {
            UserCar.findOne({ _id: req.params.id, createdBy: req.userId }).then((car) => {
                if (car && car !== null) {
                    res.send(car);
                } else {
                    res.json({ error: "Could not find the requested car" });
                }
            }).catch((err) => {
                res.json({ error: err.message });
            });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ message: "User needs to login" })
    }
};

const deleteUserCar = (req, res) => {
    if (req.userType && req.userType === "User") {
        UserCar.findOneAndDelete({ _id: req.params.id, createdBy: req.userId }).then((car) => {
            if (car && car !== null) {
                res.json({ message: "User's Car successfully deleted" });
            } else {
                res.json({ message: "Could not find the requested car" });
            }
        }).catch((err) => {
            res.json({ message: err.message });
        });
    } else {
        res.json({ message: "Invalid User" });
    }
}

module.exports = { getUserCar, addUserCar, updateUserCar, deleteUserCar }