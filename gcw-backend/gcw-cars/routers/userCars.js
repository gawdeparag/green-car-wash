const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserCar = require('../models/UserCar');
const userCarController = require('../controllers/userCarControllers');

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
router.get('/', userCarController.getUserCar);


router.post('/', userCarController.addUserCar);

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
router.put('/:id', userCarController.updateUserCar);

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
router.delete('/:id', userCarController.deleteUserCar);

module.exports = router;