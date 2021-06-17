const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserCar = require('../models/UserCar');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    UserCar.find({}).then((userCars) => {
        res.render('userCars', { userCars: userCars });
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

router.post('/', (req, res) => {
    UserCar.create(req.body).then((userCar) => {
        res.send(userCar);
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

router.put('/:id', (req, res) => {
    UserCar.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        UserCar.findOne({ _id: req.params.id }).then((userCar) => {
            res.send(userCar);
        }).catch((err) => {
            res.json({ message: err.message });

        });
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

router.delete('/:id', (req, res) => {
    UserCar.findByIdAndRemove({ _id: req.params.id }).then((userCar) => {
        if (userCar && userCar !== null) {
            res.json({ message: "Car successfully deleted" });
        } else {
            res.json({ message: "Couldn't find the requested car" });
        }
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

module.exports = router;