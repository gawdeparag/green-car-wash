const express = require('express');
const app = express();
const userRoutes = require('./routers/user');
const mongoose = require('mongoose');
const { MongoURL } = require('./URL');

var PORT = process.env.PORT || 3005;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-user");
});
mongoose.Promise = global.Promise;

app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`User Service Started at ${PORT}`);
});