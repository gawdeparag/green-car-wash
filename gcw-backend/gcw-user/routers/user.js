const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from User Service!');
});

module.exports = router;