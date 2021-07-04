const Service = require('../models/Service');

const getServices = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        Service.find({}).then((services) => {
            res.send(services);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const addService = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        let newService = req.body;
        newService.createdBy = req.userId;
        Service.create(newService).then((service) => {
            res.send(service);
        }).catch((err) => {
            res.status(400).json({ error: err.message });
        });
    } else {
        res.status(400).json({ error: "Invalid User" });
    }
};

const updateService = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        let updatedService = req.body;
        updatedService.updatedAt = Date.now();
        Service.findByIdAndUpdate({ _id: req.params.id }, updatedService).then(() => {
            Service.findById({ _id: req.params.id }).then((service) => {
                res.send(service);
            }).catch((err) => {
                res.json({ error: err.message });
            });
        }).catch((err) => {
            res.json({ erorr: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

const deleteService = (req, res) => {
    if (req.userType && req.userType === "Admin") {
        Service.findByIdAndDelete({ _id: req.params.id }).then(() => {
            res.json({ message: "Service Deleted successfully" });
        }).catch((err) => {
            res.json({ error: err.message });
        });
    } else {
        res.json({ error: "Invalid User" });
    }
};

module.exports = { getServices, addService, updateService, deleteService };