const express = require('express');
const app = express();
const mongoose = require('mongoose');
const servicesRoutes = require('./routers/services');

var PORT = process.env.PORT || 3004;

mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-services?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-services");
});
mongoose.Promise = global.Promise;

app.use(servicesRoutes);

app.listen(PORT, () => {
    console.log(`Services Started at ${PORT}`);
});