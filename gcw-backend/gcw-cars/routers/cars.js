const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Car = require('../models/Car');
const carController = require('../controllers/carControllers');

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
router.get('/', carController.getCars);

/** 
 *  @swagger
 *  /cars/:
 *  post:
 *      parameters:
 *          - in: "body"
 *            name: "body"
 *            required: true
 *            schema: 
 *                  type: object
 *      summary: "To edit a car"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
router.post('/', carController.addCar);

/** 
 *  @swagger
 *  /cars/{id}:
 *  put:
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *      summary: "To edit a car"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
router.put('/:id', carController.updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *     summary: "To delete a car"
 *     responses:
 *       200:
 *         description: Returns the requested car
 */
router.delete('/:id', carController.deleteCar);

module.exports = router;