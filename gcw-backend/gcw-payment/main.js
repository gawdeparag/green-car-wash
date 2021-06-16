const express = require('express');
const app = express();
const mongoose = require('mongoose');
const paymentRoutes = require('./routers/payment');

var PORT = process.env.PORT || 3003;

mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-payment?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-payment");
});
mongoose.Promise = global.Promise;

app.use(paymentRoutes);

app.listen(PORT, () => {
    console.log(`Payment Service Started at ${PORT}`);
});