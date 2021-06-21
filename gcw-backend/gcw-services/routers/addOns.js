const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const addOnController = require('../controllers/addOnController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', addOnController.getAddOns);

router.post('/', addOnController.addAddOn);

router.put('/:id', addOnController.updateAddOn);

router.delete('/:id', addOnController.deleteAddOn);

module.exports = router;