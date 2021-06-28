const jwt = require('jsonwebtoken');
const Washer = require('../models/Washer');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'gcw-secret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/washer/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/washer/login');
    }
}

const checkWasher = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'gcw-secret', async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await Washer.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkWasher };