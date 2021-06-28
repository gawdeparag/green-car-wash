const express = require('express');
const app = express();
const washerLoginRoutes = require('./routers/washerLogin');
const mongoose = require('mongoose');
const { MongoURL } = require('./URL');

var PORT = process.env.PORT || 3006;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-washer");
});
mongoose.Promise = global.Promise;

app.use('/washer', washerLoginRoutes);

app.listen(PORT, () => {
    console.log(`Washer Service Started at ${PORT}`);
});