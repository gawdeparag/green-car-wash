const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'gcw-secret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/admin/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/admin/login');
    }
}

const checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'gcw-secret', async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await Admin.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkAdmin };