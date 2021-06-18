const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Car = require('../models/Car');

router.use(bodyParser.json());

/** 
 *  @swagger
 *  /cars/:
 *  get:
 *      summary: "To get the list of all cars"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
router.get('/', (req, res) => {
    Car.find({}).then((cars) => {
        res.render('cars', { cars: cars });
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

/** 
 *  @swagger
 *  /cars/:
 *  post:
 *      summary: "To add a car"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
router.post('/', (req, res) => {
    Car.create(req.body).then((car) => {
        res.send(car);
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

/** 
 *  @swagger
 *  /cars/:
 *  put:
 *      summary: "To edit a car"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
router.put('/:id', (req, res) => {
    Car.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Car.findOne({ _id: req.params.id }).then((car) => {
            res.send(car);
        }).catch((err) => {
            res.json({ message: err.message });
        });
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

/** 
 *  @swagger
 *  /cars/:
 *  delete:
 *      summary: "To delete a car"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
router.delete('/:id', (req, res) => {
    Car.findByIdAndRemove({ _id: req.params.id }).then((car) => {
        if (car && car !== null) {
            res.json({ message: "Car successfully deleted" });
        } else {
            res.json({ message: "Couldn't find the requested car" });
        }
    }).catch((err) => {
        res.json({ message: err.message });
    });
});

module.exports = router;