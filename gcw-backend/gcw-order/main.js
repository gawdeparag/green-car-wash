const express = require('express');
const app = express();
const mongoose = require('mongoose');
const orderRoutes = require('./routers/order');
const { MongoURL } = require('./URL');

var PORT = process.env.PORT || 3002;


mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-order");
});
mongoose.Promise = global.Promise;

app.use(orderRoutes);

app.listen(PORT, () => {
    console.log(`Order Service Started at ${PORT}`);
});