const Washer = require('../models/Washer');
const jwt = require('jsonwebtoken');

const getLogin = (req, res) => {
    res.render('login');
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const washer = await Washer.login(email, password);
        const token = createToken(washer._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ washer: washer._id });
    } catch (error) {
        console.error(error);
        res.status(400).json({});
    }
};

const getSignup = (req, res) => {
    res.render('signup');
};

const signup = (req, res) => {
    try {
        console.log(req.body);
        const { name, email, userName, password, confirmPassword } = req.body;
        if (password === confirmPassword) {
            Washer.create(req.body).then((washer) => {
                if (washer) {
                    const token = createToken(washer._id);
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

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('logout');
};

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'gcw-secret', { expiresIn: maxAge })
}

module.exports = { getLogin, getSignup, login, signup, logout }