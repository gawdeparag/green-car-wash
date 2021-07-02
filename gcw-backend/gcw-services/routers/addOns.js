const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const addOnController = require('../controllers/addOnController');
const authMiddleware = require('../../gcw-user/middleware/authMiddleware');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', authMiddleware, addOnController.getAddOns);

router.post('/', authMiddleware, addOnController.addAddOn);

router.put('/:id', authMiddleware, addOnController.updateAddOn);

router.delete('/:id', authMiddleware, addOnController.deleteAddOn);

module.exports = router;