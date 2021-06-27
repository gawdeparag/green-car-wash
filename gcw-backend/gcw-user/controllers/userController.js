const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getLogin = (req, res) => {
    res.render('login');
};

const login = (req, res) => {
    const { userName, password } = req.body;
    try {
        User.findOne({ userName: userName }).then((user) => {
            if (user.password === password) {
                User.updateOne({ userName: userName }, { lastLoggedIn: Date.now() }).then((user) => {
                    console.log("Login Successful");
                }).catch((err) => {
                    console.log(err);
                });
                res.send("Login Successful");
            } else {
                res.send("Login Unsuccessful");
            }
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.error(error);
    }
};

const getSignup = (req, res) => {
    res.render('signup');
};

const signup = (req, res) => {
    try {
        const { name, email, userName, password, confirmPassword } = req.body;
        if (password === confirmPassword) {
            User.create(req.body).then((user) => {
                if (user) {
                    const token = createToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.send("Signup Successful");
                } else {
                    res.send("Signup Unsuccessful");
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            res.send("Passwords do not match");
        }
    } catch (error) {
        console.error(error);
    }
};

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'gcw-secret', { expiresIn: maxAge })
}

module.exports = { getLogin, getSignup, login, signup }