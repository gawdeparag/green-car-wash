const AddOn = require('../models/AddOn');

const getAddOns = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        AddOn.find({}).then((addOns) => {
            res.send(addOns);
        }).catch((err) => {
            res.json({ message: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const addAddOn = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        let newAddOn = {
            name: req.body.name,
            serviceId: req.body.serviceId,
            carId: req.body.carId,
            cost: req.body.cost,
            createdBy: req.userId
        };
        AddOn.create(newAddOn).then((addOn) => {
            res.send(addOn);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const updateAddOn = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        const updatedAddOn = req.body;
        updatedAddOn.updatedAt = Date.now();
        AddOn.findByIdAndUpdate({ _id: req.params.id }, updatedAddOn).then(() => {
            AddOn.findById({ _id: req.params.id }).then((addOn) => {
                res.send(addOn);
            }).catch((err) => {
                res.json({ error: err.message });
            });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const deleteAddOn = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        AddOn.findByIdAndDelete({ _id: req.params.id }).then(() => {
            res.json({ message: "AddOn Deleted successfully" });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

module.exports = { getAddOns, addAddOn, updateAddOn, deleteAddOn };