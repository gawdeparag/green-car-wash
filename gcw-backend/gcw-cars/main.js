const express = require('express');
const app = express();
const mongoose = require('mongoose');
const carsRoutes = require('./routers/cars');
const { MongoURL } = require('./URL');

var PORT = process.env.PORT || 3001;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-cars");
});
mongoose.Promise = global.Promise;

app.use(carsRoutes);

app.listen(PORT, () => {
    console.log(`Cars Service Started at ${PORT}`);
});