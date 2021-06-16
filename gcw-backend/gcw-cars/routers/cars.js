const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello from Cars Service!");
});

module.exports = router;