const express = require('express');
const app = express();
const adminRoutes = require('./routers/admin');
const mongoose = require('mongoose');
const { MongoURL } = require('./URL');

var PORT = process.env.PORT || 3000;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-admin");
});
mongoose.Promise = global.Promise;

app.use(adminRoutes);

app.listen(PORT, () => {
    console.log(`Admin Service started at ${PORT}`);
});