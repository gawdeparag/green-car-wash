const AddOn = require('../models/AddOn');

const getAddOns = (req, res) => {
    AddOn.find({}).then((addOns) => {
        res.send(addOns);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const addAddOn = (req, res) => {
    AddOn.create(req.body).then((addOn) => {
        res.send(addOn);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const updateAddOn = (req, res) => {
    AddOn.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        AddOn.findById({ _id: req.params.id }).then((addOn) => {
            res.send(addOn);
        }).catch((err) => {
            res.json({ message: err.message });
        });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const deleteAddOn = (req, res) => {
    AddOn.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res.json({ message: "AddOn Deleted successfully" });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

module.exports = { getAddOns, addAddOn, updateAddOn, deleteAddOn };