const Service = require('../models/Service');

const getServices = (req, res) => {
    Service.find({}).then((services) => {
        res.send(services);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const addService = (req, res) => {
    Service.create(req.body).then((service) => {
        res.send(service);
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const updateService = (req, res) => {
    Service.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Service.findById({ _id: req.params.id }).then((service) => {
            res.send(service);
        }).catch((err) => {
            res.json({ message: err.message });
        });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

const deleteService = (req, res) => {
    Service.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res.json({ message: "Service Deleted successfully" });
    }).catch((err) => {
        res.json({ message: err.message });
    });
};

module.exports = { getServices, addService, updateService, deleteService };