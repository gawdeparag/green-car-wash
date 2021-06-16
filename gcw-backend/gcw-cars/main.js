const express = require('express');
const app = express();
const mongoose = require('mongoose');
const carsRoutes = require('./routers/cars');

var PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-cars?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-cars");
});
mongoose.Promise = global.Promise;

app.use(carsRoutes);

app.listen(PORT, () => {
    console.log(`Cars Service Started at ${PORT}`);
});