const express = require('express');
const app = express();
const mongoose = require('mongoose');
const orderRoutes = require('./routers/order');

var PORT = process.env.PORT || 3002;


mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-order?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-order");
});
mongoose.Promise = global.Promise;

app.use(orderRoutes);

app.listen(PORT, () => {
    console.log(`Order Service Started at ${PORT}`);
});