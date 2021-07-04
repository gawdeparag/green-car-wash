const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loginAsUser = async(req, res) => {
    try {
        const request = {
            email: req.body.email,
            password: req.body.password,
            userType: "User"
        };
        const user = await User.login(request.email, request.password);
        if (user && user !== null) {
            const token = createToken(user._id, user.email, user.userType);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id, message: "Login successful" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const loginAsAdmin = async(req, res) => {
    try {
        const request = {
            email: req.body.email,
            password: req.body.password,
            userType: "Admin"
        };
        const user = await User.login(request.email, request.password);
        const token = createToken(user._id, user.email, user.userType);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, message: "Login successful" });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const loginAsWasher = async(req, res) => {
    try {
        const request = {
            email: req.body.email,
            password: req.body.password,
            userType: "Washer"
        };
        const user = await User.login(request.email, request.password);
        const token = createToken(user._id, user.email, user.userType);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, message: "Login successful" });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const signupAsUser = (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            userType: "User"
        };
        if (newUser.password === newUser.confirmPassword) {
            User.create(newUser).then((user) => {
                if (user) {
                    const token = createToken(user._id, user.email, user.userType);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.json({ message: "Signup Successful" });
                } else {
                    res.status(404).json({ error: "Signup Failed" });
                }
            }).catch((err) => {
                res.status(404).json({ error: err.message });
            });
        } else {
            res.status(404).json({ error: "Passwords do not match" });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const signupAsAdmin = (req, res) => {
    try {
        const newAdmin = {
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            userType: "Admin"
        };
        if (newAdmin.password === newAdmin.confirmPassword) {
            User.create(newAdmin).then((admin) => {
                if (admin) {
                    const token = createToken(admin._id, admin.email, admin.userType);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).json({ message: "Signup Successful" });
                } else {
                    res.status(404).json({ error: "Signup Failed" });
                }
            }).catch((err) => {
                res.status(404).json({ error: err.message });
            });
        } else {
            res.status(404).json({ error: "Passwords do not match" });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const signupAsWasher = (req, res) => {
    try {
        const newWasher = {
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            userType: "Washer"
        };
        if (newWasher.password === newWasher.confirmPassword) {
            User.create(newWasher).then((washer) => {
                if (washer) {
                    const token = createToken(washer._id, washer.email, washer.userType);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).json({ message: "Signup Successful" });
                } else {
                    res.status(404).json({ message: "Signup Failed" });
                }
            }).catch((err) => {
                res.status(404).json({ error: err.message });
            });
        } else {
            res.status(404).json({ message: "Passwords do not match" });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getAllUsers = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        User.find({ userType: "User" }).then((users) => {
            res.send(users);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const getAllWashers = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        User.find({ userType: "Washer" }).then((washers) => {
            if (washers && washers.length > 0) {
                res.send(washers);
            } else {
                res.json({ error: "Washers not found" });
            }
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({ message: "Logout successful" });
};

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id, email, userType) => {
    return jwt.sign({ id, email, userType }, 'gcw-secret', { expiresIn: maxAge })
}

module.exports = {
    loginAsUser,
    loginAsAdmin,
    loginAsWasher,
    signupAsUser,
    signupAsAdmin,
    signupAsWasher,
    getAllUsers,
    getAllWashers,
    logout
}